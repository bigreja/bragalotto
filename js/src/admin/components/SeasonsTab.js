import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

export default class SeasonsTab extends Component {
  view() {
    const seasons = app.store.all('pickem-seasons');

    return (
      <div className="SeasonsTab">
        <div className="SeasonsTab-header">
          <h3>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.title')}</h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => this.createSeason()}
          >
            {app.translator.trans('huseyinfiliz-pickem.admin.seasons.create')}
          </Button>
        </div>

        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.name')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.slug')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.dates')}</th>
            </tr>
          </thead>
          <tbody>
            {seasons.map(season => (
              <tr key={season.id()}>
                <td>{season.name()}</td>
                <td>{season.slug()}</td>
                <td>
                  {season.startDate() && season.endDate()
                    ? `${new Date(season.startDate()).toLocaleDateString()} - ${new Date(season.endDate()).toLocaleDateString()}`
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  createSeason() {
    const name = prompt('Season name:');
    if (!name) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    app.store.createRecord('pickem-seasons').save({
      name,
      slug,
    }).then(() => m.redraw());
  }
}
