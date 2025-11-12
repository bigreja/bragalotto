import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import NotificationGrid from 'flarum/forum/components/NotificationGrid';
import commonExtenders from '../common/extend';
import PickemPage from './components/PickemPage';
import EventResultNotification from './components/EventResultNotification';

app.initializers.add('huseyinfiliz/pickem', () => {
  // Model'leri kaydet
  commonExtenders.forEach((extender) => extender.extend(app));

  // Route kaydet
  app.routes.pickem = { path: '/pickem', component: PickemPage };

  // Navbar'a link ekle
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'pickem',
      LinkButton.component(
        {
          href: app.route('pickem'),
          icon: 'fas fa-trophy',
        },
        app.translator.trans('huseyinfiliz-pickem.forum.nav.pickem')
      ),
      85
    );
  });

  // BİLDİRİM COMPONENT'İNİ KAYDET
  app.notificationComponents.pickem_event_result = EventResultNotification;
});