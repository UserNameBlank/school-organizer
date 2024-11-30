<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Select from '$lib/components/ui/select';
	import { Toggle } from '$lib/components/ui/toggle';
	import { Pencil, PencilOff, Plus } from 'lucide-svelte';
	import { currentTab, subjects, timetable } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import type { Subject } from '$lib/Subject';
	import { dataService } from '$lib/database';
	import { t, json } from 'svelte-i18n';

	$effect(() => {
		$currentTab = $t('titles.timetable');
	});

	let editMode = $state(false);
	let drawerOpen = $state(false);
	let currentSlot: number | null = null;
	let selectedSubject: Subject;
	let editSubject = $state(false);

	function setSlot(slot: number) {
		currentSlot = slot;
		editSubject = false;
		drawerOpen = true;
	}

	function onEditSlot(slot: number) {
		currentSlot = slot;
		editSubject = true;
		drawerOpen = true;
	}

	function clearSlot() {
		drawerOpen = false;

		$timetable[currentSlot!] = null;
		dataService.clearTimetableSlot({ id: currentSlot! });
	}

	async function submitSlot() {
		if (!selectedSubject) return;

		drawerOpen = false;

		$timetable[currentSlot!] = selectedSubject;
		dataService.setTimetableSlot({ id: currentSlot!, subjectId: selectedSubject.id });
	}

	function onSelectSubject(v: string) {
		const subject = $subjects.get(parseInt(v))!;
		selectedSubject = subject;
	}

	let days = $derived($json('timetable.days') as string[]);
</script>

<Drawer.Root bind:open={drawerOpen}>
	<div class="flex h-[1800px] min-w-[1200px] flex-col">
		<div class="sticky top-0 z-10 h-min w-full border-b-[1px] border-accent bg-background pl-20">
			<div class="flex flex-row justify-around p-4">
				{#each days as day}
					<p>{day}</p>
				{/each}
			</div>
		</div>
		<div class="flex flex-1">
			<div
				class="sticky start-0 flex w-20 flex-col items-center justify-around border-r-[1px] border-accent bg-background"
			>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">1</span> 7:50
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">2</span> 8:40
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">3</span> 9:40
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">4</span> 10:30
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">5</span> 11:30
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">6</span> 12:20
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">7</span> 13:10
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">8</span> 14:00
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">9</span> 14:45
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">10</span> 15:30
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">11</span> 16:15
				</p>
				<p class="text-sm text-accent-foreground">
					<span class="text-lg font-bold">12</span> 17:00
				</p>
			</div>
			<!-- <div class="h-min w-full flex-1"> -->
			<!-- 	<svg class="h-full w-full" viewBox="0 0 100 100"> -->
			<!-- 		{#each $timetable as subject, i} -->
			<!-- 			{#if subject} -->
			<!-- 				<rect -->
			<!-- 					rx="0.5" -->
			<!-- 					width="19" -->
			<!-- 					height="11.3333333333" -->
			<!-- 					x={0.5 + ((i % 5) / 5) * 100} -->
			<!-- 					y={0.5 + (Math.floor(i / 5) / 12) * 150} -->
			<!-- 					fill={subject.color} -->
			<!-- 				> -->
			<!-- 				</rect> -->
			<!-- 				<text -->
			<!-- 					x={10 + ((i % 5) / 5) * 100} -->
			<!-- 					text-anchor="middle" -->
			<!-- 					y={7 + (Math.floor(i / 5) / 12) * 150} -->
			<!-- 					font-size="2" -->
			<!-- 					fill="white">{subject.name}</text -->
			<!-- 				> -->
			<!-- 			{/if} -->
			<!-- 		{/each} -->
			<!-- 	</svg> -->
			<!-- </div> -->
			<div class="grid flex-1 grid-cols-5 grid-rows-12 gap-4 p-4">
				{#if editMode}
					{#each $timetable as subject, i}
						{#if subject}
							<button
								onclick={() => onEditSlot(i)}
								class="flex items-center justify-center rounded-md bg-gray-500 text-xl font-semibold active:bg-accent"
							>
								{subject.name}
							</button>
						{:else}
							<button
								onclick={() => setSlot(i)}
								class="dotted-outline flex items-center justify-center rounded-md active:bg-accent"
							>
								<Plus />
							</button>
						{/if}
					{/each}
				{:else}
					{#each $timetable as subject}
						{#if subject}
							<div
								class="flex items-center justify-center rounded-md bg-blue-500 p-4 text-xl font-semibold"
								style="background-color: {subject.color}"
							>
								{subject.name}
							</div>
						{:else}
							<div></div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<Drawer.Content>
		{#if editSubject}
			<Drawer.Header>
				<Drawer.Title>{$t('timetable.drawer.reset-slot.title')}</Drawer.Title>
				<Drawer.Description>{$t('timetable.drawer.reset-slot.subtitle')}</Drawer.Description>
			</Drawer.Header>
			<Drawer.Footer>
				<Button variant="destructive" onclick={clearSlot}
					>{$t('timetable.drawer.reset-slot.button')}</Button
				>
				<Drawer.Close>{$t('ui.cancel')}</Drawer.Close>
			</Drawer.Footer>
		{:else}
			<Select.Root type="single" onValueChange={(it) => it && onSelectSubject(it)}>
				<Drawer.Header>
					<Drawer.Title>{$t('timetable.drawer.set-slot.title')}</Drawer.Title>
					<Drawer.Description>{$t('timetable.drawer.set-slot.subtitle')}</Drawer.Description>
				</Drawer.Header>
				<div class="p-4"><Select.Trigger>Slot</Select.Trigger></div>
				<Drawer.Footer>
					<Button onclick={submitSlot}>{$t('timetable.drawer.set-slot.button')}</Button>
					<Drawer.Close>{$t('ui.cancel')}</Drawer.Close>
				</Drawer.Footer>

				<Select.Content>
					{#each $subjects.values() as subject}
						<Select.Item
							value={subject.id.toString()}
							class="flex flex-row"
							style="color: {subject.color}">{subject.name}</Select.Item
						>
					{/each}
				</Select.Content>
			</Select.Root>
		{/if}
	</Drawer.Content>
</Drawer.Root>

<Toggle
	bind:pressed={editMode}
	class="fixed bottom-8 right-8 z-30 rounded-full bg-background px-4 py-7 shadow-md"
	variant="outline"
>
	{#if editMode}
		<PencilOff />
	{:else}
		<Pencil />
	{/if}
</Toggle>

{#if editMode}
	<div
		transition:slide={{ axis: 'y' }}
		class="fixed bottom-0 left-0 right-0 bg-black/60 py-4 text-center text-xl font-semibold"
	>
		{$t('timetable.edit-label')}
	</div>
{/if}

<style>
	.dotted-outline {
		outline: 2px dotted hsl(var(--accent));
	}
</style>
