import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import Placeholder from 'flarum/common/components/Placeholder';
import EventCard from './EventCard';
import Pick from '../../common/models/Pick';
import PickemEvent from '../../common/models/Event';
import Season from '../../common/models/Season';
import Team from '../../common/models/Team';

interface IMatchesTabAttrs {
  picks: Record<string, any>;
  onPickChange: (picks: Record<string, any>) => void;
}

export default class MatchesTab extends Component<IMatchesTabAttrs> {
  private selectedSeason: string = 'all';
  private selectedTeam: string = 'all';
  private selectedStatus: string = 'all';

  private loading: boolean = false;
  private events: PickemEvent[] = [];
  
  private totalEvents: number = 0;
  private page: number = 1;
  private limit: number = 10;

  private pickLoading: Set<number> = new Set();
  
  private picks: Record<string, any>;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.picks = this.attrs.picks;
    
    // İlk yükleme
    this.loadEvents(1);
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
    const offset = (this.page - 1) * this.limit;

    app.store.find('pickem-events', {
      include: 'homeTeam,awayTeam,week',
      filter: filters,
      sort: '-matchDate',
      page: { limit: this.limit, offset: offset }
    }).then((results: any) => {
      this.events = results as PickemEvent[];
      this.totalEvents = results.payload.meta.total;
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.loading = false;
      m.redraw();
    });
  }

  async makePick(eventId: number, outcome: string) {
    const eventIdStr = String(eventId);
    const existingPick = this.picks[eventIdStr];

    this.pickLoading.add(eventId);
    m.redraw();

    try {
      if (existingPick && existingPick.selectedOutcome() === outcome) {
        await existingPick.delete();
        delete this.picks[eventIdStr];
        this.attrs.onPickChange(this.picks);
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.success.pick_deleted'));
      } else if (existingPick) {
        const updated = await existingPick.save({ selectedOutcome: outcome });
        this.picks[eventIdStr] = updated;
        this.attrs.onPickChange(this.picks);
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.success.pick_updated'));
      } else {
        const newPick = app.store.createRecord('pickem-picks', { eventId: eventId });
        const saved = await newPick.save({ selectedOutcome: outcome });
        this.picks[eventIdStr] = saved;
        this.attrs.onPickChange(this.picks);
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.success.pick_created'));
      }
    } catch (error: any) {
      console.error('Pick error:', error);
      if (error.response && error.response.errors && error.response.errors[0]) {
        app.alerts.show({ type: 'error' }, error.response.errors[0].detail);
      } else {
        app.alerts.show({ type: 'error' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.errors.pick_failed'));
      }
    } finally {
      this.pickLoading.delete(eventId);
      m.redraw();
    }
  }

  view() {
    const allSeasons = app.store.all('pickem-seasons');
    const allTeams = app.store.all('pickem-teams');

    const hasEvents = this.events.length > 0;
    const canShowPagination = this.totalEvents > this.limit;

    return (
      <div>
        {/* Filtreler */}
        <div className="EventsTab-filters PickemPage-filters">
          <div className="FilterGroup">
            <label>
              <i className="fas fa-calendar-alt" />
              <span>{app.translator.trans('huseyinfiliz-pickem.forum.filters.season')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedSeason}
              onchange={(e: any) => {
                this.selectedSeason = e.target.value;
                this.loadEvents(1);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.forum.filters.all_seasons')}</option>
              {allSeasons.map((season: Season) => (
                <option value={season.id()}>{season.name()}</option>
              ))}
            </select>
          </div>

          <div className="FilterGroup">
            <label>
              <i className="fas fa-users" />
              <span>{app.translator.trans('huseyinfiliz-pickem.forum.filters.team')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedTeam}
              onchange={(e: any) => {
                this.selectedTeam = e.target.value;
                this.loadEvents(1);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.forum.filters.all_teams')}</option>
              {allTeams.map((team: Team) => (
                <option value={team.id()}>{team.name()}</option>
              ))}
            </select>
          </div>

          <div className="FilterGroup">
            <label>
              <i className="fas fa-filter" />
              <span>{app.translator.trans('huseyinfiliz-pickem.forum.filters.status')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedStatus}
              onchange={(e: any) => {
                this.selectedStatus = e.target.value;
                this.loadEvents(1);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.forum.filters.all')}</option>
              <option value="scheduled">{app.translator.trans('huseyinfiliz-pickem.lib.status.scheduled')}</option>
              <option value="closed">{app.translator.trans('huseyinfiliz-pickem.lib.status.closed')}</option>
              <option value="finished">{app.translator.trans('huseyinfiliz-pickem.lib.status.finished')}</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {this.loading ? (
          <LoadingIndicator />
        ) : !hasEvents ? (
          <Placeholder text={app.translator.trans('huseyinfiliz-pickem.forum.matches.no_matches')} />
        ) : (
          <div className="MatchesList">
            {this.events.map((event: PickemEvent) => {
              const eventIdStr = String(event.id());
              const pick = this.picks[eventIdStr];
              const isLoading = this.pickLoading.has(Number(event.id()));

              return (
                <EventCard
                  event={event}
                  pick={pick}
                  onMakePick={(eventId, outcome) => this.makePick(eventId, outcome)}
                  isLoading={isLoading}
                />
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {canShowPagination && !this.loading && (
          <nav className="Pagination">
            <Button
              className="Button Pagination-button Pagination-previous"
              icon="fas fa-chevron-left"
              disabled={this.page === 1}
              onclick={() => {
                if (this.page > 1) this.loadEvents(this.page - 1);
              }}
            />
            <span className="Pagination-info">
              {app.translator.trans('huseyinfiliz-pickem.forum.pagination.page_info', {
                current: this.page,
                total: Math.ceil(this.totalEvents / this.limit),
              })}
            </span>
            <Button
              className="Button Pagination-button Pagination-next"
              icon="fas fa-chevron-right"
              disabled={this.page >= Math.ceil(this.totalEvents / this.limit)}
              onclick={() => {
                if (this.page < Math.ceil(this.totalEvents / this.limit)) {
                  this.loadEvents(this.page + 1);
                }
              }}
            />
          </nav>
        )}
      </div>
    );
  }
}