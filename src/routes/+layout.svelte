<script lang="ts">
	import '../app.css';
	import '$lib/ripple/ripple.css';
	import * as Sheet from '$lib/components/ui/sheet';
	import { ModeWatcher } from 'mode-watcher';
	import { t } from 'svelte-i18n';
	import { Home, ChartNoAxesGantt, NotebookPen, Menu, Layers, Settings } from 'lucide-svelte';
	import { loadStores } from '$lib/database';
	import { currentTab } from '$lib/stores';
	import { Toaster } from '$lib/components/ui/sonner';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	async function initData() {
		console.log('Data is being initialized...');

		loadStores();
	}

	initData();

	let open = $state(false);

	let close = () => (open = false);

	function link(node: HTMLAnchorElement) {
		function onClick() {
			close();
		}

		$effect(() => {
			node.addEventListener('click', onClick);

			return () => {
				node.removeEventListener('click', onClick);
			};
		});
	}
</script>

<ModeWatcher />

<svelte:head>
	<title>School Organizer</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
</svelte:head>

<Toaster />

<Sheet.Root bind:open>
	<div class="flex h-screen w-full flex-col">
		<div class="menu flex w-full flex-row items-center p-3">
			<Sheet.Trigger><Menu size={30} /></Sheet.Trigger>
			<h4 class="flex-1 scroll-m-20 text-center text-2xl font-semibold tracking-tight">
				{$currentTab}
			</h4>
		</div>
		<div class="flex-1 overflow-y-auto">
			{@render children?.()}
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
