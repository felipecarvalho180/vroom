import React, { PropsWithChildren } from "react";
import { Navbar, Sidebar } from "./components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vroom",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <section className="flex min-h-screen flex-col flex-1 px-6 pb-6 pt-28 max-md:pb-14 sm:px-9">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
