import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import WeekModal from './modals/WeekModal'; 
import Week from '../../common/models/Week'; 
import extractText from 'flarum/common/utils/extractText';

export default class WeeksTab extends Component {
  view() {
    const weeks = app.store.all('pickem-weeks') as Week[];
    // GÜNCELLENDİ: lib.models -> lib.common
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.week');

    return (
      <div className="WeeksTab">
        <div className="WeeksTab-header">
          <h3>
            <i className="fas fa-calendar-week" />
            {app.translator.trans('huseyinfiliz-pickem.lib.nav.weeks')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(WeekModal, {
              week: null,
              onsave: () => m.redraw() 
            })}
          >
            {app.translator.trans('huseyinfiliz-pickem.lib.actions.create', { resource: resourceName })}
          </Button>
        </div>

        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.name')}</th>
              {/* GÜNCELLENDİ: lib.headers.season -> lib.common.season */}
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.common.season')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.week_number')}</th>
              <th></th>
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
                        onsave: () => m.redraw() 
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
    // GÜNCELLENDİ: lib.models -> lib.common
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.week');
    const confirmMessage = extractText(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', { resource: resourceName }));
    
    if (!confirm(confirmMessage)) {
      return;
    }
    week.delete().then(() => {
      m.redraw();
    });
  }
}