import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';

export default class ResultModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.event = this.attrs.event;
    this.homeScore = this.event.homeScore() !== null ? this.event.homeScore() : '';
    this.awayScore = this.event.awayScore() !== null ? this.event.awayScore() : '';
  }

  className() {
    return 'ResultModal Modal--small';
  }

  title() {
    return app.translator.trans('huseyinfiliz-pickem.admin.events.enter_result_title');
  }

  content() {
    const homeTeam = this.event.homeTeam();
    const awayTeam = this.event.awayTeam();

    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{homeTeam ? homeTeam.name() : 'Home Team'} Score</label>
            <input
              className="FormControl"
              type="number"
              min="0"
              value={this.homeScore}
              oninput={(e) => {
                this.homeScore = parseInt(e.target.value) || 0;
              }}
            />
          </div>

          <div className="Form-group">
            <label>{awayTeam ? awayTeam.name() : 'Away Team'} Score</label>
            <input
              className="FormControl"
              type="number"
              min="0"
              value={this.awayScore}
              oninput={(e) => {
                this.awayScore = parseInt(e.target.value) || 0;
              }}
            />
          </div>

          <div className="Form-group">
            <p>
              <strong>Result: </strong>
              {this.homeScore > this.awayScore
                ? 'Home Win'
                : this.awayScore > this.homeScore
                ? 'Away Win'
                : 'Draw'}
            </p>
          </div>

          <div className="Form-group">
            <Button className="Button Button--primary" type="submit" loading={this.loading}>
              {app.translator.trans('huseyinfiliz-pickem.admin.events.save_result')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  async onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    try {
      // YENİ ENDPOINT'E İSTEK AT
      await app.request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/pickem-events/${this.event.id()}/result`,
        body: {
          data: {
            type: 'pickem-events',
            attributes: {
              homeScore: parseInt(this.homeScore),
              awayScore: parseInt(this.awayScore),
            },
          },
        },
      });

      app.alerts.show({ type: 'success' }, 'Result saved and picks updated successfully!');
      this.hide();
      
      // Sayfayı reload et ki güncel datayı görsün
      window.location.reload();
    } catch (error) {
      this.loading = false;
      console.error('Error saving result:', error);
      app.alerts.show({ type: 'error' }, 'Failed to save result');
      m.redraw();
    }
  }
}