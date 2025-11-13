import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import TeamModal from './TeamModal';

export default class TeamsTab extends Component {
  view() {
    const teams = app.store.all('pickem-teams');

    return (
      <div className="TeamsTab">
        <div className="TeamsTab-header">
          <h3>
            <i className="fas fa-users" />
            {app.translator.trans('huseyinfiliz-pickem.admin.teams.title')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(TeamModal, { team: null })}
          >
            {app.translator.trans('huseyinfiliz-pickem.admin.teams.create')}
          </Button>
        </div>

        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.teams.logo')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.teams.name')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.teams.slug')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.buttons.actions')}</th>
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
                    onclick={() => app.modal.show(TeamModal, { team })}
                  >
                    {app.translator.trans('huseyinfiliz-pickem.admin.buttons.edit')}
                  </Button>
                  <Button
                    className="Button Button--danger"
                    icon="fas fa-trash"
                    onclick={() => this.deleteTeam(team)}
                  >
                    {app.translator.trans('huseyinfiliz-pickem.admin.buttons.delete')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  renderTeamLogo(team: any) {
    const logoUrl = team.logoUrl();
    const teamName = team.name();
    const firstLetter = teamName ? teamName.charAt(0).toUpperCase() : 'T';

    // Hash fonksiyonu - takım adından renk üret
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

  deleteTeam(team: any) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.teams.delete_confirmation'))) {
      return;
    }

    team.delete().then(() => {
      m.redraw();
    });
  }
}