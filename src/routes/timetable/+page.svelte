<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Select from '$lib/components/ui/select';
	import { Toggle } from '$lib/components/ui/toggle';
	import { Pencil, PencilOff, Plus } from 'lucide-svelte';
	import { subjects, timetable } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import type { Subject } from '$lib/Subject';
	import { dataService } from '$lib/database';
	import { t, json } from 'svelte-i18n';

	let editMode = false;
	let drawerOpen = false;
	let currentSlot: number | null = null;
	let selectedSubject: Subject;
	let editSubject = false;

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
		dataService.clearSlot(currentSlot!);
	}

	async function submitSlot() {
		if (!selectedSubject) return;

		drawerOpen = false;

		$timetable[currentSlot!] = selectedSubject;
		dataService.setSlot(currentSlot!, selectedSubject.id);
	}

	function onSelectSubject(v: unknown) {
		selectedSubject = (v as { value: Subject }).value;
	}
</script>

<Drawer.Root bind:open={drawerOpen}>
	<div class="flex min-w-[1200px] flex-col">
		<div class="sticky top-0 z-10 h-min w-full border-b-[1px] border-accent bg-background pl-20">
			<div class="flex flex-row justify-around p-4">
				{#each $json('timetable.days') as day}
					<p>{day}</p>
				{/each}
			</div>
		</div>
		<div class="flex flex-1">
			<div
				class="sticky start-0 flex h-full w-20 flex-col items-center gap-28 border-r-[1px] border-accent bg-background py-14"
			>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">1</span> 7:50</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">2</span> 8:40</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">3</span> 9:40</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">4</span> 10:30</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">5</span> 11:30</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">6</span> 12:20</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">7</span> 13:10</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">8</span> 14:00</p>
				<p class="text-sm text-accent-foreground"><span class="text-lg font-bold">9</span> 14:45</p>
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
			<div class="grid flex-1 grid-cols-5 grid-rows-12 gap-4 p-4">
				{#if editMode}
					{#each $timetable as subject, i}
						{#if subject}
							<div
								on:click={() => onEditSlot(i)}
								class="flex items-center justify-center rounded-md bg-blue-500 bg-gray-500 text-xl font-semibold active:bg-accent"
							>
								{subject.name}
							</div>
						{:else}
							<div
								on:click={() => setSlot(i)}
								class="flex items-center justify-center rounded-md outline-dashed outline-[1px] outline-accent active:bg-accent"
							>
								<Plus />
							</div>
						{/if}
					{/each}
				{:else}
					{#each $timetable as subject}
						{#if subject}
							<div
								class="flex items-center justify-center rounded-md bg-blue-500 text-xl font-semibold"
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
				<Button variant="destructive" on:click={clearSlot}
					>{$t('timetable.drawer.reset-slot.button')}</Button
				>
				<Drawer.Close>{$t('ui.cancel')}</Drawer.Close>
			</Drawer.Footer>
		{:else}
			<Select.Root onSelectedChange={(it) => it && onSelectSubject(it)}>
				<Drawer.Header>
					<Drawer.Title>{$t('timetable.drawer.set-slot.title')}</Drawer.Title>
					<Drawer.Description>{$t('timetable.drawer.set-slot.subtitle')}</Drawer.Description>
				</Drawer.Header>
				<div class="p-4"><Select.Trigger><Select.Value /></Select.Trigger></div>
				<Drawer.Footer>
					<Button on:click={submitSlot}>{$t('timetable.drawer.set-slot.button')}</Button>
					<Drawer.Close>{$t('ui.cancel')}</Drawer.Close>
				</Drawer.Footer>

				<Select.Content>
					{#each $subjects.values() as subject}
						<Select.Item value={subject} class="flex flex-row" style="color: {subject.color}"
							>{subject.name}</Select.Item
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
	.grid-bg {
		background-size: 200px 200px;
		background-image: linear-gradient(to right, grey 1px, transparent 1px),
			linear-gradient(to bottom, grey 1px, transparent 1px);
	}
</style>
