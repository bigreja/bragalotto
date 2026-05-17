import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import commonExtenders from '../common/extend';
import bragalottoPage from './components/bragalottoPage';
import EventResultNotification from './components/EventResultNotification';

app.initializers.add('bigreja/bragalotto', () => {
  commonExtenders.forEach((extender) => extender.extend(app));

  app.routes.bragalotto = { path: '/bragalotto', component: bragalottoPage };

  extend(IndexPage.prototype, 'navItems', function (items) {
    if (app.forum.attribute('bragalotto.canView')) {
      items.add(
        'bragalotto',
        LinkButton.component(
          {
            href: app.route('bragalotto'),
            icon: 'fas fa-trophy',
          },
          app.translator.trans('bigreja-bragalotto.lib.nav.bragalotto')
        ),
        85
      );
    }
  });

  app.notificationComponents.bragalotto_event_result = EventResultNotification;
});