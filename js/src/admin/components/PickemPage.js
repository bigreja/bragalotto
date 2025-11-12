import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import TeamsTab from './TeamsTab';
import SeasonsTab from './SeasonsTab';
import WeeksTab from './WeeksTab';
import EventsTab from './EventsTab';

export default class PickemPage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.activeTab = 'teams';
  }

  content() {
    return (
      <div className="PickemPage">
        <div className="container">
          <h2>{app.translator.trans('huseyinfiliz-pickem.admin.title')}</h2>
          
          <div className="PickemPage-tabs">
            {this.renderTab('teams', app.translator.trans('huseyinfiliz-pickem.admin.nav.teams'))}
            {this.renderTab('seasons', app.translator.trans('huseyinfiliz-pickem.admin.nav.seasons'))}
            {this.renderTab('weeks', app.translator.trans('huseyinfiliz-pickem.admin.nav.weeks'))}
            {this.renderTab('events', app.translator.trans('huseyinfiliz-pickem.admin.nav.events'))}
          </div>

          <div className="PickemPage-content">
            {this.renderTabContent()}
          </div>
        </div>
      </div>
    );
  }

  renderTab(key, label) {
    return (
      <button
        className={'Button Button--' + (this.activeTab === key ? 'primary' : 'flat')}
        onclick={() => {
          this.activeTab = key;
        }}
      >
        {label}
      </button>
    );
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'teams':
        return <TeamsTab />;
      case 'seasons':
        return <SeasonsTab />;
      case 'weeks':
        return <WeeksTab />;
      case 'events':
        return <EventsTab />;
    }
  }
}