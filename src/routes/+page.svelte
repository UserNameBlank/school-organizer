<script lang="ts">
	import { t } from 'svelte-i18n';
	import { currentTab } from '$lib/stores';

	// The `$:` is to make sure svelte loads the title correctly after the locale is changed
	$: $currentTab = $t('titles.home');
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-10">
	<h1>Work in progress.</h1>
</div>
