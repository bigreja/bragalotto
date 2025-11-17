import Component from 'flarum/common/Component';

interface LeaderboardTabAttrs {
  userScores: any[];
}

export default class LeaderboardTab extends Component<LeaderboardTabAttrs> {
  view() {
    const { userScores } = this.attrs;

    if (!userScores || userScores.length === 0) {
      return (
        <div className="LeaderboardTab">
          <p>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.no_scores')}</p>
        </div>
      );
    }

    return (
      <div className="LeaderboardTab">
        <div className="Leaderboard">
          {userScores.length >= 3 && this.renderPodium(userScores.slice(0, 3))}
          {this.renderTable(userScores)}
        </div>
      </div>
    );
  }

  renderPodium(topThree: any[]) {
    const medals = ['🥇', '🥈', '🥉'];
    const positions = ['first', 'second', 'third'];

    return (
      <div className="Podium">
        {topThree.map((score: any, index: number) => {
          const user = score && (typeof score.user === 'function' ? score.user() : score.user);
          const totalPoints = typeof score.totalPoints === 'function' ? score.totalPoints() : score.totalPoints;
          const correctPicks = typeof score.correctPicks === 'function' ? score.correctPicks() : score.correctPicks;

          return (
            <div className={`Podium-card ${positions[index]}`} key={index}>
              <div className="medal">{medals[index]}</div>
              <div className="rank">#{index + 1}</div>
              <div className="username">
                {user ? (typeof user.displayName === 'function' ? user.displayName() : user.displayName) : app.translator.trans('huseyinfiliz-pickem.lib.common.unknown_user')}
              </div>
              <div className="points">
                {totalPoints}
                <small>{app.translator.trans('huseyinfiliz-pickem.lib.common.pts')}</small>
              </div>
              <div className="stats">
                <div className="stat">
                  <div className="label">{app.translator.trans('huseyinfiliz-pickem.lib.common.correct')}</div>
                  <div className="value">{correctPicks}</div>
                </div>
                <div className="stat">
                  <div className="label">{app.translator.trans('huseyinfiliz-pickem.lib.common.accuracy')}</div>
                  <div className="value">{score.accuracy()}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderTable(userScores: any[]) {
    return (
      <table className="LeaderboardTable">
        <thead>
          <tr>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.common.rank')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.forum.leaderboard.player')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.common.points')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.common.correct')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.common.total')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.common.accuracy')}</th>
          </tr>
        </thead>
        <tbody>
          {userScores.map((score: any, index: number) => {
            const user = score && (typeof score.user === 'function' ? score.user() : score.user);
            const scoreId = (score && (typeof score.id === 'function' ? score.id() : score.id)) || index;
            
            const totalPoints = typeof score.totalPoints === 'function' ? score.totalPoints() : score.totalPoints;
            const correctPicks = typeof score.correctPicks === 'function' ? score.correctPicks() : score.correctPicks;
            const totalPicks = typeof score.totalPicks === 'function' ? score.totalPicks() : score.totalPicks;

            return (
              <tr key={String(scoreId)} className={index < 3 ? `top-${index + 1}` : ''}>
                <td>{index + 1}</td>
                <td>
                  <strong>
                    {user ? (typeof user.displayName === 'function' ? user.displayName() : user.displayName) : app.translator.trans('huseyinfiliz-pickem.lib.common.unknown_user')}
                  </strong>
                </td>
                <td><strong>{totalPoints}</strong></td>
                <td>{correctPicks}</td>
                <td>{totalPicks}</td>
                <td>{score.accuracy()}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}