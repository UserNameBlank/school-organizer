<script lang="ts">
	import {
		Menu,
		ArrowBigRightDash,
		Layers,
		Plus,
		PlusCircle,
		ChevronRight,
		ChevronLeft,
		CalendarIcon,
		X
	} from 'lucide-svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { t, locale } from 'svelte-i18n';
	import { subjects, timetable, currentTab as globalCurrentTab } from '$lib/stores';
	import timetabletimes from '$lib/timetabletimes';
	import HomeworkCard from './HomeworkCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Popover from '$lib/components/ui/popover';
	import { dataService } from '$lib/database';
	import type { Homework } from '$lib/Homework';
	import { DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import HomeworkListItem from './HomeworkListItem.svelte';
	import { ImageViewer } from 'svelte-image-viewer';

	$: $globalCurrentTab = $t('titles.homework');

	let drawerOpen = false;
	let currentId: number | null = null;
	let currentDesc = '';
	let currentImage: {
		data: string;
		uri: string;
	} | null = null;
	let editHomework = false;
	let currentHomeworks: Homework[] = [];
	let untilCounter = 1;
	let currentDate: DateValue | undefined = undefined;
	let currentTab = 'automatic';

	const dateFormatter = new DateFormatter('de-DE', { dateStyle: 'long' });

	const subCounter = () => {
		if (untilCounter > 1) untilCounter--;
	};
	const addCounter = () => untilCounter++;

	$: firstHalf = Array.from($subjects)
		.map(([_key, val]) => val)
		.filter((it) => it.homeworks.length != 0)
		.sort((a, b) => (a.homeworks[0].dueTo ?? Infinity) - (b.homeworks[0].dueTo ?? Infinity));
	$: secondHalf = Array.from($subjects)
		.map(([_key, val]) => val)
		.filter((it) => it.homeworks.length == 0);

	function onAddHomework(event: { detail: { id: number } }) {
		editHomework = false;
		currentId = event.detail.id;
		untilCounter = 1;
		currentDate = undefined;
		currentImage = null;
		currentTab = 'automatic';
		drawerOpen = true;
	}

	function onEditHomework(event: { detail: { id: number; homeworks: Homework[] } }) {
		currentHomeworks = event.detail.homeworks;
		editHomework = true;
		currentId = event.detail.id;
		drawerOpen = true;
	}

	function removeHomework(hw: Homework) {
		currentHomeworks = currentHomeworks.filter((it) => it.id !== hw.id);
		dataService.removeHomework({ id: hw.id });

		subjects.update((map) => {
			let sub = map.get(hw.subjectId)!;
			sub.homeworks = currentHomeworks;
			map.set(sub.id, sub);
			return map;
		});
	}

	function getDueDate(): Date | null {
		const date = new Date();
		let day = date.getDay();
		if (day === 0) day = 7; // Why javascript, why?

		const until = untilCounter;

		for (let wd = 0; wd < 7 * until; wd++) {
			const k = (wd + day) % 7;

			if (k > 4) {
				continue;
			}

			for (let lh = 0; lh < 12; lh++) {
				const slot = lh * 5 + k;

				const slotId = $timetable[slot]?.id;
				if (slotId !== null && slotId === currentId) {
					if (untilCounter > 1) {
						untilCounter--;
						continue;
					}

					date.setDate(date.getDate() + wd + 1);
					const time = timetabletimes[lh];
					date.setHours(time[0], time[1], 0, 0);
					return date;
				}
			}
		}

		return null;
	}

	async function onSubmitHomework() {
		if (currentId === null) return;
		drawerOpen = false;

		let date = null;
		if (currentTab == 'manual') {
			if (currentDate === undefined) {
				return;
			} else {
				date = currentDate.toDate(getLocalTimeZone());
			}
		} else {
			date = getDueDate();
		}

		const homework: Homework = {
			id: 0,
			subjectId: currentId,
			desc: currentDesc,
			dueTo: date?.getTime() ?? null,
			done: false,
			image: currentImage?.uri ?? null
		};
		const { id, image } = await dataService.addHomework(homework);
		homework.id = id;
		homework.image = image;

		currentDesc = '';

		subjects.update((map) => {
			map.get(homework.subjectId)!.homeworks.push(homework);
			return map;
		});
	}

	async function pickImage() {
		currentImage = await dataService.pickImage();
	}

	let showingImage = false;
	let imageToShow: string | null = null;

	function showImage(e: CustomEvent<{ image: string }>) {
		imageToShow = e.detail.image;
		showingImage = true;
	}

	function closeImage() {
		showingImage = false;
		imageToShow = null;
	}
</script>

{#if showingImage && imageToShow !== null}
	<div class="absolute bottom-0 left-0 right-0 top-0 z-[55] bg-black/30 backdrop-blur-sm">
		<ImageViewer src={imageToShow} />
	</div>
	<Button
		on:click={closeImage}
		variant="ghost"
		size="icon"
		class="absolute right-4 top-4 z-[56] h-20 w-20 rounded-full"
	>
		<X size={40} />
	</Button>
{/if}

<Drawer.Root bind:open={drawerOpen}>
	{#if $subjects.size === 0}
		<div class="mt-40 grid w-full items-center justify-center gap-4">
			<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
				{$t('homework.no-subjects.title')}
			</h3>
			<p>{$t('homework.no-subjects.subtitle')}</p>
			<div class="flex w-full items-center justify-evenly">
				<Menu />
				<ArrowBigRightDash size={18} />
				<div class="flex"><Layers class="mr-3" />{$t('titles.subjects')}</div>
				<ArrowBigRightDash size={18} />
				<div class="flex rounded-md border-[1px] border-accent px-1">
					<Plus />{$t('subjects.new-subject')}
				</div>
			</div>
		</div>
	{:else}
		<div class="flex flex-col gap-4 p-4">
			{#each firstHalf as subject (subject.id)}
				<HomeworkCard
					id={subject.id}
					name={subject.name}
					color={subject.color}
					homeworks={subject.homeworks}
					on:addHomework={onAddHomework}
					on:editHomework={onEditHomework}
					on:showImage={showImage}
				/>
			{/each}
			{#each secondHalf as subject (subject.id)}
				<HomeworkCard
					id={subject.id}
					name={subject.name}
					color={subject.color}
					homeworks={subject.homeworks}
					on:addHomework={onAddHomework}
				/>
			{/each}
		</div>
	{/if}
	<Drawer.Content>
		{#if editHomework}
			<Drawer.Header>
				<Drawer.Title>{$t('homework.drawer.edit-homework.title')}</Drawer.Title>
			</Drawer.Header>
			<div class="mt-10 grid w-full gap-4 px-4">
				{#each currentHomeworks as homework (homework.id)}
					<HomeworkListItem {homework} on:remove={(e) => removeHomework(e.detail.homework)} />
				{/each}
			</div>
			<Drawer.Footer class="mt-10 pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>{$t('ui.cancel')}</Button>
				</Drawer.Close>
			</Drawer.Footer>
		{:else}
			<Drawer.Header>
				<Drawer.Title>{$t('homework.drawer.add-homework.title')}</Drawer.Title>
			</Drawer.Header>
			<form class="grid items-start gap-6 px-4" on:submit|preventDefault={onSubmitHomework}>
				<div class="grid gap-2">
					<Label for="name">{$t('homework.drawer.add-homework.desc-label')}</Label>
					<Input autocomplete="off" type="text" id="name" bind:value={currentDesc} />

					{#if currentImage == null}
						<Button variant="secondary" class="mt-2" on:click={pickImage}>
							<PlusCircle class="mr-2" />
							{$t('homework.drawer.add-homework.pick-image')}
						</Button>
					{:else}
						<div class="flex items-center justify-center">
							<div class="h-44">
								<img
									src={currentImage.data}
									alt="Homework"
									class="h-full w-full rounded-md object-cover"
								/>
							</div>
						</div>
					{/if}
				</div>
				<Tabs.Root bind:value={currentTab}>
					<Tabs.List class="grid w-full grid-cols-2">
						<Tabs.Trigger value="automatic"
							>{$t('homework.drawer.add-homework.tabs.automatic')}</Tabs.Trigger
						>
						<Tabs.Trigger value="manual"
							>{$t('homework.drawer.add-homework.tabs.manual')}</Tabs.Trigger
						>
					</Tabs.List>
					<Tabs.Content value="automatic">
						<div class="flex items-center">
							<Button on:click={subCounter} variant="outline" class="aspect-square rounded-full p-0"
								><ChevronLeft /></Button
							>
							<p class="flex-1 text-center">
								{$t('homework.drawer.add-homework.lessons-label', {
									values: { count: untilCounter }
								})}
							</p>
							<Button on:click={addCounter} variant="outline" class="aspect-square rounded-full p-0"
								><ChevronRight /></Button
							>
						</div>
					</Tabs.Content>
					<Tabs.Content value="manual">
						<Popover.Root openFocus>
							<Popover.Trigger asChild let:builder>
								<Button
									variant="outline"
									builders={[builder]}
									class="flex w-full text-center font-normal {currentDate === undefined
										? 'text-muted-foreground'
										: ''}"
								>
									<CalendarIcon class="mr-2 h-4 w-4" />
									<span class="flex-1"
										>{currentDate
											? dateFormatter.format(currentDate.toDate(getLocalTimeZone()))
											: $t('homework.drawer.add-homework.pick-date')}</span
									>
								</Button>
							</Popover.Trigger>
							<Popover.Content>
								<Calendar
									bind:value={currentDate}
									initialFocus
									minValue={today(getLocalTimeZone())}
									locale={$locale ?? 'en'}
								/>
							</Popover.Content>
						</Popover.Root>
					</Tabs.Content>
				</Tabs.Root>
				<Button type="submit" class="mt-8">{$t('ui.add')}</Button>
			</form>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>{$t('ui.cancel')}</Button>
				</Drawer.Close>
			</Drawer.Footer>
		{/if}
	</Drawer.Content>
</Drawer.Root>
