import Page from 'flarum/common/components/Page';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class MatchesPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = true;
    this.events = [];
    this.picks = {};

    this.loadData();
  }

  async loadData() {
    try {
      const [events, picks] = await Promise.all([
        app.store.find('pickem-events', {
          include: 'homeTeam,awayTeam,week',
        }),
        app.session.user ? app.store.find('pickem-picks', {
          filter: { user: app.session.user.id() },
          include: 'event',
        }) : Promise.resolve([]),
      ]);

      this.events = events;

      // Create a map of event ID to pick
      if (picks) {
        picks.forEach(pick => {
          this.picks[pick.eventId()] = pick;
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  view() {
    return (
      <div className="MatchesPage">
        <div className="container">
          <h2>{app.translator.trans('huseyinfiliz-pickem.forum.matches.title')}</h2>

          {this.loading ? (
            <LoadingIndicator />
          ) : (
            <div className="MatchesPage-list">
              {this.events.length === 0 ? (
                <p>{app.translator.trans('huseyinfiliz-pickem.forum.matches.no_matches')}</p>
              ) : (
                this.events.map(event => this.renderEvent(event))
              )}
            </div>
          )}
        </div>
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
}
