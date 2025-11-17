import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

export default class SettingsTab extends Component {
  loading: boolean = false;

  view() {
    return (
      <div className="SettingsTab">
        <div className="Form-group">
          <h3>
            <i className="fas fa-cogs" />
            {app.translator.trans('huseyinfiliz-pickem.lib.nav.settings')}
          </h3>
          <p>
            {app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_help')}
          </p>
          <Button
            className="Button Button--primary"
            icon="fas fa-sync"
            loading={this.loading}
            onclick={this.recalculateScores.bind(this)}
          >
            {app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_btn')}
          </Button>
        </div>
      </div>
    );
  }

  recalculateScores() {
    if (this.loading) return;

    if (!confirm(app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_confirm'))) {
      return;
    }

    this.loading = true;
    m.redraw();
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/pickem/recalculate-all-scores',
    }).then(response => {
      this.loading = false;
      m.redraw();
      app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.admin.settings.recalc_queued'));
    }).catch(error => {
      this.loading = false;
      m.redraw();
      console.error(error);
    });
  }
}