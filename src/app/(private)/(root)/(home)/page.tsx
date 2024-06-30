import React from "react";

import { FullDateText, HourText } from "@/components/custom";
import MeetingCardList from "./components/MeetingCardList";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between px-5 py-8 lg:py-11 lg:px-10">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>

          <div className="flex flex-col gap-2">
            <HourText element="h1" className="text-4xl font-extrabold" />
            <FullDateText
              element="p"
              className="text-lg font-medium text-sky-1 lg:text-2xl first-letter:uppercase"
            />
          </div>
        </div>
      </div>

      <MeetingCardList />
    </section>
  );
};

export default Home;
