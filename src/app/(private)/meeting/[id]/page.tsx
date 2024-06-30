"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import MeetingSetup from "./components/MeetingSetup";
import MeetingRoom from "./components/MeetingRoom";
import { useGetCallById } from "@/utils/hooks/useGetCallById";
import { Loader } from "@/components/custom";

interface Props {
  params: {
    id: string;
  };
}

const Meeting = ({ params }: Props) => {
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(params.id);

  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? <MeetingSetup /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
