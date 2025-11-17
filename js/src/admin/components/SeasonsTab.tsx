import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import SeasonModal from './modals/SeasonModal'; // İÇE AKTARMA YOLU GÜNCELLENDİ
import Season from '../../common/models/Season'; // Model import edildi

export default class SeasonsTab extends Component {
  view() {
    const seasons = app.store.all('pickem-seasons') as Season[];

    return (
      <div className="SeasonsTab">
        <div className="SeasonsTab-header">
          <h3>
            <i className="fas fa-calendar-alt" />
            {app.translator.trans('huseyinfiliz-pickem.admin.seasons.title')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(SeasonModal, {
              season: null,
              onsave: () => m.redraw() // Kaydettikten sonra listeyi yenile
            })}
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
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.buttons.actions')}</th>
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
                <td>
                  <Button
                    className="Button Button--primary"
                    icon="fas fa-edit"
                    onclick={() => app.modal.show(SeasonModal, {
                      season: season,
                      onsave: () => m.redraw() // Düzenledikten sonra listeyi yenile
                    })}
                  >
                    {app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')}
                  </Button>
                  <Button
                    className="Button Button--danger"
                    icon="fas fa-trash"
                    onclick={() => this.deleteSeason(season)}
                  >
                    {app.translator.trans('huseyinfiliz-pickem.lib.buttons.delete')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  deleteSeason(season: Season) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.seasons.delete_confirmation'))) {
      return;
    }

    season.delete().then(() => {
      m.redraw();
    });
  }
}