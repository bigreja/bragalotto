import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import extractText from 'flarum/common/utils/extractText';
import MatchesTab from './MatchesTab';
import MyPicksTab from './MyPicksTab';
import LeaderboardTab from './LeaderboardTab';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';

/**
 * ✅ FLARUM STANDARD PATTERN:
 * - Tüm tab'ler başta oluşturulur (tek seferde render)
 * - URL routing YOK (pure state management)
 * - CSS display: none/block ile toggle
 * - Component lifecycle KORUNUR
 * - NO gereksiz API çağrısı
 */
export default class PickemPage extends Page {
  private activeTab: string = 'matches';
  private loading: boolean = true;
  private picks: Record<string, any> = {};
  private userScores: any[] = [];
  private filterDataLoaded: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);

    if (!app.forum.attribute('pickem.canView')) {
      m.route.set('/'); 
      return;
    }

    // ✅ URL routing YOK - Her zaman 'matches' ile başla
    this.activeTab = 'matches';
    
    this.loading = true;
    this.picks = {};
    this.userScores = [];
    this.filterDataLoaded = false; 

    this.loadInitialData();
  }

  oncreate(vnode: any) {
    super.oncreate(vnode);
    app.setTitle(extractText(app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')));
  }

  async loadInitialData() {
    try {
      const promises = [];

      if (app.session.user && app.forum.attribute('pickem.makePicks')) {
        promises.push(this.loadPicks());
      }
      
      promises.push(this.loadLeaderboard());
      promises.push(this.loadFilterData());

      await Promise.all(promises);

    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      this.loading = false;
      this.filterDataLoaded = true; 
      m.redraw();
    }
  }

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

  async loadFilterData() {
    try {
      await Promise.all([
        app.store.find('pickem-public-seasons'),
        app.store.find('pickem-public-teams'),
        app.store.find('pickem-public-weeks')
      ]);
    } catch (error) {
      console.error('Error loading filter data:', error);
    }
  }

  view() {
    return (
      <div className="IndexPage PickemPage"> 
        
        <header className="Hero PickemHero">
          <div className="container">
            <div className="containerNarrow">
              <h1 className="Hero-title">
                <i className="icon fas fa-trophy" />{' '}
                {app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')}
              </h1>
            </div>
          </div>
        </header>
        
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">
              
              {/* ✅ Tab Navigation - Basit button'lar, URL routing yok */}
              <div className="PickemPage-tabs">
                {this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.forum.nav.matches'))}
                
                {app.session.user && app.forum.attribute('pickem.makePicks') &&
                  this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.forum.nav.my_picks'))}

                {this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.forum.nav.leaderboard'))}
              </div>

              {/* ✅ Tab Content - TÜM TAB'LER TEK SEFERDE RENDER EDİLİR */}
              {this.loading ? (
                <LoadingIndicator />
              ) : (
                <div className="PickemPage-tabContent">
                  {this.renderAllTabs()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * ✅ FLARUM PATTERN: Basit onclick handler
   * - Sadece state değişimi
   * - NO URL routing
   * - NO m.redraw() (Mithril otomatik handle eder)
   */
  renderTab(tabId: string, label: string) {
    const active = this.activeTab === tabId;
    
    return (
      <button
        className={`Button Button--flat PickemPage-tab ${active ? 'active' : ''}`}
        onclick={() => {
          this.activeTab = tabId;
          // ✅ Sadece state değişimi - başka hiçbir şey
        }}
      >
        {label}
      </button>
    );
  }

  /**
   * ✅ CORE PATTERN: Tüm tab'leri tek seferde render et
   * - Her tab bir .PickemPage-tabPane içinde
   * - CSS ile display: none/block toggle
   * - Component'ler DOM'da kalır, unmount olmazlar
   * - State, filters, pagination HER ŞEY KORUNUR
   */
  renderAllTabs() {
    return (
      <>
        {/* ==================== MATCHES TAB ==================== */}
        <div 
          className={`PickemPage-tabPane ${this.activeTab === 'matches' ? 'active' : ''}`}
          data-tab="matches"
        >
          {this.filterDataLoaded && (
            <MatchesTab
              picks={this.picks}
              onPickChange={(picks: Record<string, any>) => { 
                this.picks = picks; 
              }}
            />
          )}
        </div>
        
        {/* ==================== MY PICKS TAB ==================== */}
        {app.session.user && app.forum.attribute('pickem.makePicks') && (
          <div 
            className={`PickemPage-tabPane ${this.activeTab === 'my_picks' ? 'active' : ''}`}
            data-tab="my_picks"
          >
            <MyPicksTab picks={this.picks} />
          </div>
        )}
        
        {/* ==================== LEADERBOARD TAB ==================== */}
        <div 
          className={`PickemPage-tabPane ${this.activeTab === 'leaderboard' ? 'active' : ''}`}
          data-tab="leaderboard"
        >
          <LeaderboardTab userScores={this.userScores} />
        </div>
      </>
    );
  }
}