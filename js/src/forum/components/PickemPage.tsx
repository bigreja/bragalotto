// PickemPage.tsx
import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';

declare global {
  const dayjs: any;
  const m: any; // Flarum ortamında mithril global olarak gelir
}

interface Team {
  name: () => string;
}
interface PickemEvent {
  id: () => number;
  homeTeam: () => Team | null;
  awayTeam: () => Team | null;
  matchDate: () => string;
  cutoffDate: () => string;
  result: () => string | null;
  canPick: () => boolean;
  allowDraw: () => boolean;
  isCorrect: () => boolean | null;
  selectedOutcome: () => string;
  event: () => PickemEvent | null;
  user: () => any;
  totalPoints: () => number;
  correctPicks: () => number;
  totalPicks: () => number;
  accuracy: () => number;
  displayName: () => string;
}

export default class PickemPage extends Page {
  sidebarItems!: ItemList;
  activeTab!: string;
  loading!: boolean;
  events!: PickemEvent[];
  picks!: Record<string, PickemEvent | any>;
  userScores!: PickemEvent[];
  pickLoading!: Set<number>;

  oninit(vnode: any) {
    super.oninit(vnode);

    // IndexPage.prototype.sidebarItems() bazen prototipten çağrıldığında içindeki öğeler
    // farklı bağlamlarda undefined oluşturabiliyor — güvenli default veriyoruz.
    try {
      this.sidebarItems = (IndexPage.prototype.sidebarItems && IndexPage.prototype.sidebarItems()) || new ItemList();
    } catch (e) {
      this.sidebarItems = new ItemList();
      console.warn('Sidebar items alınamadı, fallback uygulanıyor', e);
    }

    this.activeTab = (m.route && m.route.param && m.route.param('tab')) || 'matches';
    this.loading = true;
    this.events = [];
    this.picks = {};
    this.userScores = [];
    this.pickLoading = new Set<number>();

    this.loadData();
  }

  async loadData() {
    try {
      const [events, picks, userScores] = await Promise.all([
        app.store.find('pickem-events', { include: 'homeTeam,awayTeam,week' }) as Promise<any[]>,
        app.session.user
          ? (app.store.find('pickem-picks', {
              filter: { user: app.session.user.id() },
              include: 'event,event.homeTeam,event.awayTeam',
            }) as Promise<any[]>)
          : Promise.resolve([] as any[]),
        app.store.find('pickem-user-scores', { include: 'user,season' }) as Promise<any[]>,
      ]);

      this.events = (events || []).filter((e: any) => e != null && typeof e.id === 'function');

      if (picks && Array.isArray(picks)) {
        this.picks = (picks as any[]).reduce((acc: Record<string, any>, pick: any) => {
          try {
            const event = pick && (typeof pick.event === 'function' ? pick.event() : pick.event);
            if (event && typeof event.id === 'function') {
              acc[String(event.id())] = pick;
            }
          } catch (err) {
            console.warn('Invalid pick while reducing picks:', err);
          }
          return acc;
        }, {});
      } else {
        this.picks = {};
      }

      this.userScores = (userScores || []).filter((s: any) => s != null);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  view() {
    // sidebarItems.toArray() çıkışını güvenli hale getiriyoruz
    const sidebarArray = (this.sidebarItems && this.sidebarItems.toArray && this.sidebarItems.toArray()) || [];
    const safeSidebar = Array.isArray(sidebarArray) ? sidebarArray.filter(Boolean) : [];

    let sidebarVnode = null;
    try {
      sidebarVnode = listItems(safeSidebar);
    } catch (err) {
      console.warn('listItems render hatası yakalandı:', err);
      sidebarVnode = null;
    }

    return (
      <div className="PickemPage">
        <div className="container">
          <nav className="IndexPage-nav sideNav">
            <ul>{sidebarVnode}</ul>
          </nav>

          <div className="sideNavOffset">
            <h2>
              <i className="fas fa-trophy" /> {app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')}
            </h2>

            <div className="PickemPage-tabs">
              {this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.forum.nav.matches'))}
              {this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.forum.nav.my_picks'))}
              {this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.forum.nav.leaderboard'))}
            </div>

            {this.loading ? <LoadingIndicator /> : <div className="PickemPage-tab-content">{this.renderTabContent()}</div>}
          </div>
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
          // istersen URL'e yansıt: m.route.set(m.route.get(), { tab })
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
        return this.renderMatches();
      case 'my_picks':
        return this.renderMyPicks();
      case 'leaderboard':
        return this.renderLeaderboard();
      default:
        return this.renderMatches();
    }
  }

  renderMatches() {
    if (!this.events || this.events.length === 0) {
      return <p>{app.translator.trans('huseyinfiliz-pickem.forum.matches.no_matches')}</p>;
    }

    const safeEvents = this.events.filter((e: any) => e != null && typeof e.id === 'function');
    return <div className="MatchesList">{safeEvents.map((event: PickemEvent) => this.renderEvent(event))}</div>;
  }

  renderEvent(event: PickemEvent) {
    if (!event || typeof event.id !== 'function') {
      return <div className="EventCard EventCard--empty" />;
    }

    const idStr = String(event.id());
    const homeTeam = event.homeTeam ? event.homeTeam() : null;
    const awayTeam = event.awayTeam ? event.awayTeam() : null;
    const pick = this.picks[idStr];
    const canPick = typeof event.canPick === 'function' ? event.canPick() : false;
    const isLoading = this.pickLoading.has(Number(event.id()));

    let matchDate = '-';
    let cutoffDate = '-';
    try {
      matchDate = dayjs(event.matchDate()).format('DD/MM/YYYY HH:mm');
    } catch {
      matchDate = String(event.matchDate());
    }
    try {
      cutoffDate = dayjs(event.cutoffDate()).format('DD/MM/YYYY HH:mm');
    } catch {
      cutoffDate = String(event.cutoffDate());
    }

    return (
      <div className="EventCard" key={idStr}>
        <div className="EventCard-teams">
          <span className="team-name">{homeTeam ? homeTeam.name() : 'Home Team'}</span>
          <span className="vs">vs</span>
          <span className="team-name">{awayTeam ? awayTeam.name() : 'Away Team'}</span>
        </div>

        <div className="EventCard-info">
          <div>Match: {matchDate}</div>
          <div>Cutoff: {cutoffDate}</div>
          {event.result && event.result() && <div>Result: {event.result()}</div>}
        </div>

        {app.session.user && canPick && (
          <div className="EventCard-picks">
            <Button
              className={pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'home' ? 'Button--primary' : ''}
              onclick={() => this.makePick(Number(event.id()), 'home')}
              loading={isLoading}
              disabled={isLoading}
            >
              {homeTeam ? homeTeam.name() : 'Home'}
            </Button>

            {event.allowDraw && event.allowDraw() && (
              <Button
                className={pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'draw' ? 'Button--primary' : ''}
                onclick={() => this.makePick(Number(event.id()), 'draw')}
                loading={isLoading}
                disabled={isLoading}
              >
                Draw
              </Button>
            )}

            <Button
              className={pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'away' ? 'Button--primary' : ''}
              onclick={() => this.makePick(Number(event.id()), 'away')}
              loading={isLoading}
              disabled={isLoading}
            >
              {awayTeam ? awayTeam.name() : 'Away'}
            </Button>
          </div>
        )}

        {pick && !canPick && (
          <div className="EventCard-pick-result">
            Your pick: {typeof pick.selectedOutcome === 'function' ? pick.selectedOutcome() : String(pick.selectedOutcome)}
            {pick.isCorrect && typeof pick.isCorrect === 'function' && pick.isCorrect() !== null && (
              <span className={pick.isCorrect() ? 'correct' : 'incorrect'}>
                {pick.isCorrect() ? ' ✓ Correct' : ' ✗ Incorrect'}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  async makePick(eventId: number, outcome: string) {
    const idStr = String(eventId);
    this.pickLoading.add(eventId);
    m.redraw();

    try {
      const payloadSnake = { event_id: eventId, selected_outcome: outcome };
      const record = app.store.createRecord('pickem-picks', payloadSnake);
      const pick = await record.save();
      this.picks[idStr] = pick as PickemEvent;
    } catch (error: any) {
      console.error('Error making pick:', error);
      const message = error?.response?.errors?.[0]?.detail || app.translator.trans('core.lib.error.generic_message') || 'Bir hata oluştu';
      try {
        app.alerts.show({ type: 'error' }, message);
      } catch (e) {
        console.error('Alert gösterilemedi:', e, message);
      }
    } finally {
      this.pickLoading.delete(eventId);
      m.redraw();
    }
  }

  renderMyPicks() {
    if (!app.session.user) {
      return <p>{app.translator.trans('huseyinfiliz-pickem.forum.picks.login_to_view') || 'Please login to view your picks'}</p>;
    }

    const myPicks = Object.values(this.picks || {});
    if (!myPicks || myPicks.length === 0) return <p>{app.translator.trans('huseyinfiliz-pickem.forum.picks.no_picks')}</p>;

    const safePicks = myPicks.filter((pick: any) => {
      try {
        const ev = pick && (typeof pick.event === 'function' ? pick.event() : pick.event);
        return ev != null;
      } catch {
        return false;
      }
    });

    if (!safePicks || safePicks.length === 0) return <p>{app.translator.trans('huseyinfiliz-pickem.forum.picks.no_picks')}</p>;

    return (
      <div className="MyPicksList">
        <table className="Table">
          <thead>
            <tr>
              <th>Match</th>
              <th>Your Pick</th>
              <th>Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {safePicks.map((pick: any) => {
              const event = typeof pick.event === 'function' ? pick.event() : pick.event;
              if (!event) {
                return (
                  <tr key={String(Math.random())}>
                    <td colSpan={4}>Invalid pick (orphaned)</td>
                  </tr>
                );
              }
              const homeTeam = event.homeTeam ? event.homeTeam() : null;
              const awayTeam = event.awayTeam ? event.awayTeam() : null;
              const pickId = pick && (typeof pick.id === 'function' ? pick.id() : pick.id);
              return (
                <tr key={String(pickId || Math.random())}>
                  <td>{homeTeam ? homeTeam.name() : 'Home'} vs {awayTeam ? awayTeam.name() : 'Away'}</td>
                  <td>{typeof pick.selectedOutcome === 'function' ? pick.selectedOutcome() : String(pick.selectedOutcome)}</td>
                  <td>{event.result && event.result() ? event.result() : '-'}</td>
                  <td>
                    {pick.isCorrect && typeof pick.isCorrect === 'function'
                      ? (pick.isCorrect() === null ? 'Pending' : (pick.isCorrect() ? '✓ Correct' : '✗ Incorrect'))
                      : 'Pending'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  renderLeaderboard() {
    if (!this.userScores || this.userScores.length === 0) {
      return <p>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.no_scores')}</p>;
    }

    const sorted = [...this.userScores].filter(s => s != null).sort((a: any, b: any) => {
      try {
        return Number(b.totalPoints && b.totalPoints()) - Number(a.totalPoints && a.totalPoints());
      } catch {
        return 0;
      }
    });

    return (
      <div className="Leaderboard">
        <table className="Table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Correct</th>
              <th>Total</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((score: any, index: number) => {
              const user = score && (typeof score.user === 'function' ? score.user() : score.user);
              const scoreId = (score && (typeof score.id === 'function' ? score.id() : score.id)) || index;
              return (
                <tr key={String(scoreId)}>
                  <td>{index + 1}</td>
                  <td>{user ? (typeof user.displayName === 'function' ? user.displayName() : user.displayName) : 'Unknown'}</td>
                  <td>{typeof score.totalPoints === 'function' ? score.totalPoints() : score.totalPoints}</td>
                  <td>{typeof score.correctPicks === 'function' ? score.correctPicks() : score.correctPicks}</td>
                  <td>{typeof score.totalPicks === 'function' ? score.totalPicks() : score.totalPicks}</td>
                  <td>{typeof score.accuracy === 'function' ? `${score.accuracy()}%` : `${score.accuracy}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
