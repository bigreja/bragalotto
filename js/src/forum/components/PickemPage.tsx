import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import MatchesTab from './MatchesTab';
import MyPicksTab from './MyPicksTab';
import LeaderboardTab from './LeaderboardTab';
// Gerekli modelleri import et
import Team from '../../common/models/Team';
import Season from '../../common/models/Season';
import Week from '../../common/models/Week';

// --- YENİ EKLENENLER ---
// Flarum'un ana sayfa bileşenini ve link listeleme yardımcısını import et
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';
// --- YENİ EKLENENLER SONU ---

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

    this.activeTab = (m.route && m.route.param && m.route.param('tab')) || 'matches';
    this.loading = true;
    this.picks = {};
    this.userScores = [];
    this.filterDataLoaded = false; 

    this.loadInitialData();
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
        
        {/* --- YENİ HERO ALANI --- */}
        <header className="Hero PickemHero">
          <div className="container">
            <div className="containerNarrow">
              <h1 className="Hero-title">
                {/* *** DÜZELTME BURADA: "icon" sınıfı eklendi *** */}
                <i className="icon fas fa-trophy" />{' '}
                {app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')}
              </h1>
            </div>
          </div>
        </header>
        {/* --- HERO ALANI SONU --- */}
        
        <div className="container">
          <div className="sideNavContainer">
            <nav className="IndexPage-nav sideNav">
              <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
            </nav>
            <div className="IndexPage-results sideNavOffset">
              
              <div className="PickemPage-tabs">
                {this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.forum.nav.matches'))}
                
                {app.session.user && app.forum.attribute('pickem.makePicks') &&
                  this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.forum.nav.my_picks'))}

                {this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.forum.nav.leaderboard'))}
              </div>

              {this.loading ? <LoadingIndicator /> : <div className="PickemPage-tab-content">{this.renderTabContent()}</div>}
            </div>
          </div>
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
        return this.filterDataLoaded ? (
          <MatchesTab
            picks={this.picks}
            onPickChange={(picks: Record<string, any>) => { this.picks = picks; }} 
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