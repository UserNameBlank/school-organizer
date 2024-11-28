import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { differenceInCalendarDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

// export function getTimeLabel(
// 	date: number,
// 	format: (_c: string, _o?: { values: { count: number } }) => string
// ): string {
// 	const millis = date - new Date().getTime();
//
// 	if (millis > 864e5) {
// 		const days = Math.floor(millis / 864e5);
// 		return format('homework.card.times.days', { values: { count: days } });
// 	} else if (millis > 36e5) {
// 		const hours = Math.floor(millis / 36e5);
// 		return format('homework.card.times.hours', { values: { count: hours } });
// 	} else if (millis > 6e4) {
// 		const minutes = Math.floor(millis / 6e4);
// 		return format('homework.card.times.minutes', { values: { count: minutes } });
// 	} else {
// 		return format('homework.card.times.expired');
// 	}
// }

export function getTimeLabel(
	d: number,
	format: (_c: string, _o?: { values: { count: number } }) => string
): string {
	const date = new Date(d);
	const days = differenceInCalendarDays(date, new Date());

	console.log(days);

	if (days > 0) {
		if (days == 1) {
			return format('homework.card.times.tomorrow');
		} else {
			return format('homework.card.times.days', { values: { count: days } });
		}
	} else {
		const millis = d - new Date().getTime();
		if (millis > 36e5) {
			const hours = Math.floor(millis / 36e5);
			return format('homework.card.times.hours', { values: { count: hours } });
		} else if (millis > 6e4) {
			const minutes = Math.floor(millis / 6e4);
			return format('homework.card.times.minutes', { values: { count: minutes } });
		} else {
			return format('homework.card.times.expired');
		}
	}
}
