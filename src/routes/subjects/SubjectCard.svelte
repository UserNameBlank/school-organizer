<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ripple } from '$lib/ripple/index.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		id: number;
		name: string;
		color: string;
		onedit: (event: { detail: { id: number } }) => void;
	}

	let { id, name, color, onedit }: Props = $props();
</script>

<button
	transition:slide
	oncontextmenu={(e) => {
		e.preventDefault();
		onedit({ detail: { id } });
		console.log('right click');
	}}
	class="rounded-md text-start transition delay-200 active:scale-95"
	use:ripple={{ inEvents: ['contextmenu'] }}
>
	<Card.Root class="pb-6">
		<Card.Header class="flex flex-row items-center">
			<Card.Title class="flex-1">{name}</Card.Title>
			<div
				style="background-color: {color};"
				class="aspect-square w-8 translate-y-[-2px] rounded-full border-2 border-background"
			></div>
		</Card.Header>
	</Card.Root>
</button>
