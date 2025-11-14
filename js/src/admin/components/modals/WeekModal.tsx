import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import Week from '../../../common/models/Week';
import Season from '../../../common/models/Season';

interface IWeekModalAttrs {
  week?: Week | null;
  onsave: () => void; // Listeyi yenilemek için callback
}

export default class WeekModal extends Modal<IWeekModalAttrs> {
  private week: Week | null | undefined;
  private name: string = '';
  private weekNumber: string | number = '';
  private seasonId: string = '0'; // '0' string olarak başla
  private loading: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);

    this.week = this.attrs.week;
    if (this.week) {
      this.name = this.week.name() || '';
      this.weekNumber = this.week.weekNumber() || '';
      this.seasonId = this.week.seasonId() || '0';
    }
  }

  className(): string {
    return 'WeekModal Modal--small';
  }

  title(): string {
    return app.translator.trans(
      this.week
        ? 'huseyinfiliz-pickem.admin.weeks.edit_title'
        : 'huseyinfiliz-pickem.admin.weeks.create_title'
    );
  }

  content() {
    const seasons = app.store.all('pickem-seasons') as Season[];
    // Tip güvenliği için 'any' yerine 'Record<string, string>' kullan
    const seasonOptions: Record<string, string> = seasons.reduce((options: Record<string, string>, season) => {
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
              oninput={(e: InputEvent) => { this.name = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.weeks.season')}</label>
            <Select
              className="FormControl"
              value={this.seasonId}
              onchange={(value: string) => { this.seasonId = value; }}
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
              oninput={(e: InputEvent) => { this.weekNumber = (e.target as HTMLInputElement).value; }}
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
      weekNumber: this.weekNumber || null,
      seasonId: this.seasonId === '0' ? null : this.seasonId,
    };

    try {
      const promise = this.week
        ? this.week.save(data)
        : app.store.createRecord('pickem-weeks').save(data);

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