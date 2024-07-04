"use client";

import { useGetCalls } from "@/utils/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import MeetingCard from "./MeetingCard";
import {
  formatToFullDate,
  formatToHourAndMinute,
} from "@/utils/helpers/formatDate";
import { Call } from "@stream-io/video-react-sdk";
import { Loader } from "../loader";
import { routes } from "@/utils/constants";

interface Props {
  type: "ended" | "upcoming";
}

export const CallList = ({ type }: Props) => {
  const router = useRouter();
  const { endedCalls, isLoading, upcomingCalls } = useGetCalls();

  const handleCallCardClick = (call: Call) => {
    router.push(routes.MEETING.replace(":id", (call as Call).id));
  };

  const [calls, emptyMessage] = useMemo(() => {
    switch (type) {
      case "ended":
        return [endedCalls, "No Previous Calls"];
      case "upcoming":
        return [upcomingCalls, "No Upcoming Calls"];
      default:
        return [[], ""];
    }
  }, [type, endedCalls, upcomingCalls]);

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((call: Call) => {
          const callDescription = (call as Call).state?.custom?.description;

          ("No Description");
          const callDate = `${formatToFullDate(
            (call as Call).state.startsAt!
          )} - ${formatToHourAndMinute((call as Call).state.startsAt!)}`;
          const callIcon =
            type === "ended" ? "/icons/previous.svg" : "/icons/upcoming.svg";

          const callLink = routes.MEETING.replace(":id", (call as Call).id);

          return (
            <MeetingCard
              key={(call as Call).id}
              icon={callIcon}
              title={callDescription}
              date={callDate}
              isPreviousMeeting={type === "ended"}
              handleClick={() => handleCallCardClick(call)}
              link={callLink}
              buttonText={"Start"}
            />
          );
        })
      ) : (
        <h1>{emptyMessage}</h1>
      )}
    </div>
  );
};
