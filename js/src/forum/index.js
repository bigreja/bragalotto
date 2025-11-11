import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import IndexPage from 'flarum/forum/components/IndexPage';

// Import extenders
import extenders from './extend';

// Import components
import PickemPage from './components/PickemPage';

app.initializers.add('huseyinfiliz/pickem', () => {
  // Apply extenders (model registration)
  extenders.forEach(extender => extender.extend(app));

  // Register single route for Pick'em page with tabs
  app.routes.pickem = { path: '/pickem', component: PickemPage };

  // Add navigation item
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add(
      'pickem',
      LinkButton.component(
        {
          href: app.route('pickem'),
          icon: 'fas fa-trophy',
        },
        "Pick'em"
      ),
      85
    );
  });
});