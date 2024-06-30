"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { homeCards, routes } from "@/utils/constants";
import { HomeMeetingState } from "@/utils/types";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingCardList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<HomeMeetingState>();

  const handleHomeCardClick = (key: HomeMeetingState) => {
    if (!key) return router.push(routes.RECORDINGS);

    setMeetingState(key);
  };

  const handleCreateMeeting = () => {};

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
