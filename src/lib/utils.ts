import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

type ClassValue = string | undefined | null | false;

export const classNames = (...classes: ClassValue[]) => classes.filter(Boolean).join(" ");

const dateOptions = { weekday: "long", month: "long", day: "numeric" } as const;
const timeOptions = { hour: "numeric", minute: "numeric" } as const;

export function markdownToHTML(markdown: string) {
	return remark().use(remarkGfm).use(remarkHtml).processSync(markdown);
}

export function formatDateTime(date: string, { isAware = true } = {}) {
	if (!date) return;

	const isOnlyDate = date.length === 10;
	const dateTimeFormatter = new Intl.DateTimeFormat("es-cl", {
		...dateOptions,
		...(isOnlyDate ? {} : timeOptions),
		timeZone: isAware ? "America/Santiago" : "UTC",
	});
	return dateTimeFormatter.format(new Date(date));
}

export function compareStringDates<K>(keyFn: (value: K) => string) {
	return function compareDate(a: K, b: K) {
		return new Date(keyFn(a)).getTime() - new Date(keyFn(b)).getTime();
	};
}

export function formatDateTimeDelta(date: string) {
	if (!date) return;

	const _date = new Date(date);
	const minutesDelta = Math.floor((_date.getTime() - Date.now()) / 1000 / 60);

	if (minutesDelta < 0) return undefined;

	if (minutesDelta < 1) return "Ahora!";

	const dateTimeDeltaFormatter = new Intl.RelativeTimeFormat("es-cl");

	if (minutesDelta < 60) return dateTimeDeltaFormatter.format(minutesDelta, "minute");

	const hoursDelta = Math.floor(minutesDelta / 60);
	if (hoursDelta < 24) return dateTimeDeltaFormatter.format(hoursDelta, "hour");

	const daysDelta = Math.floor(hoursDelta / 24);
	if (daysDelta < 7) return dateTimeDeltaFormatter.format(daysDelta, "day");

	const weeksDelta = Math.floor(daysDelta / 7);
	return dateTimeDeltaFormatter.format(weeksDelta, "week");
}
