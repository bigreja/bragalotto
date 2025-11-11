import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import { extend } from 'flarum/common/extend';

export default class PickemPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.activeTab = m.route.param('tab') || 'matches';
    this.loading = true;
    this.events = [];
    this.picks = {};
    this.picksArray = [];
    this.userScores = [];
    this.seasons = [];

    this.loadData();
  }

  async loadData() {
    try {
      const promises = {
        events: app.store.find('pickem-events', {
          include: 'homeTeam,awayTeam,week',
        }),
        seasons: app.store.find('pickem-seasons'),
        userScores: app.store.find('pickem-user-scores', {
          include: 'user,season',
        }),
      };

      // Only fetch picks if user is logged in
      if (app.session.user) {
        promises.picks = app.store.find('pickem-picks', {
          filter: { user: app.session.user.id() },
          include: 'event,event.homeTeam,event.awayTeam',
        });
      }

      const results = await Promise.all(Object.values(promises));
      const keys = Object.keys(promises);

      this.events = results[keys.indexOf('events')] || [];
      this.seasons = results[keys.indexOf('seasons')] || [];
      this.picksArray = keys.includes('picks') ? results[keys.indexOf('picks')] || [] : [];
      this.userScores = results[keys.indexOf('userScores')] || [];

      // Create a map of event ID to pick
      this.picks = {};
      this.picksArray.forEach(pick => {
        this.picks[pick.eventId()] = pick;
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  view() {
    return (
      <div className="PickemPage">
        <div className="container">
          <h2><i className="fas fa-trophy"></i> Pick'em</h2>

          <div className="PickemPage-tabs">
            {this.renderTab('matches', 'fas fa-football-ball', app.translator.trans('huseyinfiliz-pickem.forum.nav.matches'))}
            {this.renderTab('my_picks', 'fas fa-list', app.translator.trans('huseyinfiliz-pickem.forum.nav.my_picks'))}
            {this.renderTab('leaderboard', 'fas fa-chart-line', app.translator.trans('huseyinfiliz-pickem.forum.nav.leaderboard'))}
          </div>

          {this.loading ? (
            <LoadingIndicator />
          ) : (
            <div className="PickemPage-content">
              {this.renderTabContent()}
            </div>
          )}
        </div>
      </div>
    );
  }

  renderTab(tab, icon, label) {
    const active = this.activeTab === tab;
    return (
      <button
        className={`Button Button--flat ${active ? 'active' : ''}`}
        onclick={() => {
          if (this.activeTab !== tab) {
            this.activeTab = tab;
            // Update URL without reloading the page
            window.history.pushState(null, '', app.route('pickem', { tab }));
            m.redraw();
          }
        }}
      >
        <i className={icon}></i> {label}
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
    if (this.events.length === 0) {
      return <p>{app.translator.trans('huseyinfiliz-pickem.forum.matches.no_matches')}</p>;
    }

    return (
      <div className="MatchesPage-list">
        {this.events.map(event => this.renderEvent(event))}
      </div>
    );
  }

  renderEvent(event) {
    const homeTeam = event.homeTeam();
    const awayTeam = event.awayTeam();
    const pick = this.picks[event.id()];
    const canPick = event.canPick();

    return (
      <div className="MatchCard" key={event.id()}>
        <div className="MatchCard-teams">
          <div className="MatchCard-team">
            {homeTeam ? homeTeam.name() : 'TBD'}
          </div>
          <div className="MatchCard-vs">vs</div>
          <div className="MatchCard-team">
            {awayTeam ? awayTeam.name() : 'TBD'}
          </div>
        </div>

        <div className="MatchCard-info">
          <div className="MatchCard-date">
            {new Date(event.matchDate()).toLocaleString()}
          </div>
          <div className="MatchCard-status">
            Status: {event.status()}
          </div>
          {event.homeScore() !== null && event.awayScore() !== null && (
            <div className="MatchCard-score">
              Score: {event.homeScore()} - {event.awayScore()}
            </div>
          )}
        </div>

        {app.session.user && canPick && (
          <div className="MatchCard-picks">
            <p>{app.translator.trans('huseyinfiliz-pickem.forum.matches.make_pick')}</p>
            <div className="MatchCard-buttons">
              <Button
                className={`Button ${pick && pick.selectedOutcome() === 'home' ? 'Button--primary' : ''}`}
                onclick={() => this.makePick(event, 'home')}
              >
                {homeTeam ? homeTeam.name() : 'Home'}
              </Button>
              {event.allowDraw() && (
                <Button
                  className={`Button ${pick && pick.selectedOutcome() === 'draw' ? 'Button--primary' : ''}`}
                  onclick={() => this.makePick(event, 'draw')}
                >
                  Draw
                </Button>
              )}
              <Button
                className={`Button ${pick && pick.selectedOutcome() === 'away' ? 'Button--primary' : ''}`}
                onclick={() => this.makePick(event, 'away')}
              >
                {awayTeam ? awayTeam.name() : 'Away'}
              </Button>
            </div>
          </div>
        )}

        {pick && !canPick && (
          <div className="MatchCard-pick-made">
            <p>
              {app.translator.trans('huseyinfiliz-pickem.forum.matches.your_pick')}:
              <strong> {pick.selectedOutcome()}</strong>
            </p>
            {pick.isCorrect() !== null && (
              <p className={pick.isCorrect() ? 'text-success' : 'text-danger'}>
                {pick.isCorrect()
                  ? app.translator.trans('huseyinfiliz-pickem.forum.matches.correct')
                  : app.translator.trans('huseyinfiliz-pickem.forum.matches.incorrect')}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  async makePick(event, outcome) {
    if (!app.session.user) {
      alert('You must be logged in to make picks');
      return;
    }

    try {
      const pick = await app.store.createRecord('pickem-picks').save({
        eventId: event.id(),
        selectedOutcome: outcome,
      });

      this.picks[event.id()] = pick;
      m.redraw();
    } catch (error) {
      console.error('Error making pick:', error);
      alert(error.response?.errors?.[0]?.detail || 'Error making pick');
    }
  }

  renderMyPicks() {
    if (!app.session.user) {
      return (
        <div className="MyPicksPage-empty">
          <p>{app.translator.trans('huseyinfiliz-pickem.forum.picks.must_login')}</p>
        </div>
      );
    }

    if (this.picksArray.length === 0) {
      return <p>{app.translator.trans('huseyinfiliz-pickem.forum.picks.no_picks')}</p>;
    }

    return (
      <table className="Table">
        <thead>
          <tr>
            <th>{app.translator.trans('huseyinfiliz-pickem.forum.picks.match')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.forum.picks.your_pick')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.forum.picks.result')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.forum.picks.status')}</th>
          </tr>
        </thead>
        <tbody>
          {this.picksArray.map(pick => this.renderPick(pick))}
        </tbody>
      </table>
    );
  }

  renderPick(pick) {
    const event = pick.event();
    if (!event) return null;

    const homeTeam = event.homeTeam();
    const awayTeam = event.awayTeam();

    return (
      <tr key={pick.id()}>
        <td>
          {homeTeam ? homeTeam.name() : 'TBD'} vs {awayTeam ? awayTeam.name() : 'TBD'}
          <br />
          <small>{new Date(event.matchDate()).toLocaleString()}</small>
        </td>
        <td>
          <strong>{pick.selectedOutcome()}</strong>
        </td>
        <td>
          {event.result() !== null ? event.result() : '-'}
        </td>
        <td>
          {pick.isCorrect() === null ? (
            <span className="Badge">Pending</span>
          ) : pick.isCorrect() ? (
            <span className="Badge Badge--success">Correct (+1)</span>
          ) : (
            <span className="Badge Badge--danger">Incorrect</span>
          )}
        </td>
      </tr>
    );
  }

  renderLeaderboard() {
    if (this.userScores.length === 0) {
      return <p>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.no_scores')}</p>;
    }

    // Sort by points descending
    const sortedScores = this.userScores.sort((a, b) => b.totalPoints() - a.totalPoints());

    return (
      <div>
        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.rank')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.user')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.points')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.correct')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.total')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.accuracy')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((score, index) => this.renderLeaderboardRow(score, index + 1))}
          </tbody>
        </table>
      </div>
    );
  }

  renderLeaderboardRow(score, rank) {
    const user = score.user();
    const accuracy = score.totalPicks() > 0
      ? ((score.correctPicks() / score.totalPicks()) * 100).toFixed(1)
      : '0.0';

    return (
      <tr key={score.id()}>
        <td><strong>#{rank}</strong></td>
        <td>{user ? user.displayName() : 'Unknown'}</td>
        <td><strong>{score.totalPoints()}</strong></td>
        <td>{score.correctPicks()}</td>
        <td>{score.totalPicks()}</td>
        <td>{accuracy}%</td>
      </tr>
    );
  }
}