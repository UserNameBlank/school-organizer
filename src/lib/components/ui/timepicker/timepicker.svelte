<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';

	export let time = '17:00';
	export let onSubmit: (time: string) => any;

	let cursorPos = 0;
	let overlay = '';

	const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

	const onInput = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;

		console.log(parseFloat(e.key));

		if (isNaN(parseFloat(e.key))) {
			return;
		}

		target.value += e.key;
		overlay = overlay.substring(1);
		cursorPos++;
		if (cursorPos == 2) {
			target.value += ':';
			overlay = '00';
		}
		if (cursorPos == 4) {
			// @ts-ignore
			document.activeElement.blur();
		}
	};

	function onFocusIn(e: FocusEvent) {
		const target = e.target as HTMLInputElement;
		cursorPos = 0;
		target.value = '';
		overlay = '00:00';
	}

	function onFocusOut(e: FocusEvent) {
		const target = e.target as HTMLInputElement;
		if (regex.test(target.value)) {
			time = target.value;
			onSubmit(time);
		} else {
			target.value = time;
		}
		overlay = '';
	}

	let inputElement: HTMLInputElement;
</script>

<div class="relative">
	<p class="absolute right-4 top-0.5 text-foreground/50">{overlay}</p>
	<input
		bind:this={inputElement}
		class="w-20 rounded-md bg-background py-0.5 pl-5 outline-none outline-1 outline-accent focus:font-bold"
		type="text"
		on:keydown|preventDefault={onInput}
		on:focusin={onFocusIn}
		on:focusout={onFocusOut}
		value={time}
	/>
</div>
