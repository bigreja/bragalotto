import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import MatchesTab from './MatchesTab';
import MyPicksTab from './MyPicksTab';
import LeaderboardTab from './LeaderboardTab';

export default class PickemPage extends Page {
  oninit(vnode: any) {
    super.oninit(vnode);

    this.activeTab = (m.route && m.route.param && m.route.param('tab')) || 'matches';
    this.loading = true;
    this.events = [];
    this.picks = {};
    this.userScores = [];
    this.pickLoading = new Set();

    this.eventsPage = 0;
    this.eventsHasMore = true;
    this.eventsLoading = false;

    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      await Promise.all([this.loadEvents(true), this.loadPicks(), this.loadLeaderboard()]);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  async loadEvents(initial = false) {
    if (this.eventsLoading || (!initial && !this.eventsHasMore)) return;

    this.eventsLoading = true;
    m.redraw();

    try {
      const offset = initial ? 0 : this.eventsPage * 10;
      const response = (await app.store.find('pickem-events', {
        include: 'homeTeam,awayTeam,week',
        page: { offset, limit: 10 },
      })) as any;

      const newEvents = Array.isArray(response) ? response : response.payload?.data || [];

      if (initial) {
        this.events = newEvents.filter((e: any) => e != null && typeof e.id === 'function');
        this.eventsPage = 1;
      } else {
        const filtered = newEvents.filter((e: any) => e != null && typeof e.id === 'function');
        this.events = [...this.events, ...filtered];
        this.eventsPage++;
      }

      this.eventsHasMore = newEvents.length >= 10;
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      this.eventsLoading = false;
      m.redraw();
    }
  }

  async loadPicks() {
    if (!app.session.user) return;

    try {
      const picks = (await app.store.find('pickem-picks', {
        filter: { user: app.session.user.id() },
        include: 'event,event.homeTeam,event.awayTeam',
      })) as any[];

      if (picks && Array.isArray(picks)) {
        this.picks = picks.reduce((acc: Record<string, any>, pick: any) => {
          try {
            const event = pick && (typeof pick.event === 'function' ? pick.event() : pick.event);
            if (event && typeof event.id === 'function') {
              acc[String(event.id())] = pick;
            }
          } catch (err) {
            console.warn('Invalid pick:', err);
          }
          return acc;
        }, {});
      }
    } catch (error) {
      console.error('Error loading picks:', error);
    }
  }

  async loadLeaderboard() {
    try {
      const scores = (await app.store.find('pickem-user-scores', { include: 'user,season' })) as any[];
      this.userScores = (scores || []).filter((s: any) => s != null);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  }

  async makePick(eventId: number, outcome: string) {
    const idStr = String(eventId);
    this.pickLoading.add(eventId);
    m.redraw();

    try {
    const pick = await app.store.createRecord('pickem-picks').save({
      eventId: eventId,
      selectedOutcome: outcome,
    });
    
    this.picks[idStr] = pick as any;
    app.alerts.show({ type: 'success' }, 'Pick saved successfully!');
    } catch (error: any) {
      console.error('Error making pick:', error);
      const message = error?.response?.errors?.[0]?.detail || 'Failed to save pick';
      app.alerts.show({ type: 'error' }, message);
    } finally {
      this.pickLoading.delete(eventId);
      m.redraw();
    }
  }

  view() {
    return (
      <div className="PickemPage">
        <div className="container">
          <h2>
            <i className="fas fa-trophy" />
            {app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')}
          </h2>

          <div className="PickemPage-tabs">
            {this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.forum.nav.matches'))}
            {this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.forum.nav.my_picks'))}
            {this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.forum.nav.leaderboard'))}
          </div>

          {this.loading ? <LoadingIndicator /> : <div className="PickemPage-tab-content">{this.renderTabContent()}</div>}
        </div>
      </div>
    );
  }

  renderTab(tab: string, label: string) {
    const active = this.activeTab === tab;
    return (
      <button
        className={`Button Button--flat PickemPage-tab ${active ? 'active' : ''}`}
        onclick={() => {
          this.activeTab = tab;
          m.redraw();
        }}
      >
        {label}
      </button>
    );
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'matches':
        return (
          <MatchesTab
            events={this.events}
            picks={this.picks}
            pickLoading={this.pickLoading}
            eventsHasMore={this.eventsHasMore}
            eventsLoading={this.eventsLoading}
            loadEvents={() => this.loadEvents()}
            onMakePick={(eventId, outcome) => this.makePick(eventId, outcome)}
          />
        );
      case 'my_picks':
        return <MyPicksTab picks={this.picks} />;
      case 'leaderboard':
        return <LeaderboardTab userScores={this.userScores} />;
      default:
        return null;
    }
  }
}