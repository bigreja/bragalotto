import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import MatchesTab from './MatchesTab';
import MyPicksTab from './MyPicksTab';
import LeaderboardTab from './LeaderboardTab';
// Gerekli modelleri import et
import Team from '../../common/models/Team';
import Season from '../../common/models/Season';
import Week from '../../common/models/Week';

export default class PickemPage extends Page {
  private activeTab: string = 'matches';
  private loading: boolean = true;
  // Events state'i MatchesTab'e taşınacak
  // private events: any[] = []; 
  private picks: Record<string, any> = {};
  private userScores: any[] = [];
  // PickLoading state'i MatchesTab'e taşınacak
  // private pickLoading: Set<number> = new Set();
  
  // Events paginasyon state'i MatchesTab'e taşınacak
  // private eventsPage: number = 0;
  // private eventsHasMore: boolean = true;
  // private eventsLoading: boolean = false;

  // Filtre verilerini tutmak için
  private filterDataLoaded: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);

    if (!app.forum.attribute('pickem.canView')) {
      m.route.set('/'); 
      return;
    }

    this.activeTab = (m.route && m.route.param && m.route.param('tab')) || 'matches';
    this.loading = true;
    this.picks = {};
    this.userScores = [];
    this.filterDataLoaded = false; // Başlangıçta filtre verisi yüklenmedi

    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      const promises = [];

      // Artık maçları (events) burada yüklemiyoruz, MatchesTab yüklenecek.
      // promises.push(this.loadEvents(true)); 

      if (app.session.user && app.forum.attribute('pickem.makePicks')) {
        promises.push(this.loadPicks());
      }
      
      promises.push(this.loadLeaderboard());
      
      // --- YENİ EKLENDİ: Filtre Verilerini Yükle ---
      promises.push(this.loadFilterData());
      // --- YENİ EKLENDİ SONU ---

      await Promise.all(promises);

    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      this.loading = false;
      this.filterDataLoaded = true; // Filtre verisi yüklendi (veya hata verdi)
      m.redraw();
    }
  }

  // loadEvents metodu artık MatchesTab içinde olacağı için buradan kaldırıldı.

  async loadPicks() {
    if (!app.session.user || !app.forum.attribute('pickem.makePicks')) return;

    try {
      const picks = (await app.store.find('pickem-picks', {
        filter: { user: app.session.user.id() },
        include: 'event,event.homeTeam,event.awayTeam',
      })) as any[];

      if (picks && Array.isArray(picks)) {
        this.picks = picks.reduce((acc: Record<string, any>, pick: any) => {
          try {
            const event = pick && (typeof pick.event === 'function' ? pick.event() : pick.event);
            if (event && typeof event.id === 'function') {
              acc[String(event.id())] = pick;
            }
          } catch (err) {
            console.warn('Invalid pick:', err);
          }
          return acc;
        }, {});
      }
    } catch (error) {
      console.error('Error loading picks:', error);
    }
  }

  async loadLeaderboard() {
    try {
      const scores = (await app.store.find('pickem-user-scores', { include: 'user' })) as any[];
      this.userScores = (scores || []).filter((s: any) => s != null);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  }

  // --- YENİ EKLENDİ: Filtre Veri Yükleme Fonksiyonu ---
  async loadFilterData() {
    try {
      await Promise.all([
        app.store.find('pickem-public-seasons'),
        app.store.find('pickem-public-teams'),
        app.store.find('pickem-public-weeks')
      ]);
    } catch (error) {
      console.error('Error loading filter data:', error);
      // Hata olsa bile sayfanın geri kalanının yüklenmesine izin ver
    }
  }
  // --- YENİ EKLENDİ SONU ---

  // makePick metodu artık MatchesTab içinde olacağı için buradan kaldırıldı.

  view() {
    return (
      <div className="PickemPage">
        <div className="container">
          <h2>
            <i className="fas fa-trophy" />
            {app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')}
          </h2>

          <div className="PickemPage-tabs">
            {this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.forum.nav.matches'))}
            
            {app.session.user && app.forum.attribute('pickem.makePicks') &&
              this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.forum.nav.my_picks'))}

            {this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.forum.nav.leaderboard'))}
          </div>

          {this.loading ? <LoadingIndicator /> : <div className="PickemPage-tab-content">{this.renderTabContent()}</div>}
        </div>
      </div>
    );
  }

  renderTab(tab: string, label: string) {
    const active = this.activeTab === tab;
    return (
      <button
        className={`Button Button--flat PickemPage-tab ${active ? 'active' : ''}`}
        onclick={() => {
          this.activeTab = tab;
          m.redraw();
        }}
      >
        {label}
      </button>
    );
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'matches':
        // MatchesTab artık filtre verilerinin yüklenmesini bekleyecek
        return this.filterDataLoaded ? (
          <MatchesTab
            picks={this.picks}
            onPickChange={(picks: Record<string, any>) => { this.picks = picks; }} // Pick state'ini güncellemek için callback
          />
        ) : <LoadingIndicator />;
      
      case 'my_picks':
        if (!app.session.user || !app.forum.attribute('pickem.makePicks')) return null;
        return <MyPicksTab picks={this.picks} />;
      
      case 'leaderboard':
        return <LeaderboardTab userScores={this.userScores} />;
      
      default:
        return null;
    }
  }
}