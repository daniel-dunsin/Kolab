import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  pageTitle: string;
  children?: React.ReactElement | React.ReactElement[];
}

const DashboardLayout = ({ pageTitle, children }: Props) => {
  const [sidebarOpened, setSidebarOpened] = React.useState<boolean>(false);

  return (
    <main className="min-h-screen bg-[#f4f3f3] w-full">
      <Sidebar toggleSidebar={setSidebarOpened} isOpened={sidebarOpened} />
      <section className="h-screen ml-0 lg:ml-[300px]">
        <Navbar pageTitle={pageTitle} toggleSidebar={setSidebarOpened} />

        <section className="p-[1rem]">
          <h1 className="text-[1.2rem] font-bold text-mainBlack lg:hidden">
            {pageTitle}
          </h1>

          <section>{children}</section>
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
