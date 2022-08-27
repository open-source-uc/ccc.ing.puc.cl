export const googleCalendarId = "c_7h2ffgd26g1s9au82k5lovermg@group.calendar.google.com";
export const googleAPIKey = import.meta.env.PUBLIC_GOOGLE_API_KEY;

export async function getNextEventsCalendar(key: string = googleAPIKey) {
	const now = new Date().toISOString();
	const url = `https://www.googleapis.com/calendar/v3/calendars/${googleCalendarId}/events?timeMin=${now}&key=${key}`;
	const response = await fetch(url);
	const data = (await response.json()) as GoogleCalendarResponse;
	console.log(data);
	data.items.sort((a, b) => {
		const aDate = new Date(a.start.dateTime || a.start.date);
		const bDate = new Date(b.start.dateTime || b.start.date);
		return aDate.getTime() - bDate.getTime();
	});
	return data;
}
