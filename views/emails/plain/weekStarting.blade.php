<x-mail::plain.notification>
<x-slot:body>
{!! $translator->trans('bigreja-bragalotto.email.week_starting.plain.body', [
'{week}' => $blueprint->week->name,
'{url}' => $url->to('forum')->base().'/bragalotto',
]) !!}
</x-slot:body>
</x-mail::plain.notification>
