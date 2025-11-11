import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Model from 'flarum/common/Model';
import LinkButton from 'flarum/common/components/LinkButton';
import IndexPage from 'flarum/forum/components/IndexPage';
import PickemPage from './components/PickemPage';

app.initializers.add('huseyinfiliz/pickem', () => {
  // Register models with attributes - Flarum 1.8 standard
  app.store.models['pickem-teams'] = class extends Model {};
  app.store.models['pickem-teams'].prototype.name = Model.attribute('name');
  app.store.models['pickem-teams'].prototype.slug = Model.attribute('slug');
  app.store.models['pickem-teams'].prototype.logoPath = Model.attribute('logoPath');
  app.store.models['pickem-teams'].prototype.logoUrl = Model.attribute('logoUrl');

  app.store.models['pickem-seasons'] = class extends Model {};
  app.store.models['pickem-seasons'].prototype.name = Model.attribute('name');
  app.store.models['pickem-seasons'].prototype.slug = Model.attribute('slug');
  app.store.models['pickem-seasons'].prototype.startDate = Model.attribute('startDate', Model.transformDate);
  app.store.models['pickem-seasons'].prototype.endDate = Model.attribute('endDate', Model.transformDate);

  app.store.models['pickem-weeks'] = class extends Model {};
  app.store.models['pickem-weeks'].prototype.name = Model.attribute('name');
  app.store.models['pickem-weeks'].prototype.seasonId = Model.attribute('seasonId');
  app.store.models['pickem-weeks'].prototype.weekNumber = Model.attribute('weekNumber');
  app.store.models['pickem-weeks'].prototype.season = Model.hasOne('season');

  app.store.models['pickem-events'] = class extends Model {};
  app.store.models['pickem-events'].prototype.weekId = Model.attribute('weekId');
  app.store.models['pickem-events'].prototype.homeTeamId = Model.attribute('homeTeamId');
  app.store.models['pickem-events'].prototype.awayTeamId = Model.attribute('awayTeamId');
  app.store.models['pickem-events'].prototype.matchDate = Model.attribute('matchDate', Model.transformDate);
  app.store.models['pickem-events'].prototype.cutoffDate = Model.attribute('cutoffDate', Model.transformDate);
  app.store.models['pickem-events'].prototype.allowDraw = Model.attribute('allowDraw');
  app.store.models['pickem-events'].prototype.status = Model.attribute('status');
  app.store.models['pickem-events'].prototype.homeScore = Model.attribute('homeScore');
  app.store.models['pickem-events'].prototype.awayScore = Model.attribute('awayScore');
  app.store.models['pickem-events'].prototype.result = Model.attribute('result');
  app.store.models['pickem-events'].prototype.canPick = Model.attribute('canPick');
  app.store.models['pickem-events'].prototype.week = Model.hasOne('week');
  app.store.models['pickem-events'].prototype.homeTeam = Model.hasOne('homeTeam');
  app.store.models['pickem-events'].prototype.awayTeam = Model.hasOne('awayTeam');

  app.store.models['pickem-picks'] = class extends Model {};
  app.store.models['pickem-picks'].prototype.userId = Model.attribute('userId');
  app.store.models['pickem-picks'].prototype.eventId = Model.attribute('eventId');
  app.store.models['pickem-picks'].prototype.selectedOutcome = Model.attribute('selectedOutcome');
  app.store.models['pickem-picks'].prototype.isCorrect = Model.attribute('isCorrect');
  app.store.models['pickem-picks'].prototype.event = Model.hasOne('event');
  app.store.models['pickem-picks'].prototype.user = Model.hasOne('user');

  app.store.models['pickem-user-scores'] = class extends Model {};
  app.store.models['pickem-user-scores'].prototype.userId = Model.attribute('userId');
  app.store.models['pickem-user-scores'].prototype.seasonId = Model.attribute('seasonId');
  app.store.models['pickem-user-scores'].prototype.totalPoints = Model.attribute('totalPoints');
  app.store.models['pickem-user-scores'].prototype.totalPicks = Model.attribute('totalPicks');
  app.store.models['pickem-user-scores'].prototype.correctPicks = Model.attribute('correctPicks');
  app.store.models['pickem-user-scores'].prototype.user = Model.hasOne('user');
  app.store.models['pickem-user-scores'].prototype.season = Model.hasOne('season');

  // Register single route for Pick'em page with tabs
  app.routes.pickem = { path: '/pickem', component: PickemPage };

  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'pickem',
      LinkButton.component(
        {
          href: app.route('pickem'),
          icon: 'fas fa-trophy',
        },
        "Pick'em"
      ),
      85
    );
  });
});
