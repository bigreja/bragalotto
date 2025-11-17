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

    // GÜNCELLENDİ: Hardcoded stringler yerine çeviri anahtarları
    const homeTeam = data.homeTeam ? data.homeTeam().name() : app.translator.trans('huseyinfiliz-pickem.lib.common.home');
    const awayTeam = data.awayTeam ? data.awayTeam().name() : app.translator.trans('huseyinfiliz-pickem.lib.common.away');
    const homeScore = data.homeScore ? data.homeScore() : 0;
    const awayScore = data.awayScore ? data.awayScore() : 0;

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