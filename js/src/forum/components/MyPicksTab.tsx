import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

declare global {
  const dayjs: any;
}

export default class MyPicksTab extends Component {
  picksPage: number = 0;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.picksPage = 0;
  }

  view() {
    if (!app.session.user) {
      return (
        <div className="MyPicksPage-empty">
          <p>{app.translator.trans('huseyinfiliz-pickem.lib.messages.login_required')}</p>
        </div>
      );
    }

    const { picks } = this.attrs;
    const myPicks = Object.values(picks || {});

    if (!myPicks || myPicks.length === 0) {
      return (
        <div className="MyPicksPage-empty">
          <i className="fas fa-clipboard-list" style="font-size: 48px; opacity: 0.3; margin-bottom: 16px;" />
          <p>{app.translator.trans('huseyinfiliz-pickem.lib.messages.no_data')}</p>
        </div>
      );
    }

    // Sort by date (newest first)
    const sortedPicks = myPicks
      .filter((pick: any) => {
        try {
          const ev = pick && (typeof pick.event === 'function' ? pick.event() : pick.event);
          return ev != null;
        } catch {
          return false;
        }
      })
      .sort((a: any, b: any) => {
        try {
          const eventA = typeof a.event === 'function' ? a.event() : a.event;
          const eventB = typeof b.event === 'function' ? b.event() : b.event;
          const dateA = eventA && typeof eventA.matchDate === 'function' ? new Date(eventA.matchDate()).getTime() : 0;
          const dateB = eventB && typeof eventB.matchDate === 'function' ? new Date(eventB.matchDate()).getTime() : 0;
          return dateB - dateA;
        } catch {
          return 0;
        }
      });

    const displayPicks = sortedPicks.slice(0, (this.picksPage + 1) * 10);
    const hasMore = sortedPicks.length > displayPicks.length;

    return (
      <div>
        {/* YENİ: Div tabanlı liste yapısı */}
        <div className="PickemList PickemList--my-picks">
          {/* Header (Desktop) */}
          <div className="PickemList-header">
            <div className="PickemList-cell type-match">{app.translator.trans('huseyinfiliz-pickem.lib.common.match')}</div>
            <div className="PickemList-cell type-date">{app.translator.trans('huseyinfiliz-pickem.lib.common.date')}</div>
            <div className="PickemList-cell type-pick">{app.translator.trans('huseyinfiliz-pickem.forum.picks.your_pick')}</div>
            <div className="PickemList-cell type-result">{app.translator.trans('huseyinfiliz-pickem.lib.common.result')}</div>
            <div className="PickemList-cell type-status">{app.translator.trans('huseyinfiliz-pickem.lib.common.status')}</div>
          </div>

          {/* Body (Items) */}
          <div className="PickemList-body">
            {displayPicks.map((pick: any) => {
              const event = typeof pick.event === 'function' ? pick.event() : pick.event;
              if (!event) return null;

              const homeTeam = event.homeTeam ? event.homeTeam() : null;
              const awayTeam = event.awayTeam ? event.awayTeam() : null;
              const pickId = pick && (typeof pick.id === 'function' ? pick.id() : pick.id);
              const isCorrect = pick.isCorrect && typeof pick.isCorrect === 'function' ? pick.isCorrect() : null;

              // Satır için sınıf belirleme
              let itemClass = 'pending';
              if (isCorrect === true) itemClass = 'correct';
              if (isCorrect === false) itemClass = 'incorrect';

              let matchDate = '-';
              try {
                matchDate = dayjs(event.matchDate()).format('DD MMM YYYY');
              } catch {}

              return (
                <div key={String(pickId || Math.random())} className={`PickemList-item ${itemClass}`}>
                  
                  {/* Maç (Mobilde başlık olacak) */}
                  <div className="PickemList-cell type-match">
                    <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.common.match')}</span>
                    <span className="value">
                        {homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home')}{' '}
                        {app.translator.trans('huseyinfiliz-pickem.lib.common.vs')}{' '}
                        {awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away')}
                    </span>
                  </div>

                  {/* Tarih */}
                  <div className="PickemList-cell type-date">
                    <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.common.date')}</span>
                    <span className="value">{matchDate}</span>
                  </div>

                  {/* Tahmin */}
                  <div className="PickemList-cell type-pick">
                    <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.forum.picks.your_pick')}</span>
                    <span className="value">{this.formatResult(pick.selectedOutcome(), homeTeam, awayTeam)}</span>
                  </div>

                  {/* Sonuç */}
                  <div className="PickemList-cell type-result">
                    <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.common.result')}</span>
                    <span className="value">{event.result && event.result() ? this.formatResult(event.result(), homeTeam, awayTeam) : '-'}</span>
                  </div>

                  {/* Durum (Mobilde footer olacak) */}
                  <div className="PickemList-cell type-status">
                    <span className="mobile-label">{app.translator.trans('huseyinfiliz-pickem.lib.common.status')}</span>
                    <span className="value">
                      {isCorrect === null ? (
                        <span className="PickStatus PickStatus--pending">
                          <i className="fas fa-hourglass-half" /> {app.translator.trans('huseyinfiliz-pickem.lib.status.pending')}
                        </span>
                      ) : isCorrect ? (
                        <span className="PickStatus PickStatus--correct">
                          <i className="fas fa-check" /> {app.translator.trans('huseyinfiliz-pickem.lib.status.correct')}
                        </span>
                      ) : (
                        <span className="PickStatus PickStatus--incorrect">
                          <i className="fas fa-times" /> {app.translator.trans('huseyinfiliz-pickem.lib.status.incorrect')}
                        </span>
                      )}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
        {/* ESKİ YAPI BİTTİ */}

        {hasMore && (
          <div className="LoadMore">
            <Button
              className="Button Button--primary"
              onclick={() => {
                this.picksPage++;
                m.redraw();
              }}
            >
              {app.translator.trans('huseyinfiliz-pickem.lib.buttons.load_more')}
            </Button>
          </div>
        )}
      </div>
    );
  }

  formatResult(result: string, homeTeam: any, awayTeam: any) {
    if (result === 'home') return homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home');
    if (result === 'away') return awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away');
    if (result === 'draw') return app.translator.trans('huseyinfiliz-pickem.lib.common.draw');
    return result;
  }
}