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
          <p>{app.translator.trans('huseyinfiliz-pickem.lib.messages.no_data')}</p>
        </div>
      );
    }

    return (
      <div className="LeaderboardTab">
        <div className="Leaderboard">
          {/* Podyum yapısı mobil için zaten uygundu, aynen kalıyor */}
          {userScores.length >= 3 && this.renderPodium(userScores.slice(0, 3))}
          
          {/* renderTable yerine renderList çağırıyoruz */}
          {this.renderList(userScores)}
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
                {user ? (typeof user.displayName === 'function' ? user.displayName() : user.displayName) : app.translator.trans('core.lib.username.deleted_text')}
              </div>
              <div className="points">
                {totalPoints}
                <small>{app.translator.trans('huseyinfiliz-pickem.lib.common.points')}</small>
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

  /**
   * YENİ: renderTable yerine Flarum standartlarına uygun responsive liste metodu
   */
  renderList(userScores: any[]) {
    return (
      <div className="PickemList">
        {/* Başlıklar (Sadece Masaüstünde görünür) */}
        <div className="PickemList-header">
          <div className="PickemList-cell type-rank">{app.translator.trans('huseyinfiliz-pickem.lib.headers.rank')}</div>
          <div className="PickemList-cell type-player">{app.translator.trans('huseyinfiliz-pickem.lib.headers.player')}</div>
          <div className="PickemList-cell type-stat">{app.translator.trans('huseyinfiliz-pickem.lib.common.points')}</div>
          <div className="PickemList-cell type-stat">{app.translator.trans('huseyinfiliz-pickem.lib.headers.correct')}</div>
          <div className="PickemList-cell type-stat">{app.translator.trans('huseyinfiliz-pickem.lib.headers.total')}</div>
          <div className="PickemList-cell type-stat">{app.translator.trans('huseyinfiliz-pickem.lib.headers.accuracy')}</div>
        </div>

        {/* Liste Öğeleri */}
        <div className="PickemList-body">
          {userScores.map((score: any, index: number) => {
            const user = score && (typeof score.user === 'function' ? score.user() : score.user);
            const scoreId = (score && (typeof score.id === 'function' ? score.id() : score.id)) || index;
            
            const totalPoints = typeof score.totalPoints === 'function' ? score.totalPoints() : score.totalPoints;
            const correctPicks = typeof score.correctPicks === 'function' ? score.correctPicks() : score.correctPicks;
            const totalPicks = typeof score.totalPicks === 'function' ? score.totalPicks() : score.totalPicks;
            const accuracy = typeof score.accuracy === 'function' ? score.accuracy() : 0;

            return (
              <div key={String(scoreId)} className={`PickemList-item ${index < 3 ? `top-${index + 1}` : ''}`}>
                
                <div className="PickemList-cell type-rank">
                  {/* Mobilde görünecek etiket */}
                  <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.headers.rank')}</span>
                  <span className="value">#{index + 1}</span>
                </div>

                <div className="PickemList-cell type-player">
                  {/* Oyuncu adı için mobilde etikete gerek yok */}
                  <span className="value">
                    {user ? (typeof user.displayName === 'function' ? user.displayName() : user.displayName) : app.translator.trans('core.lib.username.deleted_text')}
                  </span>
                </div>

                <div className="PickemList-cell type-stat">
                  <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.common.points')}</span>
                  <span className="value"><strong>{totalPoints}</strong></span>
                </div>

                <div className="PickemList-cell type-stat">
                  <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.headers.correct')}</span>
                  <span className="value">{correctPicks}</span>
                </div>

                <div className="PickemList-cell type-stat">
                  <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.headers.total')}</span>
                  <span className="value">{totalPicks}</span>
                </div>

                <div className="PickemList-cell type-stat">
                  <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.headers.accuracy')}</span>
                  <span className="value">{accuracy}%</span>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    );
  }
}