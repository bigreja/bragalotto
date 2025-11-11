import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

export default class MyPicksPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = true;
    this.picks = [];

    if (app.user) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      this.picks = await app.store.find('pickem-picks', {
        filter: { user: app.user.id() },
        include: 'event,event.homeTeam,event.awayTeam',
      });
    } catch (error) {
      console.error('Error loading picks:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  view() {
    if (!app.user) {
      return (
        <div className="MyPicksPage">
          <div className="container">
            <h2>{app.translator.trans('huseyinfiliz-pickem.forum.picks.title')}</h2>
            <p>{app.translator.trans('huseyinfiliz-pickem.forum.picks.must_login')}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="MyPicksPage">
        <div className="container">
          <h2>{app.translator.trans('huseyinfiliz-pickem.forum.picks.title')}</h2>

          {this.loading ? (
            <LoadingIndicator />
          ) : (
            <div className="MyPicksPage-list">
              {this.picks.length === 0 ? (
                <p>{app.translator.trans('huseyinfiliz-pickem.forum.picks.no_picks')}</p>
              ) : (
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
                    {this.picks.map(pick => this.renderPick(pick))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
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
}
