import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import Placeholder from 'flarum/common/components/Placeholder';
import EventCard from './EventCard';
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
  private hasMore: boolean = false;
  private limit: number = 10;
  private pickLoading: Set<number> = new Set();
  // DÜZELTME: Yerel 'picks' değişkenini kaldırdık, doğrudan attrs kullanacağız.

  oninit(vnode: any) {
    super.oninit(vnode);
    // this.picks = this.attrs.picks; // BU SATIR HATALIYDI (Referans kopuyordu)
    this.loadEvents(true);
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

  loadEvents(clear: boolean = false) {
    this.loading = true;
    m.redraw();

    const offset = clear ? 0 : this.events.length;
    const filters = this.buildFilters();

    app.store.find('pickem-events', {
      include: 'homeTeam,awayTeam,week',
      filter: filters,
      sort: '-matchDate',
      page: { limit: this.limit, offset: offset }
    }).then((results: any) => {
      const newEvents = results as PickemEvent[];
      
      if (clear) {
        this.events = newEvents;
      } else {
        this.events = [...this.events, ...newEvents];
      }
      
      this.hasMore = newEvents.length >= this.limit;
      
      this.fetchPicksForEvents(newEvents);

    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.loading = false;
      m.redraw();
    });
  }
  
  fetchPicksForEvents(events: PickemEvent[]) {
    if (!app.session.user || !app.forum.attribute('pickem.makePicks')) return;
    
    // DÜZELTME: this.attrs.picks kullanıyoruz
    const currentPicks = this.attrs.picks || {};
    
    const eventsToFetch = events.filter(e => !currentPicks[String(e.id())]);
    if (eventsToFetch.length === 0) return;

    const eventIds = eventsToFetch.map(e => e.id()).join(',');

    app.store.find('pickem-picks', {
      filter: { user: app.session.user.id(), event: eventIds }
    }).then((results: any) => {
        if (Array.isArray(results) && results.length > 0) {
            const newPicks = results.reduce((acc: any, pick: any) => {
                 const eId = pick.event() ? pick.event().id() : pick.attribute('eventId');
                 if(eId) acc[String(eId)] = pick;
                 return acc;
            }, {});
            
            // Ana sayfadaki state'i güncelle (Mevcut attrs ile birleştir)
            const merged = { ...this.attrs.picks, ...newPicks };
            this.attrs.onPickChange(merged);
            m.redraw();
        }
    });
  }

  async makePick(eventId: number, outcome: string) {
    const eventIdStr = String(eventId);
    // DÜZELTME: this.attrs.picks kullanıyoruz
    const existingPick = this.attrs.picks[eventIdStr];

    this.pickLoading.add(eventId);
    m.redraw();

    try {
      // Helper fonksiyon: PickemPage'e güncel veriyi gönder
      const updateParent = (newPickVal: any) => {
        const newPicks = { ...this.attrs.picks };
        if (newPickVal === null) {
            delete newPicks[eventIdStr];
        } else {
            newPicks[eventIdStr] = newPickVal;
        }
        this.attrs.onPickChange(newPicks);
      };

      if (existingPick && existingPick.selectedOutcome() === outcome) {
        await existingPick.delete();
        updateParent(null); // Silindi
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.messages.deleted'));
      } else if (existingPick) {
        const updated = await existingPick.save({ selectedOutcome: outcome });
        updateParent(updated); // Güncellendi
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.messages.saved'));
      } else {
        const newPick = app.store.createRecord('pickem-picks');
        const saved = await newPick.save({ 
          eventId: eventId,
          selectedOutcome: outcome 
        });
        updateParent(saved); // Yeni oluşturuldu
        app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.messages.saved'));
      }
    } catch (error: any) {
      console.error('Pick error:', error);
      if (error.response && error.response.errors && error.response.errors[0]) {
        app.alerts.show({ type: 'error' }, error.response.errors[0].detail);
      } else {
        app.alerts.show({ type: 'error' }, app.translator.trans('huseyinfiliz-pickem.lib.messages.invalid_outcome'));
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
    
    // DÜZELTME: this.attrs.picks kullanıyoruz
    const currentPicks = this.attrs.picks || {};

    return (
      <div>
        <div className="EventsTab-filters PickemPage-filters">
          <div className="FilterGroup">
            <label>
              <i className="fas fa-calendar-alt" />
              <span>{app.translator.trans('huseyinfiliz-pickem.lib.common.season')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedSeason}
              onchange={(e: any) => {
                this.selectedSeason = e.target.value;
                this.loadEvents(true);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.lib.filters.all')}</option>
              {allSeasons.map((season: Season) => (
                <option value={season.id()}>{season.name()}</option>
              ))}
            </select>
          </div>

          <div className="FilterGroup">
            <label>
              <i className="fas fa-users" />
              <span>{app.translator.trans('huseyinfiliz-pickem.lib.common.team')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedTeam}
              onchange={(e: any) => {
                this.selectedTeam = e.target.value;
                this.loadEvents(true);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.lib.filters.all')}</option>
              {allTeams.map((team: Team) => (
                <option value={team.id()}>{team.name()}</option>
              ))}
            </select>
          </div>

          <div className="FilterGroup">
            <label>
              <i className="fas fa-filter" />
              <span>{app.translator.trans('huseyinfiliz-pickem.lib.common.status')}</span>
            </label>
            <select
              className="FormControl"
              value={this.selectedStatus}
              onchange={(e: any) => {
                this.selectedStatus = e.target.value;
                this.loadEvents(true);
              }}
            >
              <option value="all">{app.translator.trans('huseyinfiliz-pickem.lib.filters.all')}</option>
              <option value="scheduled">{app.translator.trans('huseyinfiliz-pickem.lib.status.scheduled')}</option>
              <option value="closed">{app.translator.trans('huseyinfiliz-pickem.lib.status.closed')}</option>
              <option value="finished">{app.translator.trans('huseyinfiliz-pickem.lib.status.finished')}</option>
            </select>
          </div>
        </div>

        {!hasEvents && !this.loading ? (
          <Placeholder text={app.translator.trans('huseyinfiliz-pickem.lib.messages.no_matches')} />
        ) : (
          <div className="MatchesList">
            {this.events.map((event: PickemEvent) => {
              const eventIdStr = String(event.id());
              // DÜZELTME: Attrs'dan gelen güncel pick verisini kullan
              const pick = currentPicks[eventIdStr];
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

        {this.hasMore && (
          <div className="LoadMore">
             <Button
              className="Button Button--primary"
              loading={this.loading}
              onclick={() => this.loadEvents(false)}
            >
              {app.translator.trans('huseyinfiliz-pickem.lib.buttons.load_more')}
            </Button>
          </div>
        )}
      </div>
    );
  }
}