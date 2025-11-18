import Component from 'flarum/common/Component';
import extractText from 'flarum/common/utils/extractText';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import EventModal from './modals/EventModal';
import ResultModal from './modals/ResultModal';
import PickemEvent from '../../common/models/Event';
import Team from '../../common/models/Team';
import Button from 'flarum/common/components/Button';

export default class EventsTab extends Component {
  private selectedSeason: string = 'all';
  private selectedTeam: string = 'all';
  private selectedStatus: string = 'all';
  private sortOrder: string = 'desc';
  private loading: boolean = true;
  private events: PickemEvent[] = [];
  private totalEvents: number = 0;
  private page: number = 1;
  private limit: number = 20;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.loadEvents();
  }

  buildFilters() {
    const filters: any = {};
    const weekIds = [];

    if (this.selectedSeason !== 'all') {
      const weeks = app.store.all('pickem-weeks').filter((week: any) => week.seasonId() == this.selectedSeason);
      weekIds.push(...weeks.map((week: any) => week.id()));
      if (weekIds.length === 0) weekIds.push('0');
      filters.week = weekIds.join(',');
    }

    if (this.selectedTeam !== 'all') {
      filters.team = this.selectedTeam;
    }

    if (this.selectedStatus !== 'all') {
      filters.status = this.selectedStatus;
    }

    return filters;
  }

  loadEvents(page: number = 1) {
    this.loading = true;
    this.page = page;
    m.redraw();

    const filters = this.buildFilters();
    const sort = this.sortOrder === 'desc' ? '-matchDate' : 'matchDate';
    const offset = (this.page - 1) * this.limit;

    app.store.find('pickem-events', {
      include: 'homeTeam,awayTeam,week',
      filter: filters,
      sort: sort,
      page: { limit: this.limit, offset: offset }
    }).then((results: any) => {
      this.loading = false;
      this.events = results as PickemEvent[];
      this.totalEvents = results.payload.meta.total;
      m.redraw();
    }).catch(err => {
      this.loading = false;
      console.error(err);
      m.redraw();
    });
  }

  view() {
    const seasons = app.store.all('pickem-seasons');
    const teams = app.store.all('pickem-teams');
    const totalPages = Math.ceil(this.totalEvents / this.limit);
    const canShowPagination = totalPages > 1;
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.match');

    return (
      <div className="EventsTab">
        <div className="EventsTab-header">
          <h3>
            <i className="fas fa-calendar-alt" />
            {app.translator.trans('huseyinfiliz-pickem.lib.nav.matches')}
          </h3>
          <Button
            className="Button Button--primary"
            icon="fas fa-plus"
            onclick={() => app.modal.show(EventModal, { event: null, onsave: () => this.loadEvents(this.page) })}
          >
            {app.translator.trans('huseyinfiliz-pickem.lib.actions.create', { resource: resourceName })}
          </Button>
        </div>

        <div className="EventsTab-filters">
          <div className="FormGroup">
            <label>{app.translator.trans('huseyinfiliz-pickem.lib.common.season')}</label>
            <select
              value={this.selectedSeason}
              onchange={(e: any) => {
                this.selectedSeason = e.target.value;
                this.loadEvents(1);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.lib.filters.all')}</option>
              {seasons.map((season: any) => (
                <option key={season.id()} value={season.id()}>
                  {season.name()}
                </option>
              ))}
            </select>
          </div>

          <div className="FormGroup">
            <label>{app.translator.trans('huseyinfiliz-pickem.lib.common.team')}</label>
            <select
              value={this.selectedTeam}
              onchange={(e: any) => {
                this.selectedTeam = e.target.value;
                this.loadEvents(1);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.lib.filters.all')}</option>
              {teams.map((team: any) => (
                <option key={team.id()} value={team.id()}>
                  {team.name()}
                </option>
              ))}
            </select>
          </div>

          <div className="FormGroup">
            <label>{app.translator.trans('huseyinfiliz-pickem.lib.common.status')}</label>
            <select
              value={this.selectedStatus}
              onchange={(e: any) => {
                this.selectedStatus = e.target.value;
                this.loadEvents(1);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.lib.filters.all')}</option>
              <option value="scheduled">{app.translator.trans('huseyinfiliz-pickem.lib.status.scheduled')}</option>
              <option value="closed">{app.translator.trans('huseyinfiliz-pickem.lib.status.closed')}</option>
              <option value="finished">{app.translator.trans('huseyinfiliz-pickem.lib.status.finished')}</option>
            </select>
          </div>

          <div className="FormGroup">
            <label>{app.translator.trans('huseyinfiliz-pickem.lib.filters.sort')}</label>
            <select
              value={this.sortOrder}
              onchange={(e: any) => {
                this.sortOrder = e.target.value;
                this.loadEvents(this.page);
              }}
            >
              <option value="desc">{app.translator.trans('huseyinfiliz-pickem.lib.filters.newest')}</option>
              <option value="asc">{app.translator.trans('huseyinfiliz-pickem.lib.filters.oldest')}</option>
            </select>
          </div>
        </div>

        {this.loading ? (
          <LoadingIndicator />
        ) : this.events.length > 0 ? (
          <div className="CardList">
            {/* HEADER - Desktop only */}
            <div className="CardList-header">
              <div>{app.translator.trans('huseyinfiliz-pickem.lib.common.home')}</div>
              <div>{app.translator.trans('huseyinfiliz-pickem.lib.common.away')}</div>
              <div>{app.translator.trans('huseyinfiliz-pickem.lib.headers.match_date')}</div>
              <div>{app.translator.trans('huseyinfiliz-pickem.lib.common.status')}</div>
              <div>{app.translator.trans('huseyinfiliz-pickem.lib.common.score')}</div>
              <div></div>
            </div>

            {/* ITEMS */}
            {this.events.map((event: PickemEvent) => {
              const homeTeam = event.homeTeam();
              const awayTeam = event.awayTeam();

              return (
                <div key={event.id()} className="CardList-item">
                  {/* Home Team */}
                  <div className="CardList-item-cell CardList-item-cell--primary" data-label={app.translator.trans('huseyinfiliz-pickem.lib.common.home')}>
                    <div className="TeamCell">
                      {this.renderTeamLogo(homeTeam)}
                      <span>{homeTeam ? homeTeam.name() : 'N/A'}</span>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="CardList-item-cell" data-label={app.translator.trans('huseyinfiliz-pickem.lib.common.away')}>
                    <div className="TeamCell">
                      {this.renderTeamLogo(awayTeam)}
                      <span>{awayTeam ? awayTeam.name() : 'N/A'}</span>
                    </div>
                  </div>

                  {/* Match Date */}
                  <div className="CardList-item-cell CardList-item-cell--muted" data-label={app.translator.trans('huseyinfiliz-pickem.lib.headers.match_date')}>
                    {event.matchDate() ? new Date(event.matchDate()!).toLocaleString() : '-'}
                  </div>

                  {/* Status */}
                  <div className="CardList-item-cell" data-label={app.translator.trans('huseyinfiliz-pickem.lib.common.status')}>
                    <span className={`StatusBadge StatusBadge--${event.status()}`}>
                      {app.translator.trans(`huseyinfiliz-pickem.lib.status.${event.status()}`)}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="CardList-item-cell" data-label={app.translator.trans('huseyinfiliz-pickem.lib.common.score')}>
                    {event.homeScore() !== null && event.awayScore() !== null
                      ? `${event.homeScore()} - ${event.awayScore()}`
                      : '-'}
                  </div>

                  {/* Actions */}
                  <div className="CardList-item-actions">
                    <Button
                      className="Button Button--primary"
                      icon="fas fa-edit"
                      onclick={() => app.modal.show(EventModal, { event: event, onsave: () => this.loadEvents(this.page) })}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.lib.buttons.edit')}
                    </Button>
                    <Button
                      className="Button Button--success"
                      icon="fas fa-check"
                      onclick={() => app.modal.show(ResultModal, { event: event, onsave: () => this.loadEvents(this.page) })}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.lib.actions.enter_result')}
                    </Button>
                    <Button
                      className="Button Button--danger"
                      icon="fas fa-trash"
                      onclick={() => this.deleteEvent(event)}
                    >
                      {app.translator.trans('huseyinfiliz-pickem.lib.buttons.delete')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="EmptyState">
            <i className="fas fa-calendar-times" />
            <p>{app.translator.trans('huseyinfiliz-pickem.lib.messages.no_matches')}</p>
          </div>
        )}

        {canShowPagination && !this.loading && (
          <nav className="Pagination">
            <Button
              className="Button Pagination-button Pagination-previous"
              icon="fas fa-chevron-left"
              disabled={this.page === 1}
              onclick={() => {
                if (this.page > 1) {
                  this.loadEvents(this.page - 1);
                }
              }}
            />
            
            <span className="Pagination-info">
              {app.translator.trans('huseyinfiliz-pickem.lib.pagination.page_info', {
                current: this.page,
                total: totalPages
              })}
            </span>

            <Button
              className="Button Pagination-button Pagination-next"
              icon="fas fa-chevron-right"
              disabled={this.page >= totalPages}
              onclick={() => {
                if (this.page < totalPages) {
                  this.loadEvents(this.page + 1);
                }
              }}
            />
          </nav>
        )}
      </div>
    );
  }

  renderTeamLogo(team: Team | null) {
    if (!team) {
      return (
        <div className="TeamLogo TeamLogo--letter" style={{ backgroundColor: '#999' }}>?</div>
      );
    }

    const logoUrl = team.logoUrl();
    const teamName = team.name();
    const firstLetter = teamName ? teamName.charAt(0).toUpperCase() : '?';

    const stringToColor = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = hash % 360;
      return `hsl(${hue}, 65%, 50%)`;
    };

    if (logoUrl) {
      return (
        <img
          src={logoUrl}
          alt={teamName || 'Team'}
          className="TeamLogo TeamLogo--image"
        />
      );
    } else {
      const backgroundColor = stringToColor(teamName || 'Team');
      return (
        <div className="TeamLogo TeamLogo--letter" style={{ backgroundColor }}>
          {firstLetter}
        </div>
      );
    }
  }

  deleteEvent(event: PickemEvent) {
    const resourceName = app.translator.trans('huseyinfiliz-pickem.lib.common.match');
    const confirmMessage = extractText(app.translator.trans('huseyinfiliz-pickem.lib.messages.delete_confirm', { resource: resourceName }));
    
    if (confirm(confirmMessage)) {
      event.delete().then(() => {
        this.loadEvents(this.page);
      });
    }
  }
}