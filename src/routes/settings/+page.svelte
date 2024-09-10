<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { Import } from 'lucide-svelte';
	import { FilePicker } from '@capawesome/capacitor-file-picker';
	import { Preferences } from '@capacitor/preferences';
	import type { Subject } from '$lib/Subject';
	import { dataService } from '$lib/database';
	import { t, locales, locale } from 'svelte-i18n';
	import {
		currentTab,
		subjects,
		timetable,
		showNotifications,
		notificationTime
	} from '$lib/stores';

	// import { Capacitor } from '@capacitor/core';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import Timepicker from '$lib/components/ui/timepicker/timepicker.svelte';
	import { fly } from 'svelte/transition';
	// const platform = Capacitor.getPlatform();

	$: $currentTab = $t('titles.settings');

	async function importContent() {
		let result = await FilePicker.pickFiles({
			types: ['application/json'],
			limit: 1,
			readData: true
		});

		if (result.files[0]) {
			const content = atob(result.files[0].data!);
			const json = JSON.parse(content);

			const tita = json.timetable as number[];
			const subs = json.subjects as Subject[];
			const idMap = new Map<number, number>();

			for (const subject of subs) {
				const { id } = await dataService.addSubject(subject);
				idMap.set(subject.id, id);
				subject.id = id;
				// $subjects = [...$subjects, subject];
				$subjects.set(id, subject);
			}

			for (let i = 0; i < tita.length; i++) {
				const subjectId = tita[i];
				if (subjectId === null) {
					continue;
				}

				const realId = idMap.get(subjectId)!;
				dataService.setTimetableSlot({ id: i, subjectId: realId });
				$timetable[i] = $subjects.get(realId)!;
			}
		}
	}

	async function exportContent() {
		let obj = {
			subjects: $subjects,
			timetable: $timetable.map((it) => it?.id)
		};

		let content = JSON.stringify(obj);
		let blob = new Blob([content], { type: 'application/json' });

		// @ts-expect-error
		if (window.showSaveFilePicker) {
			// @ts-expect-error
			const handler = await window.showSaveFilePicker({
				suggestedName: 'content.json',
				types: [
					{
						description: 'json file',
						accept: { 'text/plain': ['.json'] }
					}
				]
			});
			await handler.createWritable().write([blob]);
		} else {
			let url = URL.createObjectURL(blob);
			let anchor = document.createElement('a');
			anchor.href = url;
			anchor.download = 'content.json';
			anchor.click();
			URL.revokeObjectURL(url);
			anchor.remove();
		}
	}

	// async function saveContent() {
	// 	await dataService.saveToStore();
	// }

	async function onLanguageSelectedChanged(selected: any) {
		$locale = selected.value;

		await Preferences.set({ key: 'language', value: selected.value });
	}

	async function onShowNotificationsChanged(checked: boolean) {
		$showNotifications = checked;

		await Preferences.set({ key: 'show-notifications', value: checked.toString() });
		dataService.setNotificationOptions({ allow: checked, time: $notificationTime });
	}

	async function onTimeChanged(time: string) {
		$notificationTime = time;

		await Preferences.set({ key: 'notification-time', value: time });
		dataService.setNotificationOptions({ allow: $showNotifications, time: time });
	}
</script>

<div class="grid w-full gap-6 px-16 py-10">
	<Button on:click={importContent} variant="outline" class="p-5 font-semibold"
		><Import class="mr-3" size={20} />{$t('settings.import-content')}
	</Button>

	<Button on:click={exportContent} variant="outline" class="p-5"
		>{$t('settings.export-content')}</Button
	>

	<!-- {#if platform === 'web'} -->
	<!-- 	<Button on:click={saveContent} variant="outline" class="p-5" -->
	<!-- 		>{$t('settings.save-to-webstore')}</Button -->
	<!-- 	> -->
	<!-- {/if} -->

	<div class="grid gap-2">
		<Label for="select">{$t('settings.language')}</Label>
		<Select.Root
			selected={{
				label: $t('settings.languages.' + $locale?.split('-')[0]),
				value: $locale
			}}
			onSelectedChange={onLanguageSelectedChanged}
		>
			<Select.Trigger id="select">
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				{#each $locales as l}
					<Select.Item value={l}>{$t('settings.languages.' + l)}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<div class="grid gap-4">
		<Label for="notifications">{$t('settings.notifications-label')}</Label>
		<div id="notifications" class="grid gap-3 px-4">
			<div class="flex flex-row items-center">
				<p class="flex-1">{$t('settings.notifications.switch-label')}</p>
				<Switch checked={$showNotifications} onCheckedChange={onShowNotificationsChanged} />
			</div>
			{#if $showNotifications}
				<div transition:fly={{ y: -10 }} class="flex flex-row items-center">
					<p class="flex-1">{$t('settings.notifications.time-label')}</p>
					<Timepicker time={$notificationTime} onSubmit={onTimeChanged} />
				</div>
			{/if}
		</div>
	</div>
</div>
