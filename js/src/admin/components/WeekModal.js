import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';

export default class WeekModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.week = this.attrs.week;
    this.name = this.week ? this.week.name() : '';
    this.weekNumber = this.week ? this.week.weekNumber() : '';
    this.seasonId = this.week ? this.week.seasonId() : '';
  }

  className() {
    return 'WeekModal Modal--small';
  }

  title() {
    return app.translator.trans(
      this.week ? 'huseyinfiliz-pickem.admin.weeks.edit_title' : 'huseyinfiliz-pickem.admin.weeks.create_title'
    );
  }

  content() {
    const seasons = app.store.all('pickem-seasons');
    const seasonOptions = seasons.reduce((options, season) => {
      options[season.id()] = season.name();
      return options;
    }, {});

    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.name')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.name}
              oninput={(e) => { this.name = e.target.value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.season')}</label>
            <Select
              className="FormControl"
              value={this.seasonId}
              onchange={(value) => { this.seasonId = value; }}
              options={seasonOptions}
              default="0"
            >
              <option value="0">{app.translator.trans('huseyinfiliz-pickem.admin.weeks.select_season')}</option>
            </Select>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.week_number')}</label>
            <input
              className="FormControl"
              type="number"
              value={this.weekNumber}
              oninput={(e) => { this.weekNumber = e.target.value; }}
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
      weekNumber: this.weekNumber || null,
      seasonId: this.seasonId === '0' ? null : this.seasonId,
    };

    const promise = this.week
      ? this.week.save(data)
      : app.store.createRecord('pickem-weeks').save(data);

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