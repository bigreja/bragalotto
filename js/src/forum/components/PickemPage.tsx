import Page from 'flarum/common/components/Page';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import extractText from 'flarum/common/utils/extractText';
import MatchesTab from './MatchesTab';
import MyPicksTab from './MyPicksTab';
import LeaderboardTab from './LeaderboardTab';
import IndexPage from 'flarum/forum/components/IndexPage';
import listItems from 'flarum/common/helpers/listItems';

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

    this.activeTab = 'matches';
    this.loading = true;
    this.picks = {};
    this.userScores = [];
    this.filterDataLoaded = false; 

    this.loadInitialData();
  }

  oncreate(vnode: any) {
    super.oncreate(vnode);
    // GÜNCELLENDİ
    app.setTitle(extractText(app.translator.trans('huseyinfiliz-pickem.lib.nav.pickem')));
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
                {/* GÜNCELLENDİ */}
                {app.translator.trans('huseyinfiliz-pickem.lib.nav.pickem')}
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
              
              <div className="PickemPage-tabs">
                {/* GÜNCELLENDİ */}
                {this.renderTab('matches', app.translator.trans('huseyinfiliz-pickem.lib.nav.matches'))}
                
                {app.session.user && app.forum.attribute('pickem.makePicks') &&
                  this.renderTab('my_picks', app.translator.trans('huseyinfiliz-pickem.lib.nav.my_picks'))}

                {this.renderTab('leaderboard', app.translator.trans('huseyinfiliz-pickem.lib.nav.leaderboard'))}
              </div>

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

  renderTab(tabId: string, label: string) {
    const active = this.activeTab === tabId;
    
    return (
      <button
        className={`Button Button--flat PickemPage-tab ${active ? 'active' : ''}`}
        onclick={() => {
          this.activeTab = tabId;
        }}
      >
        {label}
      </button>
    );
  }

  renderAllTabs() {
    return (
      <>
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
        
        {app.session.user && app.forum.attribute('pickem.makePicks') && (
          <div 
            className={`PickemPage-tabPane ${this.activeTab === 'my_picks' ? 'active' : ''}`}
            data-tab="my_picks"
          >
            <MyPicksTab picks={this.picks} />
          </div>
        )}
        
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