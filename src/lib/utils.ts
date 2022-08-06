export const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const dateTimeFormatter = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export const formatDateTime = dateTimeFormatter.format;
