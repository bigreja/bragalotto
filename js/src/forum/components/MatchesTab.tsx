import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Button from 'flarum/common/components/Button';
import EventCard from './EventCard';

export default class MatchesTab extends Component {
  oninit(vnode: any) {
    super.oninit(vnode);
  }

  view() {
    const { events, picks, pickLoading, eventsHasMore, eventsLoading, loadEvents, onMakePick } = this.attrs;

    if (!events || events.length === 0) {
      return (
        <div className="MatchesPage-empty">
          <i className="fas fa-calendar-times" style="font-size: 48px; opacity: 0.3; margin-bottom: 16px;" />
          <p>{app.translator.trans('huseyinfiliz-pickem.forum.matches.no_matches')}</p>
        </div>
      );
    }

    return (
      <div>
        <div className="MatchesList">
          {events.map((event: any) => {
            const idStr = String(event.id());
            const pick = picks[idStr];
            const isLoading = pickLoading.has(Number(event.id()));

            return <EventCard event={event} pick={pick} onMakePick={onMakePick} isLoading={isLoading} />;
          })}
        </div>

        {eventsHasMore && (
          <div className="LoadMore">
            <Button className="Button Button--primary" loading={eventsLoading} onclick={loadEvents}>
              {eventsLoading ? 'Loading...' : 'Load More Matches'}
            </Button>
          </div>
        )}
      </div>
    );
  }
}