import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import SeasonModal from './modals/SeasonModal'; 
import Season from '../../common/models/Season'; 
// GÜNCELLENDİ: extractText import edildi
import extractText from 'flarum/common/utils/extractText';

export default class SeasonsTab extends Component {
  view() {
    const seasons = app.store.all('pickem-seasons') as Season[];
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.models.season');

    return (
      <div className="SeasonsTab">
        <div className="SeasonsTab-header">
          <h3>
            <i className="fas fa-calendar-alt" />
            {app.translator.trans('huseyinfiliz-pickem.lib.nav.seasons')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(SeasonModal, {
              season: null,
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
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.slug')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.date')}</th>
              <th></th>
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
                      onsave: () => m.redraw() 
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
    // GÜNCELLENDİ: `extractText` kullanıldı
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.models.season');
    const confirmMessage = extractText(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', { resource: resourceName }));

    if (!confirm(confirmMessage)) {
      return;
    }
    season.delete().then(() => {
      m.redraw();
    });
  }
}