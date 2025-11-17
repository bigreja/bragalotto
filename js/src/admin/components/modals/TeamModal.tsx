import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { slug } from 'flarum/common/utils/string';
import Team from '../../../common/models/Team'; 

interface ITeamModalAttrs {
  team?: Team | null;
  onsave: () => void;
}

export default class TeamModal extends Modal<ITeamModalAttrs> {
  private team: Team | null | undefined;
  private name: string = '';
  private slug: string = '';
  private logoPath: string = '';
  private loading: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.team = this.attrs.team;
    if (this.team) {
      this.name = this.team.name() || '';
      this.slug = this.team.slug() || '';
      this.logoPath = this.team.logoPath() || '';
    }
  }

  className(): string {
    return 'TeamModal Modal--small';
  }

  title(): string {
    const resource = app.translator.trans('huseyinfiliz-pickem.lib.models.team');
    return this.team
      ? app.translator.trans('huseyinfiliz-pickem.lib.actions.edit', { resource })
      : app.translator.trans('huseyinfiliz-pickem.lib.actions.create', { resource });
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.lib.form.name')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.name}
              oninput={(e: InputEvent) => {
                this.name = (e.target as HTMLInputElement).value;
                if (!this.team) {
                  this.slug = slug(this.name);
                }
              }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.lib.form.slug')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.slug}
              oninput={(e: InputEvent) => { this.slug = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.lib.form.logo_url')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.logoPath}
              oninput={(e: InputEvent) => { this.logoPath = (e.target as HTMLInputElement).value; }}
              placeholder="https://example.com/logo.png"
            />
            {this.logoPath && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={this.logoPath}
                  alt="Logo preview"
                  style={{ maxWidth: '100px', maxHeight: '100px', border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }}
                  onerror={(e: any) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div className="Form-group">
            <Button
              className="Button Button--primary"
              type="submit"
              loading={this.loading}
            >
              {app.translator.trans('huseyinfiliz-pickem.lib.buttons.save')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  async onsubmit(e: SubmitEvent) {
    e.preventDefault();
    this.loading = true;
    m.redraw();
    const data = {
      name: this.name,
      slug: this.slug,
      logoPath: this.logoPath,
    };
    try {
      const promise = this.team
        ? this.team.save(data)
        : app.store.createRecord('pickem-teams').save(data);

      await promise;
      this.attrs.onsave(); 
      this.hide();
    } catch (error: any) {
      this.loading = false;
      this.alertAttrs = error.alert;
      m.redraw();
    }
  }
}