<script lang="ts">
	import '../app.css';

	import * as Sheet from '$lib/components/ui/sheet';

	import { ModeWatcher } from 'mode-watcher';
	import { t } from 'svelte-i18n';

	import { Home, ChartNoAxesGantt, NotebookPen, Menu, Layers, Settings } from 'lucide-svelte';
	// import { Capacitor } from '@capacitor/core';

	import { dataService } from '$lib/database';

	// import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
	import { currentTab, homeworks, subjects, timetable } from '$lib/stores';
	import type { Subject } from '$lib/Subject';
	import type { Homework } from '$lib/Homework';

	// const platform = Capacitor.getPlatform();

	async function initData() {
		console.log('Data is being initialized...');

		// await dataService.init();

		const subs = (await dataService.getSubjects()).subjects;
		subjects.set(
			subs.reduce((map, sub) => {
				return map.set(sub.id, sub);
			}, new Map<number, Subject>())
		);

		// await dataService.removeOldHomework();
		const hws = (await dataService.getHomeworks()).homeworks;
		homeworks.set(
			hws.reduce((map, hw) => {
				return map.set(hw.id, { ...hw, dueTo: hw.dueTo ? new Date(hw.dueTo) : null });
			}, new Map<number, Homework>())
		);

		const slots = (await dataService.getTimetableSlots()).slots;

		for (const slot of slots) {
			$timetable[slot.id] = $subjects.get(slot.subjectId)!;
		}
	}

	initData();
	// if (typeof window !== 'undefined') {
	// 	jeepSqlite(window);
	//
	// 	if (platform === 'web') {
	// 		const jeepEl = document.createElement('jeep-sqlite');
	// 		document.body.appendChild(jeepEl);
	// 		customElements.whenDefined('jeep-sqlite').then(async () => await initData());
	// 	} else {
	// 		initData();
	// 	}
	// } else {
	// 	initData();
	// }

	let open = false;

	let close = () => (open = false);
	// $: currentTab = $t('titles.home');

	function link(node: HTMLAnchorElement) {
		function onClick() {
			close();

			// currentTab = node.textContent as string;
		}

		node.addEventListener('click', onClick);

		return {
			destroy: () => {
				node.removeEventListener('click', onClick);
			}
		};
	}
</script>

<ModeWatcher />

<svelte:head>
	<title>School Organizer</title>
</svelte:head>

<Sheet.Root bind:open>
	<div class="flex h-screen w-full flex-col">
		<div class="menu flex w-full flex-row items-center p-3">
			<Sheet.Trigger><Menu size={30} /></Sheet.Trigger>
			<h4 class="flex-1 scroll-m-20 text-center text-2xl font-semibold tracking-tight">
				{$currentTab}
			</h4>
		</div>
		<div class="flex-1 overflow-y-auto">
			<slot />
		</div>
	</div>
	<Sheet.Content side="left" class="w-[250px]">
		<ul class="list mt-20 text-xl font-semibold tracking-tight">
			<li><a href="/" use:link><Home class="mr-3" />{$t('titles.home')}</a></li>
			<li>
				<a href="/timetable" use:link><ChartNoAxesGantt class="mr-3" />{$t('titles.timetable')}</a>
			</li>
			<li>
				<a href="/homework" use:link><NotebookPen class="mr-3" />{$t('titles.homework')}</a>
			</li>
			<li><a href="/subjects" use:link><Layers class="mr-3" />{$t('titles.subjects')}</a></li>
			<li><a href="/settings" use:link><Settings class="mr-3" />{$t('titles.settings')}</a></li>
		</ul>
	</Sheet.Content>
</Sheet.Root>

<style>
	.list li {
		@apply cursor-pointer select-none rounded-md;
	}

	.list a {
		@apply flex items-center p-4;
	}

	.list li:active {
		background-color: hsl(var(--accent) / 0.8);
	}

	.menu {
		border-bottom: 1px solid hsl(var(--accent));
		@apply shadow-lg;
	}
</style>
