import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
// Model'leri kaydetmek için 'common/extend' dosyasını doğrudan içe aktarıyoruz
import commonExtenders from '../common/extend';
import PickemPage from './components/PickemPage';

app.initializers.add('huseyinfiliz/pickem', () => {
  // Model'leri kaydet
  commonExtenders.forEach(extender => extender.extend(app));

  // Route kaydet
  app.routes.pickem = { path: '/pickem', component: PickemPage };

  // Navbar'a link ekle (Kenar Çubuğu)
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
});