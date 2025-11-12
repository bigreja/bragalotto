import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import { slug } from 'flarum/common/utils/string';

export default class SeasonModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.season = this.attrs.season;
    this.name = this.season ? this.season.name() : '';
    this.slug = this.season ? this.season.slug() : '';
    this.startDate = this.season ? this.formatDateForInput(this.season.startDate()) : '';
    this.endDate = this.season ? this.formatDateForInput(this.season.endDate()) : '';
  }

  formatDateForInput(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    // YYYY-MM-DD formatına çevirir (input[type=date] için)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  className() {
    return 'SeasonModal Modal--small';
  }

  title() {
    return app.translator.trans(
      this.season ? 'huseyinfiliz-pickem.admin.seasons.edit_title' : 'huseyinfiliz-pickem.admin.seasons.create_title'
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
              oninput={(e) => {
                this.name = e.target.value;
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
              oninput={(e) => { this.slug = e.target.value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.start_date')}</label>
            <input
              className="FormControl"
              type="date"
              value={this.startDate}
              oninput={(e) => { this.startDate = e.target.value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.seasons.end_date')}</label>
            <input
              className="FormControl"
              type="date"
              value={this.endDate}
              oninput={(e) => { this.endDate = e.target.value; }}
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

  onsubmit(e) {
    e.preventDefault();
    this.loading = true;

    const data = {
      name: this.name,
      slug: this.slug,
      startDate: this.startDate || null,
      endDate: this.endDate || null,
    };

    const promise = this.season
      ? this.season.save(data)
      : app.store.createRecord('pickem-seasons').save(data);

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