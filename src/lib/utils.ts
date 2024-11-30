import { type ClassValue, clsx } from 'clsx';
import { differenceInCalendarDays } from 'date-fns/differenceInCalendarDays';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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
