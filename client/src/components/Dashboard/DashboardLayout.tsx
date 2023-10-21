import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <main className="min-h-screen bg-[#e1e0e0] w-full">
      <Sidebar />
      <section className="h-screen ml-0 lg:ml-[300px]">
        <Navbar />
      </section>
    </main>
  );
};

export default DashboardLayout;
