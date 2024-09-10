<script lang="ts">
	import SubjectCard from '$lib/components/SubjectCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { dataService } from '$lib/database';
	import * as Drawer from '$lib/components/ui/drawer';
	import * as Popover from '$lib/components/ui/popover';

	import { Plus } from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Colorpicker } from '$lib/components/ui/colorpicker';

	import { t } from 'svelte-i18n';
	import { currentTab, homeworks, subjects } from '$lib/stores';
	import type { Subject } from '$lib/Subject';

	$: $currentTab = $t('titles.subjects');

	let colors = [
		'#00E015',
		'#E0A100',
		'#003BE0',
		'#E0004B',
		'#50618F',
		'#7700E0',
		'#E04900',
		'#71508F',
		'#30615E',
		'#E06397',
		'#00BBE0',
		'#E0CB00',
		'#8B822E',
		'#613045',
		'#093949',
		'#f08561'
	];

	let selectedColor = 0;
	let selectedName = 'Mathe';
	let drawerOpen = false;
	let editingSubject = false;
	// let currentId: number | null = null;
	let currentSubject: Subject | null = null;

	function onChangeColor(event: { detail: { color: string } }) {
		colors[colors.length - 1] = event.detail.color;
	}

	function addColor() {
		colors = [...colors, '#ffffff'];
		selectedColor = colors.length - 1;
	}

	async function submittedNewSubject() {
		drawerOpen = false;
		const subject = { id: 0, name: selectedName, color: colors[selectedColor] };
		const { id } = await dataService.addSubject(subject);
		subject.id = id;

		subjects.update((map) => map.set(id, subject));
	}

	async function removeSubject() {
		drawerOpen = false;
		dataService.removeSubject({ id: currentSubject!.id });

		subjects.update((map) => {
			map.delete(currentSubject!.id);
			return map;
		});
		homeworks.update((map) => {
			// list.filter((it) => it.subject_id !== currentId!);

			Array.from(map)
				.filter(([_key, val]) => val.subjectId === currentSubject!.id)
				.forEach(([key, _val]) => {
					map.delete(key);
				});

			return map;
		});
	}

	async function editSubject() {
		drawerOpen = false;

		currentSubject!.name = selectedName;
		if (selectedColor !== -1) {
			currentSubject!.color = colors[selectedColor];
		}

		dataService.editSubject(currentSubject!);

		subjects.update((map) => map); // Trigger update
	}

	async function onEditSubject(event: { detail: { id: number } }) {
		editingSubject = true;

		const subject = $subjects.get(event.detail.id)!;
		currentSubject = subject;
		selectedName = subject.name;
		selectedColor = colors.indexOf(subject.color);

		drawerOpen = true;
	}

	function onSubmit() {
		if (editingSubject) {
			editSubject();
		} else {
			submittedNewSubject();
		}
	}
</script>

<Drawer.Root bind:open={drawerOpen}>
	{#if $subjects.size === 0}
		<div class="mt-40 grid w-full items-center justify-center gap-4">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
				{$t('subjects.no-subjects')}
			</h3>
			<Drawer.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" class="h-16 transition active:scale-95"
					><Plus class="mr-3" />{$t('subjects.new-subject')}</Button
				>
			</Drawer.Trigger>
		</div>
	{:else}
		<div class="flex flex-col gap-4 p-4">
			{#each $subjects.values() as subject (subject.id)}
				<SubjectCard
					id={subject.id}
					name={subject.name}
					color={subject.color}
					on:edit={onEditSubject}
				/>
			{/each}
			<Drawer.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					on:click={() => (editingSubject = false)}
					class="h-16 w-full transition active:scale-95"
					><Plus class="mr-3" />{$t('subjects.new-subject')}</Button
				>
			</Drawer.Trigger>
		</div>
	{/if}

	<Drawer.Content>
		<!-- {#if editingSubject} -->
		<!-- 	<Drawer.Header> -->
		<!-- 		<Drawer.Title>Fach bearbeiten</Drawer.Title> -->
		<!-- 		<!-- <Drawer.Description>Dies wird alle Hausaufgaben in diesem Fach löschen.</Drawer.Description> -->
		<!-- 	</Drawer.Header> -->
		<!-- 	<div class="grid items-start gap-4 px-4"> -->
		<!-- 		<div class="grid gap-2"> -->
		<!-- 			<Label for="name">Name</Label> -->
		<!-- 			<Input autocomplete="off" type="text" id="name" bind:value={selectedName} /> -->
		<!-- 		</div> -->
		<!-- 	</div> -->
		<!-- 	<Drawer.Footer> -->
		<!-- 		<Button>Speichern</Button> -->
		<!-- 		<Drawer.Close asChild let:builder> -->
		<!-- 			<Button variant="outline" builders={[builder]}>Abbrechen</Button> -->
		<!-- 		</Drawer.Close> -->
		<!-- 		<Button variant="destructive" on:click={removeSubject}>Löschen</Button> -->
		<!-- 	</Drawer.Footer> -->
		<!-- {:else} -->
		<Drawer.Header>
			{#if editingSubject}
				<Drawer.Title>{$t('subjects.drawer.edit-subjects.title')}</Drawer.Title>
			{:else}
				<Drawer.Title>{$t('subjects.drawer.new-subject.title')}</Drawer.Title>
			{/if}
		</Drawer.Header>
		<Popover.Root>
			<form class="mb-10 grid items-start gap-4 px-4" on:submit|preventDefault={onSubmit}>
				<div class="grid gap-2">
					<Label for="name">{$t('subjects.drawer.name-label')}</Label>
					<Input autocomplete="off" type="text" id="name" bind:value={selectedName} />
				</div>
				<Label class="mt-6">{$t('subjects.drawer.color-label')}</Label>
				<div class="flex flex-wrap gap-2 p-2">
					{#each colors as color, index (index)}
						<div
							style="background-color: {color};"
							class="aspect-square w-10 rounded-full border-0 border-background border-foreground"
							class:selected={index === selectedColor}
							on:click={() => (selectedColor = index)}
						></div>
					{/each}
					<Popover.Trigger asChild let:builder>
						<Button
							on:click={addColor}
							variant="outline"
							builders={[builder]}
							class="aspect-square rounded-full p-0"><Plus size={16} /></Button
						>
					</Popover.Trigger>
				</div>
			</form>
			<Popover.Content>
				<Colorpicker on:change={onChangeColor} />
			</Popover.Content>
		</Popover.Root>
		<Drawer.Footer class="pt-2">
			{#if editingSubject}
				<Button on:click={editSubject}>{$t('ui.save')}</Button>
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>{$t('ui.cancel')}</Button>
				</Drawer.Close>
				<Button variant="destructive" on:click={removeSubject}>{$t('ui.delete')}</Button>
			{:else}
				<Button on:click={submittedNewSubject}>{$t('ui.save')}</Button>
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>{$t('ui.cancel')}</Button>
				</Drawer.Close>
			{/if}
		</Drawer.Footer>
		<!-- {/if} -->
	</Drawer.Content>
</Drawer.Root>

<style>
	.selected {
		@apply border-[3px];
		transition: ease 50ms border-width;
	}
</style>
