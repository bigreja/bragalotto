import Extend from 'flarum/common/extenders';
import Model from 'flarum/common/Model';

// Import models
import Team from './models/Team';
import Season from './models/Season';
import Week from './models/Week';
import PickemEvent from './models/Event';
import Pick from './models/Pick';
import UserScore from './models/UserScore';

export default [
  // Register Team model
  new Extend.Store()
    .add('pickem-teams', Team),
  
  new Extend.Model(Team)
    .attribute('name')
    .attribute('slug')
    .attribute('logoPath')
    .attribute('logoUrl'),

  // Register Season model
  new Extend.Store()
    .add('pickem-seasons', Season),
  
  new Extend.Model(Season)
    .attribute('name')
    .attribute('slug')
    .attribute('startDate', Model.transformDate)
    .attribute('endDate', Model.transformDate),

  // Register Week model
  new Extend.Store()
    .add('pickem-weeks', Week),
  
  new Extend.Model(Week)
    .attribute('name')
    .attribute('seasonId')
    .attribute('weekNumber')
    .hasOne('season'),

  // Register Event model
  new Extend.Store()
    .add('pickem-events', PickemEvent),
  
  new Extend.Model(PickemEvent)
    .attribute('weekId')
    .attribute('homeTeamId')
    .attribute('awayTeamId')
    .attribute('matchDate', Model.transformDate)
    .attribute('cutoffDate', Model.transformDate)
    .attribute('allowDraw')
    .attribute('status')
    .attribute('homeScore')
    .attribute('awayScore')
    .attribute('result')
    .attribute('canPick')
    .hasOne('week')
    .hasOne('homeTeam')
    .hasOne('awayTeam'),

  // Register Pick model
  new Extend.Store()
    .add('pickem-picks', Pick),
  
  new Extend.Model(Pick)
    .attribute('userId')
    .attribute('eventId')
    .attribute('selectedOutcome')
    .attribute('isCorrect')
    .hasOne('event')
    .hasOne('user'),

  // Register UserScore model
  new Extend.Store()
    .add('pickem-user-scores', UserScore),
  
  new Extend.Model(UserScore)
    .attribute('userId')
    .attribute('seasonId')
    .attribute('totalPoints')
    .attribute('totalPicks')
    .attribute('correctPicks')
    .attribute('accuracy')
    .hasOne('user')
    .hasOne('season'),
];