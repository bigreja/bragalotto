import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import TeamsTab from './TeamsTab';
import SeasonsTab from './SeasonsTab';
import WeeksTab from './WeeksTab';
import EventsTab from './EventsTab';

export default class PickemPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.currentTab = 'teams';
    this.loadData();
  }

  async loadData() {
    try {
      await Promise.all([
        app.store.find('pickem-teams'),
        app.store.find('pickem-seasons'),
        app.store.find('pickem-weeks'),
        app.store.find('pickem-events'),
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      this.loading = false;
      m.redraw();
    }
  }

  content() {
    if (this.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="PickemPage">
        <div className="container">
          <h2>{app.translator.trans('huseyinfiliz-pickem.admin.title')}</h2>

          <div className="PickemPage-tabs">
            <Button
              className={this.currentTab === 'teams' ? 'Button Button--primary' : 'Button'}
              onclick={() => { this.currentTab = 'teams'; }}
            >
              {app.translator.trans('huseyinfiliz-pickem.admin.tabs.teams')}
            </Button>
            <Button
              className={this.currentTab === 'seasons' ? 'Button Button--primary' : 'Button'}
              onclick={() => { this.currentTab = 'seasons'; }}
            >
              {app.translator.trans('huseyinfiliz-pickem.admin.tabs.seasons')}
            </Button>
            <Button
              className={this.currentTab === 'weeks' ? 'Button Button--primary' : 'Button'}
              onclick={() => { this.currentTab = 'weeks'; }}
            >
              {app.translator.trans('huseyinfiliz-pickem.admin.tabs.weeks')}
            </Button>
            <Button
              className={this.currentTab === 'events' ? 'Button Button--primary' : 'Button'}
              onclick={() => { this.currentTab = 'events'; }}
            >
              {app.translator.trans('huseyinfiliz-pickem.admin.tabs.events')}
            </Button>
          </div>

          <div className="PickemPage-content">
            {this.renderTab()}
          </div>
        </div>
      </div>
    );
  }

  renderTab() {
    switch (this.currentTab) {
      case 'teams':
        return <TeamsTab />;
      case 'seasons':
        return <SeasonsTab />;
      case 'weeks':
        return <WeeksTab />;
      case 'events':
        return <EventsTab />;
      default:
        return null;
    }
  }
}
