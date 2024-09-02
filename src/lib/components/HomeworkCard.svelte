<script lang="ts">
	import type { Homework } from '$lib/Homework';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { dataService } from '$lib/database';
	import { createEventDispatcher } from 'svelte';

	import { t } from 'svelte-i18n';

	import { send, receive } from '$lib/transition';

	import { homeworks as homeworkStore } from '$lib/stores';

	const dispatch = createEventDispatcher();

	export let id: number;
	export let name: string;
	export let color: string;

	export let homeworks: Homework[];

	function onClick() {
		dispatch('addHomework', { id });
	}

	function onContextMenu() {
		if (homeworks.length > 0) {
			dispatch('editHomework', { id, homeworks });
		}
	}

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

	async function onCheckedChange(checked: any, homeworkId: number) {
		await dataService.setHomeworkDone(homeworkId, checked);

		homeworks = homeworks.map((it) => (it.id === homeworkId ? { ...it, done: checked } : it));

		homeworkStore.update((map) => map.set(homeworkId, { ...map.get(homeworkId)!, done: checked }));
	}

	// $: allSame = homeworks.every((it) => it.due_to == homeworks[0].due_to);
</script>

<div
	class="relative rounded-md border-b-2 p-8 outline-none outline-1 outline-accent-foreground transition active:scale-95 dark:outline-accent"
	style="border-bottom-color: {color};"
	on:click={onClick}
	on:contextmenu|preventDefault={onContextMenu}
	role="button"
	tabindex="0"
	in:receive={{ key: id }}
	out:send={{ key: id }}
>
	{#if homeworks.length === 0}
		<div
			class="absolute start-0 top-0 h-full w-full rounded-md bg-gray-200/70 dark:bg-gray-900/70"
		></div>
		<div class="flex items-center">
			<h3 class="flex-1 scroll-m-20 text-xl font-semibold tracking-tight">{name}</h3>
			<p>{$t('homework.card.no-homework')}</p>
		</div>
	{:else}
		<div class="flex items-center">
			<h3 class="flex-1 scroll-m-20 text-xl font-semibold tracking-tight">{name}</h3>
			{#if homeworks[0].due_to && homeworks.length === 1}
				<p>{getLabel(homeworks[0].due_to)}</p>
			{/if}
		</div>
		<ul class="ml-5 mt-3 list-disc">
			{#each homeworks as homework}
				<li class="w-full" class:line-through={homework.done} class:opacity-50={homework.done}>
					<div class="flex w-full">
						{homework.desc}

						<div class="flex flex-1 items-center justify-end text-end">
							{#if homeworks.length !== 1 && homework.due_to}
								<span class="mr-4">{getLabel(homework.due_to)}</span>
							{/if}
						</div>

						<div class="translate-y-0.5" role="none" on:click={(e) => e.stopImmediatePropagation()}>
							<Checkbox
								onCheckedChange={(checked) => onCheckedChange(checked, homework.id)}
								checked={homework.done}
							></Checkbox>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
