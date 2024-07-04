"use client";

import React from "react";
import Table from "./components/Table";
import { useUser } from "@clerk/nextjs";
import { routes } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/utils/helpers/copyToClipboard";
import { useGetCallById } from "@/utils/hooks/useGetCallById";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const PersonalRoom = () => {
  const { user } = useUser();
  const router = useRouter();
  const client = useStreamVideoClient();
  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);
  const meetingLink =
    process.env.NEXT_PUBLIC_BASE_URL +
    routes.MEETING.replace(":id", meetingId!) +
    "?personal=true";

  const handleStartMeeting = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(routes.MEETING.replace(":id", meetingId!) + "?personal=true");
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Meeting Link" description={meetingLink} />
      </div>

      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={handleStartMeeting}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => copyToClipboard(meetingLink)}
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
