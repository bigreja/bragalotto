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
    const data = notification.subject();

    if (!data) {
      return app.translator.trans('huseyinfiliz-pickem.forum.notification');
    }

    const homeTeam = data.homeTeam ? data.homeTeam().name() : 'Home';
    const awayTeam = data.awayTeam ? data.awayTeam().name() : 'Away';
    const homeScore = data.homeScore ? data.homeScore() : 0;
    const awayScore = data.awayScore ? data.awayScore() : 0;

    // GÜNCELLENDİ
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