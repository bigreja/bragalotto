import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';

export default class PickemPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);
    
    this.activeTab = m.route.param('tab') || 'matches';
    this.loading = true;
    this.events = [];
    this.picks = {};
    this.userScores = [];
    
    this.loadData();
  }

  async loadData() {
    try {
      // Events yükle
      this.events = await app.store.find('pickem-events', {
        include: 'homeTeam,awayTeam,week',
      });

      // Kullanıcı giriş yaptıysa picks yükle
      if (app.session.user) {
        const picksArray = await app.store.find('pickem-picks', {
          filter: { user: app.session.user.id() },
          include: 'event',
        });
        
        // Pick'leri event_id'ye göre map yap
        this.picks = {};
        picksArray.forEach(pick => {
          this.picks[pick.eventId()] = pick;
        });
      }

      // Leaderboard için user scores
      this.userScores = await app.store.find('pickem-user-scores', {
        include: 'user,season',
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
          <h2><i className="fas fa-trophy"></i> {app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')}</h2>

          <div className="PickemPage-tabs">
            {this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.forum.nav.matches'))}
            {this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.forum.nav.my_picks'))}
            {this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.forum.nav.leaderboard'))}
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

  renderTab(tab, label) {
    const active = this.activeTab === tab;
    return (
      <button
        className={`Button Button--${active ? 'primary' : 'flat'}`}
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
      <div className="MatchesList">
        {this.events.map(event => this.renderEvent(event))}
      </div>
    );
  }

  renderEvent(event) {
    if (!event) return null;
    
    const homeTeam = event.homeTeam();
    const awayTeam = event.awayTeam();
    const pick = this.picks[event.id()];
    const canPick = event.canPick();

    return (
      <div className="EventCard" key={event.id()}>
        <div className="EventCard-teams">
          <span className="team-name">{homeTeam ? homeTeam.name() : 'Home Team'}</span>
          <span className="vs">vs</span>
          <span className="team-name">{awayTeam ? awayTeam.name() : 'Away Team'}</span>
        </div>

        <div className="EventCard-info">
          <div>Match: {dayjs(event.matchDate()).format('DD/MM/YYYY HH:mm')}</div>
          <div>Cutoff: {dayjs(event.cutoffDate()).format('DD/MM/YYYY HH:mm')}</div>
          {event.result() && <div>Result: {event.result()}</div>}
        </div>

        {app.session.user && canPick && (
          <div className="EventCard-picks">
            <Button 
              className={pick && pick.selectedOutcome() === 'home' ? 'Button--primary' : ''}
              onclick={() => this.makePick(event.id(), 'home')}
            >
              {homeTeam ? homeTeam.name() : 'Home'}
            </Button>
            {event.allowDraw() && (
              <Button 
                className={pick && pick.selectedOutcome() === 'draw' ? 'Button--primary' : ''}
                onclick={() => this.makePick(event.id(), 'draw')}
              >
                Draw
              </Button>
            )}
            <Button 
              className={pick && pick.selectedOutcome() === 'away' ? 'Button--primary' : ''}
              onclick={() => this.makePick(event.id(), 'away')}
            >
              {awayTeam ? awayTeam.name() : 'Away'}
            </Button>
          </div>
        )}

        {pick && !canPick && (
          <div className="EventCard-pick-result">
            Your pick: {pick.selectedOutcome()} 
            {pick.isCorrect() !== null && (
              <span className={pick.isCorrect() ? 'correct' : 'incorrect'}>
                {pick.isCorrect() ? ' ✓ Correct' : ' ✗ Incorrect'}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  async makePick(eventId, outcome) {
    try {
      const pick = await app.store.createRecord('pickem-picks').save({
        eventId: eventId,
        selectedOutcome: outcome,
      });
      
      this.picks[eventId] = pick;
      m.redraw();
    } catch (error) {
      console.error('Error making pick:', error);
      alert('Error making pick');
    }
  }

  renderMyPicks() {
    if (!app.session.user) {
      return <p>Please login to view your picks</p>;
    }

    const myPicks = Object.values(this.picks);
    
    if (myPicks.length === 0) {
      return <p>You haven't made any picks yet</p>;
    }

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
            {myPicks.map(pick => {
              const event = pick.event();
              if (!event) return null;
              
              const homeTeam = event.homeTeam();
              const awayTeam = event.awayTeam();
              
              return (
                <tr key={pick.id()}>
                  <td>{homeTeam ? homeTeam.name() : 'Home'} vs {awayTeam ? awayTeam.name() : 'Away'}</td>
                  <td>{pick.selectedOutcome()}</td>
                  <td>{event.result() || '-'}</td>
                  <td>
                    {pick.isCorrect() === null ? 'Pending' : 
                     pick.isCorrect() ? '✓ Correct' : '✗ Incorrect'}
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
    if (this.userScores.length === 0) {
      return <p>No scores yet</p>;
    }

    // Sort by points
    const sorted = this.userScores.sort((a, b) => b.totalPoints() - a.totalPoints());

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
            {sorted.map((score, index) => (
              <tr key={score.id()}>
                <td>{index + 1}</td>
                <td>{score.user()?.displayName()}</td>
                <td>{score.totalPoints()}</td>
                <td>{score.correctPicks()}</td>
                <td>{score.totalPicks()}</td>
                <td>{score.accuracy()}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}