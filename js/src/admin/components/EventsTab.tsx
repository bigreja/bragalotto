import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import EventModal from './EventModal';
import ResultModal from './ResultModal';

export default class EventsTab extends Component {
  private selectedSeason: string = 'all';
  private selectedTeam: string = 'all';
  private selectedStatus: string = 'all';
  private sortOrder: string = 'desc';

  view() {
    const allEvents = app.store.all('pickem-events');
    const allSeasons = app.store.all('pickem-seasons');
    const allTeams = app.store.all('pickem-teams');

    // Filtreleme
    let filteredEvents = allEvents.filter((event: any) => {
      if (this.selectedSeason !== 'all') {
        const week = event.week();
        const seasonId = week ? week.season()?.id() : null;
        if (seasonId !== this.selectedSeason) return false;
      }

      if (this.selectedTeam !== 'all') {
        const homeTeamId = event.homeTeam()?.id();
        const awayTeamId = event.awayTeam()?.id();
        if (homeTeamId !== this.selectedTeam && awayTeamId !== this.selectedTeam) {
          return false;
        }
      }

      if (this.selectedStatus !== 'all') {
        if (event.status() !== this.selectedStatus) return false;
      }

      return true;
    });

    // Sıralama
    filteredEvents.sort((a: any, b: any) => {
      const dateA = new Date(a.matchDate()).getTime();
      const dateB = new Date(b.matchDate()).getTime();
      return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return (
      <div className="EventsTab">
        <div className="EventsTab-header">
          <h3>
            <i className="fas fa-futbol" />
            {app.translator.trans('huseyinfiliz-pickem.admin.events.title')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(EventModal, { event: null })}
          >
            {app.translator.trans('huseyinfiliz-pickem.admin.events.create')}
          </Button>
        </div>

        {/* FİLTRELER */}
        <div className="EventsTab-filters">
          <div className="FilterGroup">
            <label>
              <i className="fas fa-calendar-alt" />
              <span>{app.translator.trans('huseyinfiliz-pickem.admin.filters.season')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedSeason}
              onchange={(e: any) => {
                this.selectedSeason = e.target.value;
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.admin.filters.all_seasons')}</option>
              {allSeasons.map((season: any) => (
                <option value={season.id()} key={season.id()}>
                  {season.name()}
                </option>
              ))}
            </select>
          </div>

          <div className="FilterGroup">
            <label>
              <i className="fas fa-users" />
              <span>{app.translator.trans('huseyinfiliz-pickem.admin.filters.team')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedTeam}
              onchange={(e: any) => {
                this.selectedTeam = e.target.value;
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.admin.filters.all_teams')}</option>
              {allTeams.map((team: any) => (
                <option value={team.id()} key={team.id()}>
                  {team.name()}
                </option>
              ))}
            </select>
          </div>

          <div className="FilterGroup">
            <label>
              <i className="fas fa-info-circle" />
              <span>{app.translator.trans('huseyinfiliz-pickem.admin.filters.status')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedStatus}
              onchange={(e: any) => {
                this.selectedStatus = e.target.value;
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.admin.filters.all_statuses')}</option>
              <option value="scheduled">{app.translator.trans('huseyinfiliz-pickem.admin.status.scheduled')}</option>
              <option value="closed">{app.translator.trans('huseyinfiliz-pickem.admin.status.closed')}</option>
              <option value="finished">{app.translator.trans('huseyinfiliz-pickem.admin.status.finished')}</option>
            </select>
          </div>

          <div className="FilterGroup">
            <label>
              <i className="fas fa-sort" />
              <span>{app.translator.trans('huseyinfiliz-pickem.admin.filters.sort')}</span>
            </label>
            <select
              className="FormControl"
              value={this.sortOrder}
              onchange={(e: any) => {
                this.sortOrder = e.target.value;
              }}
            >
              <option value="desc">{app.translator.trans('huseyinfiliz-pickem.admin.filters.newest_first')}</option>
              <option value="asc">{app.translator.trans('huseyinfiliz-pickem.admin.filters.oldest_first')}</option>
            </select>
          </div>

          {(this.selectedSeason !== 'all' || 
            this.selectedTeam !== 'all' || 
            this.selectedStatus !== 'all' || 
            this.sortOrder !== 'desc') && (
            <Button
              className="Button FilterGroup-reset"
              icon="fas fa-redo"
              onclick={() => {
                this.selectedSeason = 'all';
                this.selectedTeam = 'all';
                this.selectedStatus = 'all';
                this.sortOrder = 'desc';
              }}
            >
              {app.translator.trans('huseyinfiliz-pickem.admin.filters.reset')}
            </Button>
          )}
        </div>

        <div className="EventsTab-count">
          <i className="fas fa-list" />
          <span>
            {app.translator.trans('huseyinfiliz-pickem.admin.filters.showing')} <strong>{filteredEvents.length}</strong> {app.translator.trans('huseyinfiliz-pickem.admin.filters.of')} <strong>{allEvents.length}</strong> {app.translator.trans('huseyinfiliz-pickem.admin.filters.matches')}
          </span>
        </div>

        <table className="Table">
          <thead>
            <tr>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.home_team')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.away_team')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.match_date')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.status')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.events.score')}</th>
              <th>{app.translator.trans('huseyinfiliz-pickem.admin.buttons.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colspan="6" className="EmptyState-table">
                  <i className="fas fa-search" />
                  <p>{app.translator.trans('huseyinfiliz-pickem.admin.filters.no_matches_found')}</p>
                </td>
              </tr>
            ) : (
              filteredEvents.map((event: any) => {
                const homeTeam = event.homeTeam();
                const awayTeam = event.awayTeam();

                return (
                  <tr key={event.id()}>
                    <td>
                      <div className="TeamCell">
                        {this.renderTeamLogo(homeTeam)}
                        <span>{homeTeam ? homeTeam.name() : 'N/A'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="TeamCell">
                        {this.renderTeamLogo(awayTeam)}
                        <span>{awayTeam ? awayTeam.name() : 'N/A'}</span>
                      </div>
                    </td>
                    <td>{new Date(event.matchDate()).toLocaleString()}</td>
                    <td>
                      <span className={`StatusBadge StatusBadge--${event.status()}`}>
                        {event.status()}
                      </span>
                    </td>
                    <td>
                      {event.homeScore() !== null && event.awayScore() !== null
                        ? `${event.homeScore()} - ${event.awayScore()}`
                        : '-'}
                    </td>
                    <td>
                      <Button
                        className="Button Button--primary"
                        icon="fas fa-edit"
                        onclick={() => app.modal.show(EventModal, { event })}
                      >
                        {app.translator.trans('huseyinfiliz-pickem.admin.buttons.edit')}
                      </Button>
                      <Button
                        className="Button Button--success"
                        icon="fas fa-check"
                        onclick={() => app.modal.show(ResultModal, { event })}
                      >
                        {app.translator.trans('huseyinfiliz-pickem.admin.events.enter_result')}
                      </Button>
                      <Button
                        className="Button Button--danger"
                        icon="fas fa-trash"
                        onclick={() => this.deleteEvent(event)}
                      >
                        {app.translator.trans('huseyinfiliz-pickem.admin.buttons.delete')}
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }

  renderTeamLogo(team: any) {
    if (!team) {
      return (
        <div className="TeamLogo TeamLogo--letter" style="background-color: #999">
          ?
        </div>
      );
    }

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

  deleteEvent(event: any) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.events.delete_confirmation'))) {
      return;
    }

    event.delete().then(() => {
      m.redraw();
    });
  }
}