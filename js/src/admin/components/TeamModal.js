import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { slug } from 'flarum/common/utils/string';

export default class TeamModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.team = this.attrs.team;
    this.name = this.team ? this.team.name() : '';
    this.slug = this.team ? this.team.slug() : '';
    this.logoPath = this.team ? this.team.logoPath() : '';

    // FoF Upload ile ilgili tüm kodlar kaldırıldı.
  }

  // onremove() metodu (event listener'ı temizleyen) kaldırıldı.
  // onFileUploaded() metodu kaldırıldı.

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
                  this.slug = slug(this.name);
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
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.teams.logo')}</label>
            
            {/* Sadece URL girme alanı bırakıldı */}
            <input
              className="FormControl"
              type="text"
              value={this.logoPath}
              oninput={(e) => { this.logoPath = e.target.value; }}
              placeholder="https://example.com/logo.png"
            />
            
            {/* FoF Upload butonu ile ilgili bölüm kaldırıldı */}

            {/* Logo Önizlemesi */}
            {this.logoPath && (
              <div style="margin-top: 10px;">
                <img 
                  src={this.logoPath} // Team.php'deki 'logo_url' accessor'ı sayesinde bu her zaman çalışır
                  alt="Logo preview" 
                  style="max-width: 100px; max-height: 100px; border: 1px solid #ddd; padding: 5px; border-radius: 4px;"
                  onerror={(e) => { e.target.style.display = 'none'; }}
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
              {app.translator.trans('huseyinfiliz-pickem.admin.buttons.save')}
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
      logoPath: this.logoPath, // Kaydedilen URL
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