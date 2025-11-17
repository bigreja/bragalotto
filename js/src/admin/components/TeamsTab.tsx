import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import TeamModal from './modals/TeamModal';
import Team from '../../common/models/Team';
// GÜNCELLENDİ: extractText import edildi
import extractText from 'flarum/common/utils/extractText';

export default class TeamsTab extends Component {
  view() {
    const teams = app.store.all('pickem-teams') as Team[];
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.models.team');

    return (
      <div className="TeamsTab">
        <div className="TeamsTab-header">
          <h3>
            <i className="fas fa-users" />
            {app.translator.trans('huseyinfiliz-pickem.lib.nav.teams')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(TeamModal, {
              team: null,
              onsave: () => m.redraw() 
            })}
          >
            {app.translator.trans('huseyinfiliz-pickem.lib.actions.create', { resource: resourceName })}
          </Button>
        </div>

        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.logo')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.name')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.lib.headers.slug')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id()}>
                <td>
                  {this.renderTeamLogo(team)}
                </td>
                <td>{team.name()}</td>
                <td>{team.slug()}</td>
                <td>
                  <Button
                    className="Button Button--primary"
                    icon="fas fa-edit"
                    onclick={() => app.modal.show(TeamModal, {
                      team: team,
                      onsave: () => m.redraw()
                    })}
                  >
                    {app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')}
                  </Button>
                  <Button
                    className="Button Button--danger"
                    icon="fas fa-trash"
                    onclick={() => this.deleteTeam(team)}
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

  renderTeamLogo(team: Team) {
    // ... (renderTeamLogo fonksiyonu aynı)
    const logoUrl = team.logoUrl();
    const teamName = team.name();
    const firstLetter = teamName ? teamName.charAt(0).toUpperCase() : 'T';
    const stringToColor = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = hash % 360;
      return `hsl(${hue}, 65%, 50%)`;
    };
    const backgroundColor = stringToColor(teamName || 'Team');

    if (logoUrl) {
      return <img src={logoUrl} alt={teamName} className="TeamLogo TeamLogo--image" />;
    }

    return (
      <div className="TeamLogo TeamLogo--letter" style={`background-color: ${backgroundColor}`}>
        {firstLetter}
      </div>
    );
  }

  deleteTeam(team: Team) {
    // GÜNCELLENDİ: `extractText` kullanıldı
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.models.team');
    const confirmMessage = extractText(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', { resource: resourceName }));
    
    if (!confirm(confirmMessage)) {
      return;
    }
    team.delete().then(() => {
      m.redraw();
    });
  }
}