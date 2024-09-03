<script lang="ts">
	import { t } from 'svelte-i18n';
	import { currentTab, homeworks, subjects } from '$lib/stores';

	// The `$:` is to make sure svelte loads the title correctly after when the locale changes
	$: $currentTab = $t('titles.home');

	$: homeworksArray = Array.from($homeworks.values());
	$: undoneHomwork = homeworksArray.filter((homework) => !homework.done);
	$: earliestHomework = undoneHomwork.sort(
		(a, b) => (a.due_to?.getTime() ?? Infinity) - (b.due_to?.getTime() ?? Infinity)
	)[0];
	$: earliestHomeworkSubject = earliestHomework ? $subjects.get(earliestHomework.subject_id) : null;

	// FIXME: duplicate
	function getLabel(date: Date): string {
		const millis = date.getTime() - new Date().getTime();

		if (millis > 864e5) {
			const days = Math.floor(millis / 864e5);
			return $t('homework.card.times.days', { values: { count: days } });
		} else if (millis > 36e5) {
			const hours = Math.floor(millis / 36e5);
			return $t('homework.card.times.hours', { values: { count: hours } });
		} else if (millis > 6e4) {
			const minutes = Math.floor(millis / 6e4);
			return $t('homework.card.times.minutes', { values: { count: minutes } });
		} else {
			return $t('homework.card.times.expired');
		}
	}
</script>

<div class="grid w-full gap-4 px-8 py-16">
	<h1 class="py-8 text-center text-2xl font-semibold">
		{#if $homeworks.size === 0}
			{$t('home.homework-label.none')}
		{:else if undoneHomwork.length === 0}
			{$t('home.homework-label.all-done')}
		{:else if undoneHomwork.length === 1}
			{$t('home.homework-label.one')}
		{:else if undoneHomwork.length < 3}
			{$t('home.homework-label.few', { values: { count: undoneHomwork.length } })}
		{:else if undoneHomwork.length < 6}
			{$t('home.homework-label.many', { values: { count: undoneHomwork.length } })}
		{:else}
			{$t('home.homework-label.other', { values: { count: undoneHomwork.length } })}
		{/if}
	</h1>
	{#if earliestHomework}
		<a
			href="/homework"
			class="grid gap-2 rounded-md border-[1px] border-accent px-4 py-6 transition active:scale-95"
		>
			<p class="text-xl">{$t('home.homework-next')}:</p>

			<div class="flex items-center">
				<p
					style="background-color: {earliestHomeworkSubject?.color}"
					class="rounded-md px-2 py-0.5"
				>
					{earliestHomeworkSubject?.name}
				</p>
				<p class="mx-6 text-lg">{earliestHomework.desc}</p>
				<p class="flex-1 text-end">
					{earliestHomework.due_to ? getLabel(earliestHomework.due_to) : ''}
				</p>
			</div>
		</a>
	{:else}
		<a
			href="/homework"
			class="grid gap-2 rounded-md border-[1px] border-accent p-6 text-center text-lg transition active:scale-95"
		>
			{$t('home.goto-homeworks')}
		</a>
	{/if}
	<a
		class="rounded-md border-[1px] border-accent p-6 text-center text-lg transition active:scale-95"
		href="/timetable"
	>
		{$t('home.goto-timetable')}
	</a>
</div>
