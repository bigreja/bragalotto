import app from 'flarum/admin/app';

// Import extenders
import extenders from './extend';

// Import components
import PickemPage from './components/PickemPage';

app.initializers.add('huseyinfiliz/pickem', () => {
  // Apply extenders (model registration)
  extenders.forEach(extender => extender.extend(app));

  // Register extension page and permissions
  app.extensionData
    .for('huseyinfiliz-pickem')
    .registerPage(PickemPage)
    .registerPermission({
      icon: 'fas fa-trophy',
      label: app.translator.trans('huseyinfiliz-pickem.admin.permissions.manage'),
      permission: 'pickem.manage'
    }, 'moderate')
    .registerPermission({
      icon: 'fas fa-check-circle',
      label: app.translator.trans('huseyinfiliz-pickem.admin.permissions.make_picks'),
      permission: 'pickem.makePicks'
    }, 'start')
    .registerPermission({
      icon: 'fas fa-chart-line',
      label: app.translator.trans('huseyinfiliz-pickem.admin.permissions.view_leaderboard'),
      permission: 'pickem.viewLeaderboard'
    }, 'view');
});