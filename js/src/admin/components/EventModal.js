import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class EventModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.event = this.attrs.event;
    this.homeTeamId = this.event ? this.event.homeTeamId() : '';
    this.awayTeamId = this.event ? this.event.awayTeamId() : '';
    this.weekId = this.event ? this.event.weekId() : '';
    this.matchDate = this.event ? this.formatDateForInput(this.event.matchDate()) : '';
    this.cutoffDate = this.event ? this.formatDateForInput(this.event.cutoffDate()) : '';
    this.allowDraw = this.event ? this.event.allowDraw() : false;
    this.status = this.event ? this.event.status() : 'scheduled';
  }

  formatDateForInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  className() {
    return 'EventModal Modal--medium';
  }

  title() {
    return app.translator.trans(
      this.event ? 'huseyinfiliz-pickem.admin.events.edit_title' : 'huseyinfiliz-pickem.admin.events.create_title'
    );
  }

  content() {
    const teams = app.store.all('pickem-teams');
    const weeks = app.store.all('pickem-weeks');

    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.week')}</label>
            <select
              className="FormControl"
              value={this.weekId}
              onchange={(e) => { this.weekId = e.target.value; }}
            >
              <option value="">{app.translator.trans('huseyinfiliz-pickem.admin.events.no_week')}</option>
              {weeks.map(week => (
                <option value={week.id()}>{week.name()}</option>
              ))}
            </select>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.home_team')}</label>
            <select
              className="FormControl"
              value={this.homeTeamId}
              onchange={(e) => { this.homeTeamId = e.target.value; }}
            >
              <option value="">{app.translator.trans('huseyinfiliz-pickem.admin.events.select_team')}</option>
              {teams.map(team => (
                <option value={team.id()}>{team.name()}</option>
              ))}
            </select>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.away_team')}</label>
            <select
              className="FormControl"
              value={this.awayTeamId}
              onchange={(e) => { this.awayTeamId = e.target.value; }}
            >
              <option value="">{app.translator.trans('huseyinfiliz-pickem.admin.events.select_team')}</option>
              {teams.map(team => (
                <option value={team.id()}>{team.name()}</option>
              ))}
            </select>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.match_date')}</label>
            <input
              className="FormControl"
              type="datetime-local"
              value={this.matchDate}
              oninput={(e) => { this.matchDate = e.target.value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.cutoff_date')}</label>
            <input
              className="FormControl"
              type="datetime-local"
              value={this.cutoffDate}
              oninput={(e) => { this.cutoffDate = e.target.value; }}
            />
          </div>

          <div className="Form-group">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this.allowDraw}
                onchange={(e) => { this.allowDraw = e.target.checked; }}
              />
              {app.translator.trans('huseyinfiliz-pickem.admin.events.allow_draw')}
            </label>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.events.status')}</label>
            <select
              className="FormControl"
              value={this.status}
              onchange={(e) => { this.status = e.target.value; }}
            >
              <option value="scheduled">Scheduled</option>
              <option value="closed">Closed</option>
              <option value="finished">Finished</option>
            </select>
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
      weekId: this.weekId || null,
      homeTeamId: parseInt(this.homeTeamId),
      awayTeamId: parseInt(this.awayTeamId),
      matchDate: new Date(this.matchDate).toISOString(),
      cutoffDate: new Date(this.cutoffDate).toISOString(),
      allowDraw: this.allowDraw,
      status: this.status,
    };

    const promise = this.event
      ? this.event.save(data)
      : app.store.createRecord('pickem-events').save(data);

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
