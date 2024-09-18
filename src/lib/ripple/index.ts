/*
 * This code slightly modified from https://github.com/Posandu/svelte-ripple-action
 * For copyright please refer to original source code and it's author: Posandu Mapa
 *
 * ### https://github.com/Posandu/svelte-ripple-action/LICENSE:
 *
 *  MIT License
 *
 *  Copyright (c) 2023 Posandu Mapa
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import { onMount } from 'svelte';

const DEFAULT_INEVENTS = ['pointerdown', 'touchstart'];
const OUTEVENTS = [
	'focusout',
	'mouseup',
	'pointerup',
	'mouseleave',
	'dragleave',
	'touchmove',
	'touchend',
	'touchcancel'
];

const ATTR_NAME = 'svelte-ripple-effect-ready';
const ATTR_CENTER_NAME = 'ripple-center';

export interface RippleOptions {
	center?: boolean;
	color?: string;
	/**
	 * Duration in seconds
	 */
	duration?: number;
	/**
	 * Max width of the ripple
	 */
	maxRadius?: number;
	/**
	 * If true, ripple will not be shown
	 */
	disabled?: boolean;

	inEvents?: string[];
}

const addEvent = (el: HTMLElement, event: string, callback: (...args: any[]) => void) => {
	el.addEventListener(event, callback);
};

const removeEvent = (el: HTMLElement, event: string, callback: (...args: any[]) => void) => {
	el.removeEventListener(event, callback);
};

const findFurthestPoint = (
	clickPointX: number,
	elementWidth: number,
	offsetX: number,
	clickPointY: number,
	elementHeight: number,
	offsetY: number
) => {
	const x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
	const y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
	const d = Math.hypot(x - (clickPointX - offsetX), y - (clickPointY - offsetY));

	return d;
};

export function ripple(el: HTMLElement, options?: RippleOptions) {
	const addClassIfMissing = () => {
		if (!el.getAttribute(ATTR_NAME)) {
			el.setAttribute(ATTR_NAME, '');
		}

		if (options?.center) {
			el.setAttribute(ATTR_CENTER_NAME, '');
		} else {
			el.removeAttribute(ATTR_CENTER_NAME);
		}
	};

	onMount(() => {
		addClassIfMissing();
	});

	let maximumRadius = 0;

	const setOptions = (options: RippleOptions | undefined) => {
		/**
		 * Add custom --ripple-color if set
		 */
		if (options?.color) {
			el.style.setProperty('--ripple-color', options.color);
		}

		/**
		 * Add custom --ripple-duration if set
		 */
		if (options?.duration) {
			el.style.setProperty('--ripple-duration', options.duration + 's');
		}

		/**
		 * If maxWidth is set
		 */
		if (options?.maxRadius) {
			maximumRadius = options.maxRadius;
		}
	};

	setOptions(options);

	const createRipple = (e: PointerEvent) => {
		if (options?.disabled) return;

		e.stopPropagation();

		addClassIfMissing();

		const rect = el.getBoundingClientRect();
		const radius = findFurthestPoint(
			e.clientX,
			el.offsetWidth,
			rect.left,
			e.clientY,
			el.offsetHeight,
			rect.top
		);

		const ripple = document.createElement('div');
		ripple.classList.add('ripple');

		let size = radius * 2;
		let top = e.clientY - rect.top - radius;
		let left = e.clientX - rect.left - radius;

		if (maximumRadius && size > maximumRadius) {
			size = maximumRadius * 2;
			top = e.clientY - rect.top - maximumRadius;
			left = e.clientX - rect.left - maximumRadius;
		}

		ripple.style.left = left + 'px';
		ripple.style.top = top + 'px';

		ripple.style.width = ripple.style.height = size + 'px';

		el.appendChild(ripple);

		const removeRipple = () => {
			const timeOutDuration = options?.duration ? options.duration * 1000 : 1000;

			if (ripple !== null) {
				setTimeout(() => {
					ripple.style.opacity = '0';
				}, timeOutDuration / 4);

				setTimeout(() => {
					ripple.remove();
				}, timeOutDuration);
			}
		};

		OUTEVENTS.forEach((event) => {
			addEvent(el, event, removeRipple);
		});
	};

	const inEvents = options?.inEvents || DEFAULT_INEVENTS;

	inEvents.forEach((event) => {
		addEvent(el, event, createRipple);
	});

	return {
		destroy: () => {
			inEvents.forEach((event) => {
				removeEvent(el, event, createRipple);
			});
		},
		update: (newOptions: RippleOptions) => {
			options = newOptions;

			setOptions(newOptions);
		}
	};
}
