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

  private loading: boolean = true;
  private events: PickemEvent[] = [];
  
  private totalEvents: number = 0;
  private page: number = 1; 
  private limit: number = 10; 

  private pickLoading: Set<number> = new Set();
  
  private picks: Record<string, any>;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.picks = this.attrs.picks;
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
    const sort = '-matchDate'; 
    
    const offset = (this.page - 1) * this.limit;

    app.store.find('pickem-events', {
      include: 'homeTeam,awayTeam,week',
      filter: filters,
      sort: sort,
      page: { limit: this.limit, offset: offset }
    }).then(results => {
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
    const idStr = String(eventId);
    const existingPick = this.picks[idStr] as Pick | undefined;

    this.pickLoading.add(eventId);
    m.redraw();

    try {
      if (existingPick && existingPick.selectedOutcome() === outcome) {
        // İPTAL ETME (DELETE)
        await existingPick.delete();
        
        delete this.picks[idStr];
        this.attrs.onPickChange(this.picks); 
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.success.pick_deleted'));
      
      } else if (existingPick) {
        // GÜNCELLEME (PATCH)
        const pick = await existingPick.save({
          selectedOutcome: outcome,
        });

        this.picks[idStr] = pick as any;
        this.attrs.onPickChange(this.picks); 
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.success.pick_updated'));

      } else {
        // YENİ OLUŞTURMA (POST)
        const pick = await app.store.createRecord('pickem-picks').save({
          eventId: eventId,
          selectedOutcome: outcome,
        });
        
        this.picks[idStr] = pick as any;
        this.attrs.onPickChange(this.picks); 
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.success.pick_created'));
      }

    } catch (error: any) {
      console.error('Error making/deleting pick:', error);
      if (error && error.alert) {
          app.alerts.show(error.alert);
      } else {
          app.alerts.show({ type: 'error' }, app.translator.trans('huseyinfiliz-pickem.lib.validation.errors.unauthorized'));
      }
    } finally {
      this.pickLoading.delete(eventId);
      m.redraw();
    }
  }

  view() {
    const allSeasons = app.store.all('pickem-seasons') as Season[];
    const allTeams = app.store.all('pickem-teams') as Team[];

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
              <option value="scheduled">{app.translator.trans('huseyinfiliz-pickem.admin.events.status_scheduled')}</option>
              <option value="closed">{app.translator.trans('huseyinfiliz-pickem.admin.events.status_closed')}</option>
              <option value="finished">{app.translator.trans('huseyinfiliz-pickem.admin.events.status_finished')}</option>
            </select>
          </div>
        </div>

        {/* Maçlar Listesi */}
        {this.loading ? (
          <LoadingIndicator />
        ) : !hasEvents ? (
          <Placeholder text={app.translator.trans('huseyinfiliz-pickem.forum.matches.no_matches')} />
        ) : (
          <div className="MatchesList">
            {this.events.map((event) => {
              const idStr = String(event.id());
              const pick = this.picks[idStr];
              const isLoading = this.pickLoading.has(Number(event.id()));

              return <EventCard event={event} pick={pick} onMakePick={(id, out) => this.makePick(id, out)} isLoading={isLoading} />;
            })}
          </div>
        )}

        {/* Sayfalama */}
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
              {app.translator.trans('huseyinfiliz-pickem.forum.pagination.page_info', {
                current: this.page,
                total: Math.ceil(this.totalEvents / this.limit)
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