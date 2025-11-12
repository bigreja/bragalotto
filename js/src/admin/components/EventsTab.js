import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import EventModal from './EventModal';
import ResultModal from './ResultModal';

export default class EventsTab extends Component {
  view() {
    const events = app.store.all('pickem-events');

    return (
      <div className="EventsTab">
        <div className="EventsTab-header">
          <h3>{app.translator.trans('huseyinfiliz-pickem.admin.events.title')}</h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(EventModal, { event: null })}
          >
            {app.translator.trans('huseyinfiliz-pickem.admin.events.create')}
          </Button>
        </div>

        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.home_team')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.away_team')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.match_date')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.status')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.score')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.buttons.actions')}</th> {/* Güncellendi */}
            </tr>
          </thead>
          <tbody>
            {events.map(event => {
              const homeTeam = event.homeTeam();
              const awayTeam = event.awayTeam();

              return (
                <tr key={event.id()}>
                  <td>{homeTeam ? homeTeam.name() : 'N/A'}</td>
                  <td>{awayTeam ? awayTeam.name() : 'N/A'}</td>
                  <td>{new Date(event.matchDate()).toLocaleString()}</td>
                  <td>{event.status()}</td>
                  <td>
                    {event.homeScore() !== null && event.awayScore() !== null
                      ? `${event.homeScore()} - ${event.awayScore()}`
                      : '-'}
                  </td>
                  <td>
                    <Button
                      className="Button Button--primary"
                      icon="fas fa-edit"
                      onclick={() => app.modal.show(EventModal, { event })}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.admin.buttons.edit')}
                    </Button>
                    <Button
                      className="Button Button--success"
                      icon="fas fa-check"
                      onclick={() => app.modal.show(ResultModal, { event })}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.admin.events.enter_result')}
                    </Button>
                    {/* YENİ: Sil butonu eklendi */}
                    <Button
                      className="Button Button--danger"
                      icon="fas fa-trash"
                      onclick={() => this.deleteEvent(event)}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.admin.buttons.delete')}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // YENİ: Silme fonksiyonu eklendi
  deleteEvent(event) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.events.delete_confirmation'))) {
      return;
    }

    event.delete().then(() => {
      m.redraw();
    });
  }
}