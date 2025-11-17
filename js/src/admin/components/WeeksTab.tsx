import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import WeekModal from './modals/WeekModal'; // İÇE AKTARMA YOLU GÜNCELLENDİ
import Week from '../../common/models/Week'; // Model import edildi

export default class WeeksTab extends Component {
  view() {
    const weeks = app.store.all('pickem-weeks') as Week[];

    return (
      <div className="WeeksTab">
        <div className="WeeksTab-header">
          <h3>
            <i className="fas fa-calendar-week" />
            {app.translator.trans('huseyinfiliz-pickem.admin.weeks.title')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(WeekModal, {
              week: null,
              onsave: () => m.redraw() // Kaydettikten sonra listeyi yenile
            })}
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
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.buttons.actions')}</th>
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
                    <Button
                      className="Button Button--primary"
                      icon="fas fa-edit"
                      onclick={() => app.modal.show(WeekModal, {
                        week: week,
                        onsave: () => m.redraw() // Düzenledikten sonra listeyi yenile
                      })}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')}
                    </Button>
                    <Button
                      className="Button Button--danger"
                      icon="fas fa-trash"
                      onclick={() => this.deleteWeek(week)}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.lib.buttons.delete')}
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

  deleteWeek(week: Week) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.weeks.delete_confirmation'))) {
      return;
    }

    week.delete().then(() => {
      m.redraw();
    });
  }
}