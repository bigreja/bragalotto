import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import WeekModal from './WeekModal'; // Modal import edildi

export default class WeeksTab extends Component {
  view() {
    const weeks = app.store.all('pickem-weeks');
    // const seasons = app.store.all('pickem-seasons'); // Artık burada gerekmiyor

    return (
      <div className="WeeksTab">
        <div className="WeeksTab-header">
          <h3>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.title')}</h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(WeekModal, { week: null })} // prompt() yerine modal kullanıldı
          >
            {app.translator.trans('huseyinfiliz-pickem.admin.weeks.create')}
          </Button>
        </div>

        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.name')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.season')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.week_number')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.buttons.actions')}</th> {/* Eylem sütunu eklendi */}
            </tr>
          </thead>
          <tbody>
            {weeks.map(week => {
              const season = week.season();
              return (
                <tr key={week.id()}>
                  <td>{week.name()}</td>
                  <td>{season ? season.name() : 'None'}</td>
                  <td>{week.weekNumber() || '-'}</td>
                  <td>
                    {/* Düzenle butonu eklendi */}
                    <Button
                      className="Button Button--primary"
                      icon="fas fa-edit"
                      onclick={() => app.modal.show(WeekModal, { week })}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.admin.buttons.edit')}
                    </Button>
                    {/* Sil butonu eklendi */}
                    <Button
                      className="Button Button--danger"
                      icon="fas fa-trash"
                      onclick={() => this.deleteWeek(week)}
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

  // createWeek() metodu kaldırıldı (artık WeekModal'da)

  // Silme fonksiyonu eklendi
  deleteWeek(week) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.weeks.delete_confirmation'))) {
      return;
    }

    week.delete().then(() => {
      m.redraw();
    });
  }
}