import Component from 'flarum/common/Component';

export default class LeaderboardTab extends Component {
  view() {
    const { userScores } = this.attrs;

    if (!userScores || userScores.length === 0) {
      return (
        <div className="LeaderboardPage-empty">
          <i className="fas fa-trophy" style="font-size: 48px; opacity: 0.3; margin-bottom: 16px;" />
          <p>No scores yet</p>
        </div>
      );
    }

    const sorted = [...userScores].sort((a: any, b: any) => {
      const aPoints = typeof a.totalPoints === 'function' ? a.totalPoints() : 0;
      const bPoints = typeof b.totalPoints === 'function' ? b.totalPoints() : 0;
      return bPoints - aPoints;
    });

    const top3 = sorted.slice(0, 3);
    const rest = sorted.slice(3);

    return (
      <div>
        {top3.length > 0 && <div className="Podium">{top3.map((score, index) => this.renderPodiumCard(score, index + 1))}</div>}

        {rest.length > 0 && (
          <table className="LeaderboardTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Points</th>
                <th>Correct</th>
                <th>Total</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((score: any, index: number) => {
                const rank = index + 4;
                const user = typeof score.user === 'function' ? score.user() : null;
                const scoreId = typeof score.id === 'function' ? score.id() : Math.random();

                return (
                  <tr key={scoreId}>
                    <td>{rank}</td>
                    <td>{user && typeof user.displayName === 'function' ? user.displayName() : 'Unknown'}</td>
                    <td>
                      <strong>{typeof score.totalPoints === 'function' ? score.totalPoints() : 0}</strong>
                    </td>
                    <td>{typeof score.correctPicks === 'function' ? score.correctPicks() : 0}</td>
                    <td>{typeof score.totalPicks === 'function' ? score.totalPicks() : 0}</td>
                    <td>{typeof score.accuracy === 'function' ? score.accuracy() : 0}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  renderPodiumCard(score: any, rank: number) {
    const user = typeof score.user === 'function' ? score.user() : null;
    const username = user && typeof user.displayName === 'function' ? user.displayName() : 'Unknown';
    const points = typeof score.totalPoints === 'function' ? score.totalPoints() : 0;
    const correct = typeof score.correctPicks === 'function' ? score.correctPicks() : 0;
    const total = typeof score.totalPicks === 'function' ? score.totalPicks() : 0;
    const accuracy = typeof score.accuracy === 'function' ? score.accuracy() : 0;

    let rankClass = '';
    let medal = '';
    let rankText = '';

    if (rank === 1) {
      rankClass = 'first';
      medal = '🥇';
      rankText = '1st Place';
    } else if (rank === 2) {
      rankClass = 'second';
      medal = '🥈';
      rankText = '2nd Place';
    } else if (rank === 3) {
      rankClass = 'third';
      medal = '🥉';
      rankText = '3rd Place';
    }

    return (
      <div className={`Podium-card ${rankClass}`} key={rank}>
        <div className="medal">{medal}</div>
        <div className="rank">{rankText}</div>
        <div className="username">{username}</div>
        <div className="points">
          {points} <small>pts</small>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="label">Correct</div>
            <div className="value">{correct}</div>
          </div>
          <div className="stat">
            <div className="label">Total</div>
            <div className="value">{total}</div>
          </div>
          <div className="stat">
            <div className="label">Accuracy</div>
            <div className="value">{accuracy}%</div>
          </div>
        </div>
      </div>
    );
  }
}