import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import TeamModal from './TeamModal';

export default class TeamsTab extends Component {
  view() {
    const teams = app.store.all('pickem-teams');

    return (
      <div className="TeamsTab">
        <div className="TeamsTab-header">
          <h3>{app.translator.trans('huseyinfiliz-pickem.admin.teams.title')}</h3>
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
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.teams.name')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.teams.slug')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.teams.logo')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.teams.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id()}>
                <td>{team.name()}</td>
                <td>{team.slug()}</td>
                <td>
                  {team.logoUrl() && (
                    <img src={team.logoUrl()} alt={team.name()} style="max-width: 50px; max-height: 50px;" />
                  )}
                </td>
                <td>
                  <Button
                    className="Button Button--primary"
                    icon="fas fa-edit"
                    onclick={() => app.modal.show(TeamModal, { team })}
                  >
                    {app.translator.trans('huseyinfiliz-pickem.admin.teams.edit')}
                  </Button>
                  <Button
                    className="Button Button--danger"
                    icon="fas fa-trash"
                    onclick={() => this.deleteTeam(team)}
                  >
                    {app.translator.trans('huseyinfiliz-pickem.admin.teams.delete')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  deleteTeam(team) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.teams.delete_confirmation'))) {
      return;
    }

    team.delete().then(() => {
      m.redraw();
    });
  }
}
