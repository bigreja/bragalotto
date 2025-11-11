import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Select from 'flarum/common/components/Select';

export default class LeaderboardPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = true;
    this.scores = [];
    this.seasons = [];
    this.selectedSeason = null;

    this.loadData();
  }

  async loadData() {
    try {
      const [scores, seasons] = await Promise.all([
        app.store.find('pickem-user-scores', {
          include: 'user,season',
        }),
        app.store.find('pickem-seasons'),
      ]);

      this.scores = scores;
      this.seasons = seasons;
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  view() {
    return (
      <div className="LeaderboardPage">
        <div className="container">
          <h2>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.title')}</h2>

          {this.seasons.length > 0 && (
            <div className="LeaderboardPage-filter">
              <label>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.filter_season')}</label>
              <Select
                value={this.selectedSeason}
                options={{
                  '': app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.all_seasons'),
                  ...Object.fromEntries(
                    this.seasons.map(s => [s.id(), s.name()])
                  ),
                }}
                onchange={(value) => {
                  this.selectedSeason = value || null;
                }}
              />
            </div>
          )}

          {this.loading ? (
            <LoadingIndicator />
          ) : (
            <div className="LeaderboardPage-table">
              {this.getFilteredScores().length === 0 ? (
                <p>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.no_scores')}</p>
              ) : (
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
                    {this.getFilteredScores().map((score, index) => this.renderScore(score, index + 1))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  getFilteredScores() {
    let filtered = this.scores;

    if (this.selectedSeason) {
      filtered = filtered.filter(s => s.seasonId() == this.selectedSeason);
    }

    return filtered.sort((a, b) => {
      if (b.totalPoints() !== a.totalPoints()) {
        return b.totalPoints() - a.totalPoints();
      }
      return b.correctPicks() - a.correctPicks();
    });
  }

  renderScore(score, rank) {
    const user = score.user();

    return (
      <tr key={score.id()} className={user && app.user && user.id() === app.user.id() ? 'highlight' : ''}>
        <td><strong>#{rank}</strong></td>
        <td>{user ? user.displayName() : 'Unknown'}</td>
        <td><strong>{score.totalPoints()}</strong></td>
        <td>{score.correctPicks()}</td>
        <td>{score.totalPicks()}</td>
        <td>{score.accuracy()}%</td>
      </tr>
    );
  }
}
