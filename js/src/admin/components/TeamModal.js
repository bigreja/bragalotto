import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class TeamModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.team = this.attrs.team;
    this.name = this.team ? this.team.name() : '';
    this.slug = this.team ? this.team.slug() : '';
    this.logoPath = this.team ? this.team.logoPath() : '';
  }

  className() {
    return 'TeamModal Modal--small';
  }

  title() {
    return app.translator.trans(
      this.team ? 'huseyinfiliz-pickem.admin.teams.edit_title' : 'huseyinfiliz-pickem.admin.teams.create_title'
    );
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.teams.name')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.name}
              oninput={(e) => {
                this.name = e.target.value;
                if (!this.team) {
                  this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                }
              }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.teams.slug')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.slug}
              oninput={(e) => { this.slug = e.target.value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.teams.logo_path')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.logoPath}
              oninput={(e) => { this.logoPath = e.target.value; }}
              placeholder="e.g., teams/logo.png"
            />
          </div>

          <div className="Form-group">
            <Button
              className="Button Button--primary"
              type="submit"
              loading={this.loading}
            >
              {app.translator.trans('core.admin.basics.submit_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    const data = {
      name: this.name,
      slug: this.slug,
      logoPath: this.logoPath,
    };

    const promise = this.team
      ? this.team.save(data)
      : app.store.createRecord('pickem-teams').save(data);

    promise.then(
      () => {
        this.hide();
        m.redraw();
      },
      (error) => {
        this.loading = false;
        this.alertAttrs = error.alert;
        m.redraw();
      }
    );
  }
}
