<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Homework } from '$lib/Homework';
	import { Trash } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		homework: Homework;
		onremove: (homework: Homework) => void;
	}

	let { homework, onremove }: Props = $props();
</script>

<div
	transition:fly={{ duration: 300, x: -300 }}
	class="flex h-10 w-full flex-row items-center text-lg"
>
	<!-- {#if edit} -->
	<!-- 	<div class="w-full px-10" in:fade={{}}> -->
	<!-- 		<Input autofocus bind:value={homework.desc} on:focusout={onFocusOut} /> -->
	<!-- 	</div> -->
	<!-- {:else} -->
	<p transition:fly={{ duration: 300, x: -300 }} class="h-full flex-1 text-start">
		{homework.desc}
	</p>
	<!-- <div -->
	<!-- 	class="absolute right-0 top-0 grid w-max grid-cols-2 gap-1" -->
	<!-- 	transition:fly={{ duration: 300, x: 300 }} -->
	<!-- > -->
	<!-- <Button variant="outline" size="icon" on:click={onEdit}><Pencil size={20} /></Button> -->
	<Button variant="outline" size="icon" onclick={() => onremove(homework)}
		><Trash size={20} /></Button
	>
	<!-- </div> -->
	<!-- {/if} -->
</div>
