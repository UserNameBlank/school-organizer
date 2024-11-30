<script lang="ts">
	let x: number = $state(0);
	let y: number = $state(0);
	let hue: number = $state(0);

	interface Props {
		color?: string;
		onValueChange?: (color: string) => void;
	}

	let { color = $bindable('#ffffff'), onValueChange }: Props = $props();

	function updateColor(rgb: { r: number; g: number; b: number }) {
		color = rgbToHex(rgb);
		onValueChange?.(color);
	}

	function clamp(value: number, min: number, max: number) {
		return Math.max(Math.min(value, max), min);
	}

	function hsvToRgb(hsv: { h: number; s: number; v: number }) {
		const saturation = hsv.s / 100;
		const value = hsv.v / 100;
		let chroma = saturation * value;
		const hueBy60 = hsv.h / 60;
		let x = chroma * (1 - Math.abs((hueBy60 % 2) - 1));
		const m = value - chroma;
		chroma = chroma + m;
		x = x + m;
		const index = Math.floor(hueBy60) % 6;
		const red = [chroma, x, m, m, x, chroma][index];
		const green = [x, chroma, chroma, x, m, m][index];
		const blue = [m, m, x, chroma, chroma, x][index];
		const r = Math.round(red * 255);
		const g = Math.round(green * 255);
		const b = Math.round(blue * 255);
		return { r, g, b };
	}

	function rgbToHex(rgb: { r: number; g: number; b: number }) {
		return (
			'#' +
			[rgb.r, rgb.g, rgb.b].map((n) => clamp(n, 0, 255).toString(16).padStart(2, '0')).join('')
		);
	}

	function colorpicker(node: HTMLElement) {
		function updatePosition(event: MouseEvent | TouchEvent) {
			const { pageX, pageY } = event instanceof MouseEvent ? event : event.changedTouches[0];
			const { left, top, width, height } = node.getBoundingClientRect();
			x = clamp((pageX - left - window.scrollX) / width, 0, 1) * 100;
			y = clamp((pageY - top - window.scrollY) / height, 0, 1) * 100;
		}
		function handleCursorMove(event: MouseEvent | TouchEvent) {
			updatePosition(event);
		}
		function preventClick(event: MouseEvent) {
			event.preventDefault();
			event.stopPropagation();
		}
		function handleCursorStartMove(event: MouseEvent | TouchEvent) {
			document.addEventListener('mousemove', handleCursorMove);
			document.addEventListener('touchmove', handleCursorMove);
			document.addEventListener('mouseup', handleCursorEndMove);
			document.addEventListener('touchend', handleCursorEndMove);
			document.addEventListener('click', preventClick, { capture: true });
			updatePosition(event);
			event.preventDefault();
		}
		function handleCursorEndMove() {
			document.removeEventListener('mousemove', handleCursorMove);
			document.removeEventListener('touchmove', handleCursorMove);
			document.removeEventListener('mouseup', handleCursorEndMove);
			document.removeEventListener('touchend', handleCursorEndMove);
			setTimeout(() => {
				document.removeEventListener('click', preventClick, { capture: true });
			}, 0);
		}

		node.addEventListener('mousedown', handleCursorStartMove);
		node.addEventListener('touchstart', handleCursorStartMove);

		return {
			destroy() {
				handleCursorEndMove();
				node.removeEventListener('mousedown', handleCursorStartMove);
				node.removeEventListener('touchstart', handleCursorStartMove);
			}
		};
	}

	$effect(() => {
		updateColor(hsvToRgb({ h: hue, s: x, v: 100 - y }));
	});
</script>

<div style="--current-hue: {hue}; --current-color: {color};" class="grid gap-4 rounded-md p-4">
	<div
		class="color-display flex h-10 w-full items-center justify-center rounded-md border-[1px] border-accent"
	>
		<p class="text-lg text-white mix-blend-difference">{color}</p>
	</div>
	<div class="picker relative h-56 w-56 rounded-md border-[1px] border-accent" use:colorpicker>
		<div
			class="marker relative h-3 w-3 rounded-full border-[1px] border-white"
			style="top: {y}%; left: {x}%; transform: translate(-50%, -50%)"
		></div>
	</div>
	<div class="hue w-full">
		<input class="hue-input w-full" step="1" type="range" min="0" max="360" bind:value={hue} />
	</div>
</div>

<style>
	.color-display {
		background-color: var(--current-color);
	}

	.picker {
		background-image: linear-gradient(rgba(0, 0, 0, 0), #000),
			linear-gradient(90deg, #fff, hsla(var(--current-hue), 100%, 50%));
	}

	.marker {
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	}

	.hue {
		background: linear-gradient(
			to right,
			red 0,
			#ff0 16.66%,
			#0f0 33.33%,
			#0ff 50%,
			#00f 66.66%,
			#f0f 83.33%,
			red 100%
		);
		@apply relative h-2 rounded-full;
	}

	.hue-input {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		position: absolute;
		top: -60%;
	}

	.hue-input::-moz-range-track {
		background: transparent;
	}

	.hue-input::-moz-range-thumb {
		background-color: hsla(var(--current-hue), 100%, 50%);
		border-radius: 100%;
		border-width: 2px;
		width: 14px;
		height: 14px;
		border-color: white;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	}

	.hue-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;

		background-color: hsla(var(--current-hue), 100%, 50%);
		/* outline: white solid 2px; */
		border-color: white;
		border-radius: 100%;
		border-width: 2px;
		border-style: solid;
		width: 18px;
		height: 18px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	}
</style>
