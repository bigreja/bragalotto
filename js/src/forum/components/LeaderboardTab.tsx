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
          {/* GÜNCELLENDİ */}
          <p>{app.translator.trans('huseyinfiliz-pickem.lib.messages.no_data')}</p>
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
              {/* GÜNCELLENDİ */}
              <div className="rank">#{index + 1}</div>
              <div className="username">
                {user ? (typeof user.displayName === 'function' ? user.displayName() : user.displayName) : app.translator.trans('core.lib.username.deleted_text')}
              </div>
              <div className="points">
                {totalPoints}
                <small>{app.translator.trans('huseyinfiliz-pickem.lib.headers.points')}</small>
              </div>
              <div className="stats">
                <div className="stat">
                  <div className="label">{app.translator.trans('huseyinfiliz-pickem.lib.headers.correct')}</div>
                  <div className="value">{correctPicks}</div>
                </div>
                <div className="stat">
                  <div className="label">{app.translator.trans('huseyinfiliz-pickem.lib.headers.accuracy')}</div>
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
          {/* GÜNCELLENDİ */}
          <tr>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.rank')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.player')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.points')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.correct')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.total')}</th>
            <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.accuracy')}</th>
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
                    {/* GÜNCELLENDİ */}
                    {user ? (typeof user.displayName === 'function' ? user.displayName() : user.displayName) : app.translator.trans('core.lib.username.deleted_text')}
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