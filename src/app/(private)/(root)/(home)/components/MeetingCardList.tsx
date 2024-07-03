"use client";

import React, { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import HomeCard from "./HomeCard";
import { homeCards, routes } from "@/utils/constants";
import { HomeMeetingState } from "@/utils/types";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

registerLocale("pt-br", ptBR);

const MeetingCardList = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const [meetingState, setMeetingState] = useState<HomeMeetingState>();
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const handleHomeCardClick = (key: HomeMeetingState) => {
    if (!key) return router.push(routes.RECORDINGS);

    setMeetingState(key);
  };

  const handleCreateMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) router.push(routes.MEETING.replace(":id", id));

      toast({ title: "Meeting created" });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create call",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({ title: "Link copied" });
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {homeCards.map((card) => (
        <HomeCard
          {...card}
          key={card.title}
          onClick={() => handleHomeCardClick(card.key)}
        />
      ))}

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          onClick={handleCreateMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="description"
              className="text-base text-normal leading-[22px] text-sky-2"
            >
              Add a description
            </label>
            <Textarea
              id="description"
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="date-picker"
              className="text-base text-normal leading-[22px] text-sky-2"
            >
              Add a description
            </label>
            <ReactDatePicker
              id="date-picker"
              selected={values.dateTime}
              onChange={(date) => {
                setValues((prevState) => ({
                  ...prevState,
                  dateTime: date!,
                }));
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              locale="pt-br"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy Meeting Link"
          onClick={handleCopyLink}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        onClick={handleCreateMeeting}
      />
    </section>
  );
};

export default MeetingCardList;
