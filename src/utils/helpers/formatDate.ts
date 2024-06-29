import { format, intlFormat } from "date-fns";

export const formatToHourAndMinute = (date: Date) => format(date, "HH:mm");
export const formatToFullDate = (date: Date) =>
  intlFormat(
    date,
    { day: "numeric", weekday: "long", month: "long", year: "numeric" },
    { locale: "pt-BR" }
  );
