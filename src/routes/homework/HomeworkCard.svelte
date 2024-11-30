<script lang="ts">
	import type { Homework } from '$lib/Homework';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { dataService } from '$lib/database';

	import { t } from 'svelte-i18n';

	import { send, receive } from '$lib/transition';
	import { subjects } from '$lib/stores';
	import { cn, getTimeLabel } from '$lib/utils';
	import { ripple } from '$lib/ripple/index.svelte';

	interface Props {
		id: number;
		name: string;
		color: string;
		homeworks: Homework[];
		addHomework?: (event: { detail: { id: number } }) => void;
		editHomework?: (event: { detail: { id: number; homeworks: Homework[] } }) => void;
		showImage?: (event: { detail: { image: string } }) => void;
	}

	let {
		id,
		name,
		color,
		homeworks = $bindable(),
		addHomework,
		editHomework,
		showImage
	}: Props = $props();

	function onClick() {
		addHomework?.({ detail: { id } });
	}

	function onContextMenu(e: Event) {
		e.preventDefault();
		if (homeworks.length > 0) {
			editHomework?.({ detail: { id, homeworks } });
		}
	}

	async function onCheckedChange(checked: any, homeworkId: number) {
		dataService.setHomeworkDone({ id: homeworkId, done: checked });

		homeworks = homeworks.map((it) => (it.id === homeworkId ? { ...it, done: checked } : it));

		// homeworkStore.update((map) => map.set(homeworkId, { ...map.get(homeworkId)!, done: checked }));
		subjects.update((map) => {
			map.get(id)!.homeworks = homeworks;
			return map;
		});
	}

	let allSame = $derived(homeworks.every((it) => it.dueTo == homeworks[0].dueTo));
</script>

<button
	class="relative rounded-md border-b-2 p-8 text-start outline-none outline-1 outline-accent-foreground dark:outline-accent"
	style="border-bottom-color: {color};"
	onclick={onClick}
	oncontextmenu={onContextMenu}
	in:receive={{ key: id }}
	out:send={{ key: id }}
	use:ripple={{ inEvents: ['click', 'contextmenu'] }}
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
			{#if allSame && homeworks[0].dueTo}
				<p>{getTimeLabel(homeworks[0].dueTo, $t)}</p>
			{/if}
		</div>
		<ul class="ml-5 mt-3 list-disc">
			{#each homeworks as homework}
				<li class={cn('w-full', homework.done && 'line-through opacity-50')}>
					<div class="flex w-full">
						{homework.desc}

						<div class="flex flex-1 items-center justify-end text-end">
							{#if !allSame && homework.dueTo}
								<span class="mr-4">{getTimeLabel(homework.dueTo, $t)}</span>
							{/if}
						</div>

						<div class="translate-y-0.5" role="none" onclick={(e) => e.stopImmediatePropagation()}>
							<Checkbox
								onCheckedChange={(checked: boolean) => onCheckedChange(checked, homework.id)}
								checked={homework.done}
							></Checkbox>
						</div>
					</div>
					{#if !homework.done && homework.image}
						<button
							class="m-2 w-36 transition active:scale-95"
							onclick={(e) => {
								e.stopPropagation();
								showImage?.({ detail: { image: homework.image!! } });
							}}
						>
							<img class="rounded-md" src={homework.image} alt="homework" />
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</button>
