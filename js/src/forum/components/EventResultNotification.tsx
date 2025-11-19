import Notification from 'flarum/forum/components/Notification';

export default class EventResultNotification extends Notification {
  icon() {
    return 'fas fa-trophy';
  }

  href() {
    return app.route('pickem');
  }

  content() {
    const notification = this.attrs.notification;
    // Model yerine doğrudan bildirimin içeriğindeki veriyi kullanıyoruz
    const content = notification.content() || {};

    const homeTeam = content.homeTeam || app.translator.trans('huseyinfiliz-pickem.lib.common.home');
    const awayTeam = content.awayTeam || app.translator.trans('huseyinfiliz-pickem.lib.common.away');
    
    const homeScore = content.homeScore !== undefined ? content.homeScore : 0;
    const awayScore = content.awayScore !== undefined ? content.awayScore : 0;

    return app.translator.trans('huseyinfiliz-pickem.forum.notification', {
      home: homeTeam,
      hScore: homeScore,
      aScore: awayScore,
      away: awayTeam,
    });
  }

  excerpt() {
    return null;
  }
}