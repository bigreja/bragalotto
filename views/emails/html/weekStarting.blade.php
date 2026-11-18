<x-mail::html.notification>
    <x-slot:body>
        {!! $formatter->convert($translator->trans('bigreja-bragalotto.email.week_starting.html.body', [
            '{week}' => $blueprint->week->name,
            '{url}' => $url->to('forum')->base().'/bragalotto',
        ])) !!}
    </x-slot:body>
</x-mail::html.notification>
