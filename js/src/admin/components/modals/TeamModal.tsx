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
  private fullName: string = '';
  private slug: string = '';
  private logoFile: File | null = null;
  private logoPreview: string | null = null;
  private loading: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);
    this.team = this.attrs.team;
    if (this.team) {
      this.name = this.team.name() || '';
      this.fullName = this.team.fullName() || '';
      this.slug = this.team.slug() || '';
    }
  }

  className(): string {
    return 'TeamModal Modal--small';
  }

  title(): string {
    return this.team
      ? app.translator.trans('bigreja-bragalotto.lib.actions.edit')
      : app.translator.trans('bigreja-bragalotto.lib.actions.create');
  }

  content() {
    const currentLogoUrl = this.team ? this.team.logoUrl() : null;
    const previewSrc = this.logoPreview || currentLogoUrl;

    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('bigreja-bragalotto.lib.form.name')}</label>
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
            <label>{app.translator.trans('bigreja-bragalotto.lib.form.full_name')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.fullName}
              oninput={(e: InputEvent) => { this.fullName = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('bigreja-bragalotto.lib.form.slug')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.slug}
              oninput={(e: InputEvent) => { this.slug = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('bigreja-bragalotto.lib.form.logo_file')}</label>
            <input
              className="FormControl"
              type="file"
              accept=".png,.svg,image/png,image/svg+xml"
              onchange={this.handleFileSelect.bind(this)}
            />
            {previewSrc && (
              <div style={{ marginTop: '8px' }}>
                <img
                  src={previewSrc}
                  alt="Logo preview"
                  style={{ maxWidth: '80px', maxHeight: '80px', border: '1px solid #ddd', padding: '4px', borderRadius: '4px', objectFit: 'contain' }}
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
              {app.translator.trans('bigreja-bragalotto.lib.buttons.save')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      this.logoFile = null;
      this.logoPreview = null;
      m.redraw();
      return;
    }

    const file = target.files[0];
    const allowed = ['image/png', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      app.alerts.show({ type: 'error' }, 'Only PNG and SVG files are allowed.');
      target.value = '';
      return;
    }

    this.logoFile = file;

    const reader = new FileReader();
    reader.onload = (ev) => {
      this.logoPreview = ev.target?.result as string;
      m.redraw();
    };
    reader.readAsDataURL(file);
  }

  async uploadLogo(teamId: string | number) {
    if (!this.logoFile) return;

    const formData = new FormData();
    formData.append('logo', this.logoFile);

    // Use native fetch so the browser sets Content-Type: multipart/form-data
    // automatically — app.request would override it with application/json.
    const headers: Record<string, string> = {};
    if (app.session.token) {
      headers['Authorization'] = 'Token ' + app.session.token;
    }

    const response = await fetch(
      app.forum.attribute('apiUrl') + '/bragalotto-teams/' + teamId + '/logo',
      { method: 'POST', headers, body: formData }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw err;
    }
  }

  async onsubmit(e: SubmitEvent) {
    e.preventDefault();
    this.loading = true;
    m.redraw();

    const data = {
      name: this.name,
      fullName: this.fullName,
      slug: this.slug,
    };

    try {
      let team: Team;
      if (this.team) {
        team = (await this.team.save(data)) as Team;
      } else {
        team = (await app.store.createRecord<Team>('bragalotto-teams').save(data)) as Team;
      }

      if (this.logoFile) {
        await this.uploadLogo(team.id());
      }

      this.attrs.onsave();
      this.hide();
    } catch (error: any) {
      this.loading = false;
      this.alertAttrs = error.alert;
      m.redraw();
    }
  }
}