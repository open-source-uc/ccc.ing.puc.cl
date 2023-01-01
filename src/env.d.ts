interface ImportMetaEnv {
	readonly PUBLIC_GOOGLE_API_KEY: string;
	readonly PUBLIC_GOOGLE_CALENDAR_ID: string;
	readonly BUILD_GOOGLE_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface GoogleCalendarResponse {
	summary: string;
	description?: string | null;
	nextPageToken?: string | null;
	timeZone?: string | null;
	updated?: string | null;
	items: GoogleCalendarEvent[];
}

type GoogleEventDateTime =
	| {
			date: string;
			dateTime?: undefined;
			timeZone?: undefined;
	  }
	| {
			date: string;
			dateTime: string;
			timeZone: string;
	  };

interface GoogleCalendarEvent {
	summary: string;
	description?: string | null;
	colorId?: string | null;
	created: string;
	end: GoogleEventDateTime;
	eventType: "default" | "outOfOffice" | "focusTime";
	htmlLink: string;
	iCalUID?: string | null;
	id?: string | null;
	kind: "calendar#event";
	location?: string | null;
	start: GoogleEventDateTime;
}
