import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import LinkButton from 'flarum/common/components/LinkButton';
import commonExtenders from '../common/extend';
import PickemPage from './components/PickemPage';
import EventResultNotification from './components/EventResultNotification';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import WeekStartingNotification from './components/WeekStartingNotification';

app.initializers.add('bigreja/bragalotto', () => {
  commonExtenders.forEach((extender) => extender.extend(app));

  app.routes.bragalotto = { path: '/bragalotto', component: PickemPage };

  extend(IndexSidebar.prototype, 'navItems', function (items) {
    if (app.forum.attribute('bragalotto.canView')) {
      items.add(
        'bragalotto',
        LinkButton.component(
          {
            href: app.route('bragalotto'),
            icon: 'fas fa-trophy',
          },
          app.translator.trans('bigreja-bragalotto.lib.nav.pickem')
        ),
        85
      );
    }
  });

  if ('acpl-mobile-tab' in flarum.extensions) {
    const MobileTabItemsRegistry = (flarum.extensions['acpl-mobile-tab'] as any)?.common?.MobileTabItemsRegistry;
    if (MobileTabItemsRegistry) {
      extend(MobileTabItemsRegistry.prototype, 'items', (items: any) => {
        items.add('bragalotto', {
          icon: 'fas fa-trophy',
          label: app.translator.trans('bigreja-bragalotto.lib.nav.pickem'),
          href: () => app.route('bragalotto'),
          canView: () => Boolean(app.forum.attribute('bragalotto.canView')),
          source: 'extension',
        });
      });
    }
  }

  app.notificationComponents.bragalotto_event_result = EventResultNotification;
  app.notificationComponents.bragalotto_week_starting = WeekStartingNotification;

  extend(NotificationGrid.prototype, 'notificationTypes', function (items) {
    items.add('bragalotto_week_starting', {
      name: 'bragalotto_week_starting',
      icon: 'fas fa-bell',
      label: app.translator.trans('bigreja-bragalotto.forum.week_starting_preference'),
    });
  });
});
