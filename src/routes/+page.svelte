<script lang="ts">
	import { t } from 'svelte-i18n';
	import { cn, getTimeLabel } from '$lib/utils';
	import { differenceInCalendarDays } from 'date-fns';
	import { Check, CircleCheck } from 'lucide-svelte';
	import type { Subject } from '$lib/Subject';
	import timetabletimes from '$lib/timetabletimes';
	import { globalState, subjectState } from '$lib/state.svelte';

	// The `effect` is to make sure svelte loads the title correctly when the locale changes
	$effect(() => {
		globalState.currentTab = $t('titles.home');
	});

	let homeworksArray = $derived(
		Array.from(subjectState.subjects)
			.map((val) => val.homeworks)
			.flat()
	);
	let undoneHomework = $derived(homeworksArray.filter((homework) => !homework.done));
	let homeworkForTomorrow = $derived(
		homeworksArray.filter((homework) => {
			if (!homework.dueTo) return false;
			const days = differenceInCalendarDays(homework.dueTo, new Date());
			return days <= 1;
		})
	);
	let homeworkForToday = $derived(
		homeworkForTomorrow.filter((homework) => {
			const days = differenceInCalendarDays(homework.dueTo!, new Date());
			return days == 0;
		})
	);
	let allDone = $derived(
		homeworkForToday.length != 0
			? homeworkForToday.every((homework) => homework.done)
			: homeworkForTomorrow.every((homework) => homework.done)
	);
	let earliestHomework = $derived(
		homeworkForTomorrow.length == 0
			? undoneHomework.sort((a, b) => (a.dueTo ?? Infinity) - (b.dueTo ?? Infinity))[0]
			: null
	);
	let earliestHomeworkSubject = $derived(
		earliestHomework ? subjectState.get(earliestHomework.subjectId) : null
	);

	function getNextLesson(timetable: (Subject | null)[]): Subject | null {
		const date = new Date();
		const day = date.getDay() - 1;
		if (day < 0 && day > 4) return null;

		const hour = date.getHours();
		const minute = date.getMinutes();

		let lh = -1;
		for (const [index, time] of timetabletimes.entries()) {
			if (hour <= time[0]) {
				if (minute < time[1]) {
					lh = index;
				} else {
					lh = index + 1;
				}
			}
		}

		if (lh >= 0 && lh < 12) {
			return timetable[lh * 5 + day];
		}

		return null;
	}

	let nextSubject = $derived(getNextLesson(subjectState.timetable));
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
	<div>
		{#if homeworkForTomorrow.length != 0}
			<a
				href="/homework"
				class="relative grid gap-2 rounded-md border-[1px] border-accent px-4 py-6 transition active:scale-95"
			>
				<p class="text-xl">
					{$t('home.homework-for-' + (homeworkForToday.length > 0 ? 'today' : 'tomorrow'))}:
				</p>

				{#each homeworkForToday.length > 0 ? homeworkForToday : homeworkForTomorrow as homework}
					<div class="mt-2 flex items-center">
						<p
							style="background-color: {subjectState.get(homework.subjectId)?.color}"
							class="rounded-md px-2 py-0.5"
							class:opacity-50={homework.done}
						>
							{subjectState.get(homework.subjectId)?.name}
						</p>
						<p class={cn('mx-6 flex-1 text-lg', homework.done && 'line-through opacity-50')}>
							{homework.desc}
						</p>
						{#if homework.done}
							<Check size={18} class="mr-4" />
						{/if}
					</div>
				{/each}

				{#if allDone}
					<CircleCheck
						size={26}
						color="green"
						transform="rotate(350)"
						class="absolute right-[-10px] top-[-10px]"
					/>
				{/if}
			</a>
		{:else if earliestHomework}
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
				href="/homework"
				class="grid gap-2 rounded-md border-[1px] border-accent p-6 text-center text-lg transition active:scale-95"
			>
				{$t('home.goto-homeworks')}
			</a>
		{/if}
	</div>
	{#if nextSubject}
		<a
			class="rounded-md border-[1px] border-accent p-6 text-center text-lg transition active:scale-95"
			href="/timetable"
		>
			{$t('home.next-lesson')}:
			<span style:background-color={nextSubject.color} class="ml-6 rounded-md px-2 py-1"
				>{nextSubject.name}</span
			>
		</a>
	{:else}
		<a
			class="rounded-md border-[1px] border-accent p-6 text-center text-lg transition active:scale-95"
			href="/timetable"
		>
			{$t('home.goto-timetable')}
		</a>
	{/if}
</div>
