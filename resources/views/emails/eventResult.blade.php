{{ $translator->trans('pickem.email.event_result.body', [
    '{event_name}' => $blueprint->event->homeTeam->name . ' vs ' . $blueprint->event->awayTeam->name,
    '{result}' => $blueprint->event->home_score . ' - ' . $blueprint->event->away_score
]) }}

{{ $url }}
