import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import TeamsTab from './TeamsTab';
import SeasonsTab from './SeasonsTab';
import WeeksTab from './WeeksTab';
import EventsTab from './EventsTab';
import SettingsTab from './SettingsTab'; // YENİ: SettingsTab'ı import et

export default class PickemPage extends ExtensionPage {
  private activeTab: string = 'events';
  private loading: boolean = true;

  oninit(vnode: any) {
    super.oninit(vnode);
    
    const urlTab = m.route.param('tab');
    // YENİ: 'settings' sekmesini geçerli tab'lara ekle
    if (urlTab && ['events', 'teams', 'seasons', 'weeks', 'settings'].includes(urlTab)) {
      this.activeTab = urlTab;
    }
    
    this.loadData();
  }

  async loadData() {
    try {
      await Promise.all([
        app.store.find('pickem-teams'),
        app.store.find('pickem-seasons'),
        app.store.find('pickem-weeks', { include: 'season' }),
        app.store.find('pickem-events', { include: 'homeTeam,awayTeam,week' })
      ]);
    } catch (error) {
      console.error('Pickem admin data load error:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  content() {
    return (
      <div className="PickemPage">
        <div className="container">
          <div className="PickemPage-tabs">
            {this.renderTab('events', 'fas fa-futbol', app.translator.trans('huseyinfiliz-pickem.admin.nav.events'))}
            {this.renderTab('teams', 'fas fa-users', app.translator.trans('huseyinfiliz-pickem.admin.nav.teams'))}
            {this.renderTab('seasons', 'fas fa-calendar-alt', app.translator.trans('huseyinfiliz-pickem.admin.nav.seasons'))}
            {this.renderTab('weeks', 'fas fa-calendar-week', app.translator.trans('huseyinfiliz-pickem.admin.nav.weeks'))}
            {/* YENİ: Settings sekme butonu eklendi */}
            {this.renderTab('settings', 'fas fa-cogs', app.translator.trans('huseyinfiliz-pickem.admin.nav.settings'))}
          </div>

          <div className="PickemPage-content">
            {this.loading ? (
              <div className="LoadingState">
                <LoadingIndicator />
                <p>Loading data...</p>
              </div>
            ) : (
              this.renderTabContent()
            )}
          </div>
        </div>
      </div>
    );
  }

  renderTab(key: string, icon: string, label: string) {
    const isActive = this.activeTab === key;
    return (
      <button
        className={`Button ${isActive ? 'Button--primary' : ''}`}
        onclick={() => {
          this.activeTab = key;
          // URL'i tamamen yeniden set et (biriktirme olmadan)
          const currentRoute = m.route.get().split('?')[0];
          m.route.set(currentRoute, { tab: key }, { replace: true });
        }}
      >
        <i className={icon} /> <span>{label}</span>
      </button>
    );
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'events':
        return <EventsTab />;
      case 'teams':
        return <TeamsTab />;
      case 'seasons':
        return <SeasonsTab />;
      case 'weeks':
        return <WeeksTab />;
      // YENİ: 'settings' durumu için SettingsTab bileşenini döndür
      case 'settings':
        return <SettingsTab />;
      default:
        return <EventsTab />;
    }
  }
}