import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

declare global {
  const dayjs: any;
}

interface Team {
  id: () => number;
  name: () => string;
  logoUrl: () => string | null;
}

interface PickemEvent {
  id: () => number;
  homeTeam: () => Team | null;
  awayTeam: () => Team | null;
  matchDate: () => string;
  cutoffDate: () => string;
  result: () => string | null;
  canPick: () => boolean;
  allowDraw: () => boolean;
  status: () => string;
  homeScore: () => number | null;
  awayScore: () => number | null;
}

interface Pick {
  id: () => number;
  selectedOutcome: () => string;
  isCorrect: () => boolean | null;
  event: () => PickemEvent | null;
}

interface EventCardAttrs {
  event: PickemEvent;
  pick?: Pick;
  onMakePick: (eventId: number, outcome: string) => Promise<void>;
  isLoading: boolean;
}

export default class EventCard extends Component<EventCardAttrs> {
  view() {
    const { event, pick, onMakePick, isLoading } = this.attrs;

    if (!event || typeof event.id !== 'function') {
      return null;
    }

    const homeTeam = event.homeTeam ? event.homeTeam() : null;
    const awayTeam = event.awayTeam ? event.awayTeam() : null;
    const canPick = typeof event.canPick === 'function' ? event.canPick() : false;
    const status = typeof event.status === 'function' ? event.status() : 'scheduled';
    const result = typeof event.result === 'function' ? event.result() : null;
    const homeScore = typeof event.homeScore === 'function' ? event.homeScore() : null;
    const awayScore = typeof event.awayScore === 'function' ? event.awayScore() : null;

    let matchDate = '-';
    let cutoffDate = '-';
    try {
      matchDate = dayjs(event.matchDate()).format('DD MMM YYYY, HH:mm');
    } catch {
      matchDate = String(event.matchDate());
    }
    try {
      cutoffDate = dayjs(event.cutoffDate()).format('DD MMM YYYY, HH:mm');
    } catch {
      cutoffDate = String(event.cutoffDate());
    }

    const countdown = this.getCountdown(event.cutoffDate());

    return (
      <div className="EventCard">
        {/* Status Badge */}
        <div className={`EventCard-status ${status}`}>
          {status === 'scheduled' && '🟢 Live'}
          {status === 'closed' && '🔴 Closed'}
          {status === 'finished' && '⚫ Finished'}
          {status === 'cancelled' && '⭕ Cancelled'}
        </div>

        {/* Teams */}
        <div className="EventCard-teams">
          <div className="team-container">
            {this.renderTeamLogo(homeTeam)}
            <div className="team-name">{homeTeam ? homeTeam.name() : 'Home Team'}</div>
          </div>

          <div className="vs">VS</div>

          <div className="team-container">
            {this.renderTeamLogo(awayTeam)}
            <div className="team-name">{awayTeam ? awayTeam.name() : 'Away Team'}</div>
          </div>
        </div>

        {/* Score (if finished) */}
        {status === 'finished' && homeScore !== null && awayScore !== null && (
          <div className="EventCard-score">
            <div className="score-number">{homeScore}</div>
            <div className="score-separator">-</div>
            <div className="score-number">{awayScore}</div>
          </div>
        )}

        {/* Info */}
        <div className="EventCard-info">
          <div>
            <i className="fas fa-calendar" />
            <strong>Match:</strong> {matchDate}
          </div>
          <div>
            <i className="fas fa-clock" />
            <strong>Cutoff:</strong> {cutoffDate}
          </div>
          {countdown && canPick && (
            <div>
              <span className={`EventCard-countdown ${countdown.urgent ? 'urgent' : ''}`}>
                <i className="fas fa-hourglass-half" />
                {countdown.text}
              </span>
            </div>
          )}
          {result && (
            <div>
              <i className="fas fa-flag-checkered" />
              <strong>Result:</strong> {this.formatResult(result, homeTeam, awayTeam)}
            </div>
          )}
        </div>

        {/* Pick Buttons */}
        {app.session.user && canPick && (
          <div className="EventCard-picks">
            <Button
              className={pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'home' ? 'Button--primary' : ''}
              onclick={() => onMakePick(Number(event.id()), 'home')}
              loading={isLoading}
              disabled={isLoading}
            >
              {homeTeam ? homeTeam.name() : 'Home'}
            </Button>

            {event.allowDraw && event.allowDraw() && (
              <Button
                className={pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'draw' ? 'Button--primary' : ''}
                onclick={() => onMakePick(Number(event.id()), 'draw')}
                loading={isLoading}
                disabled={isLoading}
              >
                Draw
              </Button>
            )}

            <Button
              className={pick && typeof pick.selectedOutcome === 'function' && pick.selectedOutcome() === 'away' ? 'Button--primary' : ''}
              onclick={() => onMakePick(Number(event.id()), 'away')}
              loading={isLoading}
              disabled={isLoading}
            >
              {awayTeam ? awayTeam.name() : 'Away'}
            </Button>
          </div>
        )}

        {/* Pick Result */}
        {pick && !canPick && (
          <div className="EventCard-pick-result">
            Your pick: <strong>{this.formatResult(pick.selectedOutcome(), homeTeam, awayTeam)}</strong>
            {pick.isCorrect && typeof pick.isCorrect === 'function' && pick.isCorrect() !== null && (
              <span className={pick.isCorrect() ? 'correct' : 'incorrect'}>{pick.isCorrect() ? ' ✓ Correct' : ' ✗ Incorrect'}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  renderTeamLogo(team: Team | null) {
    if (!team) {
      return (
        <div className="team-logo">
          <span>?</span>
        </div>
      );
    }

    const logoUrl = typeof team.logoUrl === 'function' ? team.logoUrl() : null;
    const teamName = typeof team.name === 'function' ? team.name() : 'Team';

    if (logoUrl) {
      return (
        <div className="team-logo">
          <img src={logoUrl} alt={teamName} />
        </div>
      );
    }

    // Generate initial letter logo
    const initial = teamName.charAt(0).toUpperCase();
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
    const colorIndex = teamName.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex];

    return (
      <div className="team-logo" style={`background-color: ${bgColor};`}>
        <span>{initial}</span>
      </div>
    );
  }

  getCountdown(cutoffDate: string) {
    try {
      const now = dayjs();
      const cutoff = dayjs(cutoffDate);
      const diff = cutoff.diff(now);

      if (diff <= 0) return null;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours < 1) {
        return {
          text: `${minutes}m remaining`,
          urgent: minutes < 30,
        };
      }

      if (hours < 24) {
        return {
          text: `${hours}h ${minutes}m remaining`,
          urgent: hours < 2,
        };
      }

      const days = Math.floor(hours / 24);
      return {
        text: `${days}d remaining`,
        urgent: false,
      };
    } catch {
      return null;
    }
  }

  formatResult(result: string, homeTeam: Team | null, awayTeam: Team | null) {
    if (result === 'home') return homeTeam ? homeTeam.name() : 'Home';
    if (result === 'away') return awayTeam ? awayTeam.name() : 'Away';
    if (result === 'draw') return 'Draw';
    return result;
  }
}