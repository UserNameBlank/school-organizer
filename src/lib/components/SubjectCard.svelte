<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let id: number;
	export let name: string;
	export let color: string;

	function onEdit() {
		dispatch('edit', { id });
	}
</script>

<div
	transition:slide
	on:contextmenu|preventDefault={onEdit}
	class="transition delay-200 active:scale-95"
>
	<Card.Root>
		<Card.Header class="flex flex-row items-center">
			<Card.Title class="flex-1">{name}</Card.Title>
			<div
				style="background-color: {color};"
				class="aspect-square w-8 translate-y-[-2px] rounded-full border-2 border-background"
			></div>
		</Card.Header>
	</Card.Root>
</div>
