<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { Import } from 'lucide-svelte';
	import { Preferences } from '$lib/preferences';
	import { dataService } from '$lib/database';
	import { t, locales, locale } from 'svelte-i18n';

	import { Capacitor } from '@capacitor/core';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import Timepicker from '$lib/components/ui/timepicker/timepicker.svelte';
	import { fly } from 'svelte/transition';
	import type { DatabaseWeb } from '$lib/database/web';
	import { setMode } from 'mode-watcher';
	import { globalState } from '$lib/state.svelte';
	const platform = Capacitor.getPlatform();

	$effect(() => {
		globalState.currentTab = $t('titles.settings');
	});

	async function importContent() {
		dataService.importContent();
	}

	async function exportContent() {
		dataService.exportContent();
	}

	async function saveContent() {
		const database = dataService as DatabaseWeb;
		database.exportToStorage();
	}

	function onLanguageSelectedChanged(selected: string) {
		$locale = selected;

		Preferences.setString({ key: 'language', value: selected });
	}

	async function onShowNotificationsChanged(checked: boolean) {
		try {
			await dataService.setNotificationOptions({
				allow: checked,
				time: globalState.notificationTime,
				interval: globalState.notificationInterval
			});

			globalState.showNotifications = checked;
			Preferences.setString({ key: 'show-notifications', value: checked.toString() });
		} catch {
			globalState.showNotifications = false;
		}
	}

	async function onTimeChanged(time: string) {
		await dataService.setNotificationOptions({
			allow: globalState.showNotifications,
			time: time,
			interval: globalState.notificationInterval
		});

		globalState.notificationTime = time;
		Preferences.setString({ key: 'notification-time', value: time });
	}

	async function onIntervalChanged(selected: string) {
		const selectedNumber = parseInt(selected)
		await dataService.setNotificationOptions({
			allow: globalState.showNotifications,
			time: globalState.notificationTime,
			interval: selectedNumber
		});

		globalState.notificationInterval = selectedNumber;
		Preferences.setLong({ key: 'notification-interval', value: selectedNumber });
	}

	const intervalTimes = new Map<number, string>([
		[86400000, $t('settings.notification-intervals.one')],
		[43200000, $t('settings.notification-intervals.two')],
		[21600000, $t('settings.notification-intervals.three')]
	]);

	function onThemeSelected(selected: string) {
		globalState.globalTheme = selected;
		Preferences.setString({ key: 'theme', value: selected });
		setMode(selected as any);
	}

	const languageTriggerContent = $derived($t('settings.languages.' + $locale));

	const themeTriggerContent = $derived($t('settings.themes.' + globalState.globalTheme));

	let intervalTriggerContent = $derived(intervalTimes.get(globalState.notificationInterval));

	const themeSettings = ['system', 'dark', 'light'];
</script>

<div class="grid w-full gap-6 overflow-y-auto px-8 py-10">
	<div class="grid gap-4 px-3">
		<Button onclick={importContent} variant="outline" class="p-5 font-semibold"
			><Import class="mr-3" size={20} />{$t('settings.import-content')}
		</Button>

		<Button onclick={exportContent} variant="outline" class="p-5"
			>{$t('settings.export-content')}</Button
		>

		{#if platform === 'web'}
			<Button onclick={saveContent} variant="outline" class="mt-6 p-5"
				>{$t('settings.save-to-webstore')}</Button
			>
		{/if}
	</div>

	<div class="grid gap-2">
		<Label for="select" class="text-lg">{$t('settings.general')}</Label>
		<div class="grid gap-2 px-2">
			<Select.Root
				type="single"
				allowDeselect={false}
				onValueChange={onLanguageSelectedChanged}
			>
				<div class="flex flex-row items-center">
					<p class="flex-1">{$t('settings.language')}</p>
					<Select.Trigger class="w-1/2" id="select">{languageTriggerContent}</Select.Trigger>
				</div>
				<Select.Content>
					{#each $locales as l}
						<Select.Item value={l} label={$t('settings.languages.' + l)}
							>{$t('settings.languages.' + l)}</Select.Item
						>
					{/each}
				</Select.Content>
			</Select.Root>
			<Select.Root
				type="single"
				allowDeselect={false}
				onValueChange={onThemeSelected}
			>
				<div class="flex flex-row items-center">
					<p class="flex-1">{$t('settings.theme-label')}</p>
					<Select.Trigger class="w-1/2" id="select">
						{themeTriggerContent}
					</Select.Trigger>
				</div>
				<Select.Content>
					{#each themeSettings as theme}
						<Select.Item value={theme} label={$t('settings.themes.' + theme)}
							>{$t('settings.themes.' + theme)}</Select.Item
						>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	</div>

	<div class="grid gap-4">
		<Label for="notifications" class="text-lg">{$t('settings.notifications-label')}</Label>
		<div id="notifications" class="grid gap-3 px-2">
			<div class="flex flex-row items-center">
				<p class="flex-1">{$t('settings.notifications.switch-label')}</p>
				<Switch bind:checked={globalState.showNotifications} onCheckedChange={onShowNotificationsChanged} />
			</div>
			{#if globalState.showNotifications}
				<div transition:fly={{ y: -10 }} class="grid gap-3">
					<div class="flex flex-row items-center">
						<p class="flex-1">{$t('settings.notifications.time-label')}</p>
						<Timepicker time={globalState.notificationTime} onSubmit={onTimeChanged} />
					</div>
					<div class="flex flex-row items-center">
						<p class="flex-1">Interval</p>
						<Select.Root
							type="single"
							onValueChange={onIntervalChanged}
						>
							<Select.Trigger class="w-48">
								{intervalTriggerContent}
							</Select.Trigger>
							<Select.Content>
								{#each intervalTimes as [key, value]}
									<Select.Item value={key.toString()} label={value}>{value}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
