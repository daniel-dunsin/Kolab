import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TodayDate from "../../components/dashboard/ui/TodayDate";
import Button from "../../components/ui/Button";
import { BiPlus } from "react-icons/bi";
import CreateIssueModal from "../../components/modals/CreateIssueModal";
import KanbanBoard from "../../components/dashboard/issues/KanbanBoard";

const Issues = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <DashboardLayout pageTitle="Issues">
      <>
        {modalOpen && (
          <CreateIssueModal closeModal={() => setModalOpen(false)} />
        )}
      </>

      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        <TodayDate />
        <select className="p-2 text-[.8rem] md:w-[240px] outline-none border-[1.5px] hover:border-primary rounded-md">
          <option>All issues</option>
          <option>Assigned to me</option>
        </select>
      </div>

      <Button
        text="Create Issue"
        icon={<BiPlus />}
        onClick={() => setModalOpen(true)}
        className="block ml-auto mt-5"
      />

      <KanbanBoard />
    </DashboardLayout>
  );
};

export default Issues;