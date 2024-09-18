<script lang="ts">
	import { t } from 'svelte-i18n';
	import { currentTab, subjects } from '$lib/stores';
	import { getTimeLabel } from '$lib/utils';

	// The `$:` is to make sure svelte loads the title correctly after when the locale changes
	$: $currentTab = $t('titles.home');

	$: homeworksArray = Array.from($subjects)
		.map(([_, val]) => val.homeworks)
		.flat();
	$: undoneHomework = homeworksArray.filter((homework) => !homework.done);
	$: earliestHomework = undoneHomework.sort(
		(a, b) => (a.dueTo ?? Infinity) - (b.dueTo ?? Infinity)
	)[0];
	$: earliestHomeworkSubject = earliestHomework ? $subjects.get(earliestHomework.subjectId) : null;
</script>

<div class="grid w-full gap-4 px-8 py-16">
	<h1 class="py-8 text-center text-2xl font-semibold">
		{#if homeworksArray.length === 0}
			{$t('home.homework-label.none')}
		{:else if undoneHomework.length === 0}
			{$t('home.homework-label.all-done')}
		{:else if undoneHomework.length === 1}
			{$t('home.homework-label.one')}
		{:else if undoneHomework.length < 3}
			{$t('home.homework-label.few', { values: { count: undoneHomework.length } })}
		{:else if undoneHomework.length < 6}
			{$t('home.homework-label.many', { values: { count: undoneHomework.length } })}
		{:else}
			{$t('home.homework-label.other', { values: { count: undoneHomework.length } })}
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
					{earliestHomework.dueTo ? getTimeLabel(earliestHomework.dueTo, $t) : ''}
				</p>
			</div>
		</a>
	{:else}
		<a
			href="'/homework'"
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
