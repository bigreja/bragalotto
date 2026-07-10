import Model from 'flarum/common/Model';
import Season from './Season';
import Competition from './Competition';

export default class Week extends Model {
  name = Model.attribute<string>('name');
  seasonId = Model.attribute<string | number | null>('seasonId');
  competitionId = Model.attribute<string | number | null>('competitionId');
  weekNumber = Model.attribute<number | null>('weekNumber');
  season = Model.hasOne<Season | false>('season');
  competition = Model.hasOne<Competition | false>('competition');
}