import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { slug } from 'flarum/common/utils/string';
import Season from '../../../common/models/Season'; // İçe aktarma yolu güncellendi

interface ISeasonModalAttrs {
  season?: Season | null;
  onsave: () => void; // Listeyi yenilemek için callback
}

export default class SeasonModal extends Modal<ISeasonModalAttrs> {
  private season: Season | null | undefined;
  private name: string = '';
  private slug: string = '';
  private startDate: string = '';
  private endDate: string = '';
  private loading: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);

    this.season = this.attrs.season;
    if (this.season) {
      this.name = this.season.name() || '';
      this.slug = this.season.slug() || '';
      this.startDate = this.formatDateForInput(this.season.startDate());
      this.endDate = this.formatDateForInput(this.season.endDate());
    }
  }

  formatDateForInput(dateString: string | Date | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Returns YYYY-MM-DD format for input[type=date]
    return date.toISOString().slice(0, 10);
  }

  className(): string {
    return 'SeasonModal Modal--small';
  }

  title(): string {
    return app.translator.trans(
      this.season
        ? 'huseyinfiliz-pickem.admin.seasons.edit_title'
        : 'huseyinfiliz-pickem.admin.seasons.create_title'
    );
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.name')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.name}
              oninput={(e: InputEvent) => {
                this.name = (e.target as HTMLInputElement).value;
                if (!this.season) {
                  this.slug = slug(this.name);
                }
              }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.slug')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.slug}
              oninput={(e: InputEvent) => { this.slug = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.start_date')}</label>
            <input
              className="FormControl"
              type="date"
              value={this.startDate}
              oninput={(e: InputEvent) => { this.startDate = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.end_date')}</label>
            <input
              className="FormControl"
              type="date"
              value={this.endDate}
              oninput={(e: InputEvent) => { this.endDate = (e.target as HTMLInputElement).value; }}
            />
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

  async onsubmit(e: SubmitEvent) {
    e.preventDefault();
    this.loading = true;
    m.redraw();

    const data = {
      name: this.name,
      slug: this.slug,
      startDate: this.startDate || null, // Boşsa null gönder
      endDate: this.endDate || null,     // Boşsa null gönder
    };

    try {
      const promise = this.season
        ? this.season.save(data)
        : app.store.createRecord('pickem-seasons').save(data);

      await promise;

      this.attrs.onsave(); // Listeyi yenilemek için callback'i çağır
      this.hide();
    } catch (error: any) {
      this.loading = false;
      this.alertAttrs = error.alert;
      m.redraw();
    }
  }
}