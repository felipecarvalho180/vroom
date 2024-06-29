"use client";
import { PropsWithChildren, createElement } from "react";

import { formatToHourAndMinute } from "@/utils/helpers/formatDate";
import useClock from "@/utils/hooks/useClock";

interface Props extends PropsWithChildren {
  className?: string;
  element: string;
}

export const HourText = ({ element, className }: Props) => {
  const time = useClock();

  return createElement(element, { className }, formatToHourAndMinute(time));
};
