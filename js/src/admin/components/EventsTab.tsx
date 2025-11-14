import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder'; // EKLENDİ
import Pagination from 'flarum/common/components/Pagination'; // EKLENDİ
import EventModal from './modals/EventModal';
import ResultModal from './modals/ResultModal';
import PickemEvent from '../../common/models/Event';
import Team from '../../common/models/Team';

export default class EventsTab extends Component {
  // Filtre state'leri
  private selectedSeason: string = 'all';
  private selectedTeam: string = 'all';
  private selectedStatus: string = 'all';
  private sortOrder: string = 'desc';

  // Veri ve yükleme state'leri
  private loading: boolean = true;
  private events: PickemEvent[] = [];

  // Sayfalama (Pagination) state'leri
  private totalEvents: number = 0;
  private page: number = 1; // Flarum Pagination 1-based index kullanır
  private limit: number = 20; // Sayfa başına 20 sonuç göster

  oninit(vnode: any) {
    super.oninit(vnode);
    this.loadEvents(); // İlk yükleme
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

  // Sayfa değiştiğinde veya filtre değiştiğinde veriyi yükler
  loadEvents(page: number = 1) {
    this.loading = true;
    this.page = page; // Sayfa numarasını güncelle
    m.redraw();

    const filters = this.buildFilters();
    const sort = this.sortOrder === 'desc' ? '-matchDate' : 'matchDate';
    
    // API'nin 'page[offset]' (0-based) beklentisine göre 'offset' hesapla
    const offset = (this.page - 1) * this.limit;

    app.store.find('pickem-events', {
      include: 'homeTeam,awayTeam,week',
      filter: filters,
      sort: sort,
      page: { limit: this.limit, offset: offset } // Limit ve offset gönder
    }).then(results => {
      this.events = results as PickemEvent[];
      this.totalEvents = results.payload.meta.total; 
      this.loading = false;
      m.redraw();
    }).catch(error => {
      this.loading = false;
      console.error(error);
      m.redraw();
    });
  }

  view() {
    const allSeasons = app.store.all('pickem-seasons');
    const allTeams = app.store.all('pickem-teams');

    const total = this.totalEvents;
    const hasEvents = this.events.length > 0;
    const canShowPagination = total > this.limit;

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
            onclick={() => app.modal.show(EventModal, { event: null, onsave: () => this.loadEvents(this.page) })} // Mevcut sayfayı yenile
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
                this.loadEvents(1); // Filtre değişti, 1. sayfaya git
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
                this.loadEvents(1); // Filtre değişti, 1. sayfaya git
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
                this.loadEvents(1); // Filtre değişti, 1. sayfaya git
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
                this.loadEvents(1); // Filtre değişti, 1. sayfaya git
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
                this.loadEvents(1); // Filtreleri sıfırla, 1. sayfaya git
              }}
            >
              {app.translator.trans('huseyinfiliz-pickem.admin.filters.reset')}
            </Button>
          )}
        </div>

        {/* Sonuç Sayısı kaldırıldı, sayfalama bileşeni bunu zaten gösteriyor */}

        {this.loading ? (
          <LoadingIndicator />
        ) : !hasEvents ? (
            <Placeholder text={app.translator.trans('huseyinfiliz-pickem.admin.filters.no_matches_found')} />
        ) : (
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
              {this.events.map((event) => {
                  const homeTeam = event.homeTeam() as Team | null;
                  const awayTeam = event.awayTeam() as Team | null;

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
                      <td>{event.matchDate() ? new Date(event.matchDate()!).toLocaleString() : '-'}</td>
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
                          onclick={() => app.modal.show(EventModal, { event: event, onsave: () => this.loadEvents(this.page) })} 
                        >
                          {app.translator.trans('huseyinfiliz-pickem.admin.buttons.edit')}
                        </Button>
                        <Button
                          className="Button Button--success"
                          icon="fas fa-check"
                          onclick={() => app.modal.show(ResultModal, { event: event, onsave: () => this.loadEvents(this.page) })} 
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
                })}
            </tbody>
          </table>
        )}

        {/* SAYFALAMA BİLEŞENİ EKLENDİ */}
        {canShowPagination && (
          <Pagination
            total={total}
            limit={this.limit}
            page={this.page}
            onchange={this.loadEvents.bind(this)} // Sayfa değiştiğinde loadEvents'i çağır
          />
        )}
      </div>
    );
  }

  renderTeamLogo(team: Team | null) {
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

  deleteEvent(event: PickemEvent) {
    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.events.delete_confirmation'))) {
      return;
    }

    event.delete().then(() => {
      // Listenin son elemanını sildiysek ve 1. sayfada değilsek, bir önceki sayfayı yükle
      if (this.events.length === 1 && this.page > 1) {
        this.loadEvents(this.page - 1);
      } else {
        this.loadEvents(this.page);
      }
    });
  }
}