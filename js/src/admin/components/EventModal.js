import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class EventModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.event = this.attrs.event;
    this.homeTeamId = this.event ? this.event.homeTeamId() : '0'; // '0' olarak başla
    this.awayTeamId = this.event ? this.event.awayTeamId() : '0'; // '0' olarak başla
    this.weekId = this.event ? this.event.weekId() : '0'; // '0' olarak başla
    
    // Bu kısım (formatDateForInput) DOĞRU. 
    // Sunucudan gelen UTC saati (17:40) alıp, 
    // input'ta sizin yerel saatiniz (20:40) olarak göstermeye yarıyor.
    this.matchDate = this.event ? this.formatDateForInput(this.event.matchDate()) : '';
    this.cutoffDate = this.event ? this.formatDateForInput(this.event.cutoffDate()) : '';

    this.allowDraw = this.event ? this.event.allowDraw() : false;
    this.status = this.event ? this.event.status() : 'scheduled';
  }

  formatDateForInput(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Bu, UTC tarihi alır ve onu kullanıcının yerel saatine göre formatlar (datetime-local için gereklidir)
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
              {/* Değer "0" olarak değiştirildi */}
              <option value="0">{app.translator.trans('huseyinfiliz-pickem.admin.events.no_week')}</option>
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
              {/* Değer "0" olarak değiştirildi */}
              <option value="0">{app.translator.trans('huseyinfiliz-pickem.admin.events.select_team')}</option>
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
              {/* Değer "0" olarak değiştirildi */}
              <option value="0">{app.translator.trans('huseyinfiliz-pickem.admin.events.select_team')}</option>
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

    const weekId = this.weekId === '0' ? null : parseInt(this.weekId);
    const homeTeamId = this.homeTeamId === '0' ? null : parseInt(this.homeTeamId);
    const awayTeamId = this.awayTeamId === '0' ? null : parseInt(this.awayTeamId);

    const data = {
      weekId: weekId,
      homeTeamId: homeTeamId,
      awayTeamId: awayTeamId,
      
      // ---- DÜZELTME BURADA ----
      // new Date(...).toISOString() DÖNÜŞÜMÜ KALDIRILDI.
      // Artık input'taki (YYYY-MM-DDTHH:mm) string değeri neyse o gönderiliyor.
      // Sunucu (Carbon::parse) bunu forumun varsayılan saati (UTC) olarak yorumlayacak.
      matchDate: this.matchDate || null,
      cutoffDate: this.cutoffDate || null,
      // ---- DÜZELTME SONU ----

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