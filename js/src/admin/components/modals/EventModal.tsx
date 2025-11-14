import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Select from 'flarum/common/components/Select';
import PickemEvent from '../../../common/models/Event';
import Week from '../../../common/models/Week';
import Team from '../../../common/models/Team';

interface IEventModalAttrs {
  event?: PickemEvent | null;
  onsave: () => void; // Listeyi (EventsTab) yenilemek için
}

export default class EventModal extends Modal<IEventModalAttrs> {
  private event: PickemEvent | null | undefined;
  private homeTeamId: string = '0';
  private awayTeamId: string = '0';
  private weekId: string = '0';
  private matchDate: string = '';
  private cutoffDate: string = '';
  private allowDraw: boolean = false;
  private status: string = 'scheduled';
  private loading: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);

    this.event = this.attrs.event;
    if (this.event) {
      this.homeTeamId = this.event.homeTeamId() || '0';
      this.awayTeamId = this.event.awayTeamId() || '0';
      this.weekId = this.event.weekId() || '0';
      this.matchDate = this.formatDateForInput(this.event.matchDate());
      this.cutoffDate = this.formatDateForInput(this.event.cutoffDate());
      this.allowDraw = this.event.allowDraw() || false;
      this.status = this.event.status() || 'scheduled';
    }
  }

  /**
   * Flarum'un Date nesnesini (UTC) alır ve <input type="datetime-local">
   * için gereken YYYY-MM-DDTHH:mm formatına (kullanıcının yerel saat diliminde) dönüştürür.
   */
  formatDateForInput(date: Date | undefined): string {
    if (!date) return '';
    
    // Tarayıcının yerel saat dilimini kullanarak tarih/saat bileşenlerini al
    const YYYY = date.getFullYear();
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const DD = date.getDate().toString().padStart(2, '0');
    const HH = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');

    return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
  }

  className(): string {
    return 'EventModal Modal--medium';
  }

  title(): string {
    return app.translator.trans(
      this.event ? 'huseyinfiliz-pickem.admin.events.edit_title' : 'huseyinfiliz-pickem.admin.events.create_title'
    );
  }

  content() {
    const teams = app.store.all('pickem-teams') as Team[];
    const weeks = app.store.all('pickem-weeks') as Week[];

    const teamOptions = teams.reduce((options: Record<string, string>, team) => {
      options[team.id()] = team.name();
      return options;
    }, {});

    const weekOptions = weeks.reduce((options: Record<string, string>, week) => {
      options[week.id()] = week.name();
      return options;
    }, {});

    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.week')}</label>
            <Select
              className="FormControl"
              value={this.weekId}
              onchange={(value: string) => { this.weekId = value; }}
              options={weekOptions}
              default="0"
            >
              <option value="0">{app.translator.trans('huseyinfiliz-pickem.admin.events.no_week')}</option>
            </Select>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.home_team')}</label>
            <Select
              className="FormControl"
              value={this.homeTeamId}
              onchange={(value: string) => { this.homeTeamId = value; }}
              options={teamOptions}
              default="0"
            >
              <option value="0">{app.translator.trans('huseyinfiliz-pickem.admin.events.select_team')}</option>
            </Select>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.away_team')}</label>
            <Select
              className="FormControl"
              value={this.awayTeamId}
              onchange={(value: string) => { this.awayTeamId = value; }}
              options={teamOptions}
              default="0"
            >
              <option value="0">{app.translator.trans('huseyinfiliz-pickem.admin.events.select_team')}</option>
            </Select>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.match_date')}</label>
            <input
              className="FormControl"
              type="datetime-local"
              value={this.matchDate}
              oninput={(e: InputEvent) => { this.matchDate = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.cutoff_date')}</label>
            <input
              className="FormControl"
              type="datetime-local"
              value={this.cutoffDate}
              oninput={(e: InputEvent) => { this.cutoffDate = (e.target as HTMLInputElement).value; }}
            />
          </div>

          <div className="Form-group">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this.allowDraw}
                onchange={(e: InputEvent) => { this.allowDraw = (e.target as HTMLInputElement).checked; }}
              />
              {app.translator.trans('huseyinfiliz-pickem.admin.events.allow_draw')}
            </label>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.status')}</label>
            <Select
              className="FormControl"
              value={this.status}
              onchange={(value: string) => { this.status = value; }}
              options={{
                scheduled: app.translator.trans('huseyinfiliz-pickem.admin.status.scheduled'),
                closed: app.translator.trans('huseyinfiliz-pickem.admin.status.closed'),
                finished: app.translator.trans('huseyinfiliz-pickem.admin.status.finished'),
              }}
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
      weekId: this.weekId === '0' ? null : parseInt(this.weekId),
      homeTeamId: this.homeTeamId === '0' ? null : parseInt(this.homeTeamId),
      awayTeamId: this.awayTeamId === '0' ? null : parseInt(this.awayTeamId),
      // Input'tan gelen 'YYYY-MM-DDTHH:mm' string'ini (yerel saat) doğrudan gönderiyoruz.
      // Sunucu (Carbon::parse) bunu forumun varsayılan saat dilimi (UTC) olarak yorumlayacaktır.
      matchDate: this.matchDate || null,
      cutoffDate: this.cutoffDate || null,
      allowDraw: this.allowDraw,
      status: this.status,
    };

    try {
      const promise = this.event
        ? this.event.save(data)
        : app.store.createRecord('pickem-events').save(data);

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