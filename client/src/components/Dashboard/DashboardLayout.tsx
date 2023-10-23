import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [sidebarOpened, setSidebarOpened] = React.useState<boolean>(false);

  return (
    <main className="min-h-screen bg-[#f4f3f3] w-full">
      <Sidebar toggleSidebar={setSidebarOpened} isOpened={sidebarOpened} />
      <section className="h-screen ml-0 lg:ml-[300px]">
        <Navbar toggleSidebar={setSidebarOpened} />

        <section className="p-[1rem]">
          <h1 className="text-[1.2rem] font-bold text-mainBlack lg:hidden">
            Dashboard
          </h1>
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
