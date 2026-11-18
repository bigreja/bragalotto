import app from 'flarum/forum/app';
import Notification from 'flarum/forum/components/Notification';

export default class WeekStartingNotification extends Notification {
  icon() {
    return 'fas fa-bell';
  }

  href() {
    return app.route('bragalotto');
  }

  content() {
    const content = this.attrs.notification.content() || {};

    return app.translator.trans('bigreja-bragalotto.forum.week_starting_notification', {
      week: content.weekName || '',
    });
  }

  excerpt() {
    return null;
  }
}
