import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import PickemEvent from '../../../common/models/Event';
import Team from '../../../common/models/Team';

interface IResultModalAttrs {
  event: PickemEvent;
  onsave: () => void;
}

export default class ResultModal extends Modal<IResultModalAttrs> {
  private event: PickemEvent;
  private homeScore: string | number = '';
  private awayScore: string | number = '';
  private loading: boolean = false;

  oninit(vnode: any) {
    super.oninit(vnode);

    this.event = this.attrs.event;
    this.homeScore = this.event.homeScore() !== null ? this.event.homeScore() : '';
    this.awayScore = this.event.awayScore() !== null ? this.event.awayScore() : '';
  }

  className(): string {
    return 'ResultModal Modal--small';
  }

  title(): string {
    return app.translator.trans('huseyinfiliz-pickem.lib.actions.enter_result');
  }

  content() {
    const homeTeam = this.event.homeTeam() as Team | null;
    const awayTeam = this.event.awayTeam() as Team | null;

    let resultText = '';
    const home = Number(this.homeScore);
    const away = Number(this.awayScore);

    if (this.homeScore !== '' && this.awayScore !== '') {
      if (home > away) resultText = homeTeam ? homeTeam.name() : 'Home Win';
      else if (away > home) resultText = awayTeam ? awayTeam.name() : 'Away Win';
      else resultText = app.translator.trans('huseyinfiliz-pickem.forum.picks.draw');
    }

    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{homeTeam ? homeTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.form.home_team')}</label>
            <input
              className="FormControl"
              type="number"
              min="0"
              value={this.homeScore}
              oninput={(e: InputEvent) => {
                this.homeScore = (e.target as HTMLInputElement).value;
              }}
            />
          </div>

          <div className="Form-group">
            <label>{awayTeam ? awayTeam.name() : app.translator.trans('huseyinfiliz-pickem.lib.form.away_team')}</label>
            <input
              className="FormControl"
              type="number"
              min="0"
              value={this.awayScore}
              oninput={(e: InputEvent) => {
                this.awayScore = (e.target as HTMLInputElement).value;
              }}
            />
          </div>

          {resultText && (
            <div className="Form-group">
              <p>
                <strong>{app.translator.trans('huseyinfiliz-pickem.lib.headers.result')}: </strong>
                {resultText}
              </p>
            </div>
          )}

          <div className="Form-group">
            <Button className="Button Button--primary" type="submit" loading={this.loading}>
              {app.translator.trans('huseyinfiliz-pickem.lib.buttons.save')}
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

    try {
      const response = await app.request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/pickem-events/${this.event.id()}/result`,
        body: {
          data: {
            type: 'pickem-events',
            attributes: {
              homeScore: parseInt(this.homeScore as string) || 0,
              awayScore: parseInt(this.awayScore as string) || 0,
            },
          },
        },
      });

      app.store.pushPayload(response);

      app.alerts.show({ type: 'success' }, app.translator.trans('huseyinfiliz-pickem.lib.messages.result_saved'));
      this.attrs.onsave();
      this.hide();

    } catch (error: any) {
      this.loading = false;
      this.alertAttrs = error.alert;
      m.redraw();
    }
  }
}