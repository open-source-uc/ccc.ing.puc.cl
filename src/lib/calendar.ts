export const googleCalendarId = import.meta.env.PUBLIC_GOOGLE_CALENDAR_ID;
export const googleAPIKey = import.meta.env.PUBLIC_GOOGLE_API_KEY;

export async function getNextEventsCalendar(key: string = googleAPIKey) {
	const now = new Date().toISOString();
	const url = `https://www.googleapis.com/calendar/v3/calendars/${googleCalendarId}/events?timeMin=${now}&key=${key}`;
	console.log(url);
	const response = await fetch(url);
	const data = (await response.json()) as GoogleCalendarResponse;

	data.items.sort((a, b) => {
		const aDate = new Date(a.start.dateTime || a.start.date);
		const bDate = new Date(b.start.dateTime || b.start.date);
		return aDate.getTime() - bDate.getTime();
	});
	return data;
}
