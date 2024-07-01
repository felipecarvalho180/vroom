"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/utils/constants";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const handleEndCall = async () => {
    await call.endCall();
    router.push(routes.HOME);
  };

  return (
    <Button onClick={handleEndCall} className="bg-red-500">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
