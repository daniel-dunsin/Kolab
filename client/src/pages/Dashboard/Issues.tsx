import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import Button from "../../components/UI/Button";
import { BiPlus } from "react-icons/bi";
import CreateIssueModal from "../../components/Modals/CreateIssueModal";
import IssuesList from "../../components/Dashboard/issues/IssuesList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { getIssues } from "../../services/issue.services";
import IssuesFilter from "../../components/Dashboard/issues/IssuesFilter";

const Issues = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <DashboardLayout pageTitle="Issues">
      <>{modalOpen && <CreateIssueModal closeModal={() => setModalOpen(false)} />}</>

      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        <TodayDate />
        <IssuesFilter />
      </div>

      <Button text="Create Issue" icon={<BiPlus />} onClick={() => setModalOpen(true)} className="block ml-auto mt-5" />

      <IssuesList />
    </DashboardLayout>
  );
};

export default Issues;
