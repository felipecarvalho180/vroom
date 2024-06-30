"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { homeCards, routes } from "@/utils/constants";
import { HomeMeetingState } from "@/utils/types";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

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

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {homeCards.map((card) => (
        <HomeCard
          {...card}
          key={card.title}
          onClick={() => handleHomeCardClick(card.key)}
        />
      ))}

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
