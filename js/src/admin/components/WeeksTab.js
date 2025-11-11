import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

export default class WeeksTab extends Component {
  view() {
    const weeks = app.store.all('pickem-weeks');
    const seasons = app.store.all('pickem-seasons');

    return (
      <div className="WeeksTab">
        <div className="WeeksTab-header">
          <h3>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.title')}</h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => this.createWeek(seasons)}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  createWeek(seasons) {
    const name = prompt('Week name:');
    if (!name) return;

    const weeks = app.store.all('pickem-weeks');

    app.store.createRecord('pickem-weeks').save({
      name,
      weekNumber: weeks.length + 1,
    }).then(() => m.redraw());
  }
}
