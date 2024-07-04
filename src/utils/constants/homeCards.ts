import { HomeMeetingState } from "../types";

export const homeCards: {
  img: string;
  title: string;
  description: string;
  className?: string;
  key: HomeMeetingState;
}[] = [
  {
    img: "/icons/add-meeting.svg",
    title: "New Meeting",
    description: "Start an instant meeting",
    key: "isInstantMeeting",
    className: "bg-orange-1",
  },
  {
    img: "/icons/join-meeting.svg",
    title: "Join Meeting",
    description: "Via invitation link",
    key: "isJoiningMeeting",
    className: "bg-blue-1",
  },
  {
    img: "/icons/schedule.svg",
    title: "Schedule Meeting",
    description: "Plan your meeting",
    key: "isScheduleMeeting",
    className: "bg-purple-1",
  },
];
