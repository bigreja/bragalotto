import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

declare global {
  const dayjs: any;
}

export default class MyPicksTab extends Component {
  oninit(vnode: any) {
    super.oninit(vnode);
    this.picksPage = 0;
  }

  view() {
    if (!app.session.user) {
      return (
        <div className="MyPicksPage-empty">
          {/* GÜNCELLENDİ */}
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
          {/* GÜNCELLENDİ */}
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
        <div className="MyPicksList">
          <table className="Table">
            <thead>
              {/* GÜNCELLENDİ */}
              <tr>
                <th>{app.translator.trans('huseyinfiliz-pickem.lib.models.match')}</th>
                <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.date')}</th>
                <th>{app.translator.trans('huseyinfiliz-pickem.forum.picks.your_pick')}</th>
                <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.result')}</th>
                <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.status')}</th>
              </tr>
            </thead>
            <tbody>
              {displayPicks.map((pick: any) => {
                const event = typeof pick.event === 'function' ? pick.event() : pick.event;
                if (!event) return null;

                const homeTeam = event.homeTeam ? event.homeTeam() : null;
                const awayTeam = event.awayTeam ? event.awayTeam() : null;
                const pickId = pick && (typeof pick.id === 'function' ? pick.id() : pick.id);
                const isCorrect = pick.isCorrect && typeof pick.isCorrect === 'function' ? pick.isCorrect() : null;

                let rowClass = 'pending';
                if (isCorrect === true) rowClass = 'correct';
                if (isCorrect === false) rowClass = 'incorrect';

                let matchDate = '-';
                try {
                  matchDate = dayjs(event.matchDate()).format('DD MMM YYYY');
                } catch {}

                return (
                  <tr key={String(pickId || Math.random())} className={rowClass}>
                    <td>
                      <strong>
                        {/* GÜNCELLENDİ */}
                        {homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.forum.picks.home')} {app.translator.trans('huseyinfiliz-pickem.lib.common.vs')} {awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.forum.picks.away')}
                      </strong>
                    </td>
                    <td>{matchDate}</td>
                    <td>
                      <strong>{this.formatResult(pick.selectedOutcome(), homeTeam, awayTeam)}</strong>
                    </td>
                    <td>{event.result && event.result() ? this.formatResult(event.result(), homeTeam, awayTeam) : '-'}</td>
                    {/* GÜNCELLENDİ */}
                    <td>
                      {isCorrect === null ? (
                        <span style="color: #f39c12;">⏳ {app.translator.trans('huseyinfiliz-pickem.lib.status.pending')}</span>
                      ) : isCorrect ? (
                        <span style="color: #27ae60; font-weight: bold;">✓ {app.translator.trans('huseyinfiliz-pickem.lib.status.correct')}</span>
                      ) : (
                        <span style="color: #e74c3c; font-weight: bold;">✗ {app.translator.trans('huseyinfiliz-pickem.lib.status.incorrect')}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {hasMore && (
          <div className="LoadMore">
            <Button
              className="Button Button--primary"
              onclick={() => {
                this.picksPage++;
                m.redraw();
              }}
            >
              {/* GÜNCELLENDİ: Core anahtarı */}
              {app.translator.trans('core.ref.load_more')}
            </Button>
          </div>
        )}
      </div>
    );
  }

  formatResult(result: string, homeTeam: any, awayTeam: any) {
    // GÜNCELLENDİ
    if (result === 'home') return homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.forum.picks.home');
    if (result === 'away') return awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.forum.picks.away');
    if (result === 'draw') return app.translator.trans('huseyinfiliz-pickem.forum.picks.draw');
    return result;
  }
}