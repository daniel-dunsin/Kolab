import React, { useEffect, useState } from "react";
import SearchBox from "../../components/UI/SearchBox";
import Button from "../../components/UI/Button";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { BiPlus } from "react-icons/bi";
import InviteUserModal from "../../components/Modals/InviteUserModal";
import SingleMember from "../../components/Dashboard/members/SingleMember";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { getWorkspaceMembers } from "../../services/workspace-members.services";
import checkIsDirector from "../../utils/is-director";
import useSearch from "../../utils/hooks/useSearch";

export const members = [
  {
    _id: "akjsksas",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
    firstName: "Adejare",
    lastName: "Daniel",
    email: "adejaredaniel12@gmail.com",
  },
  {
    _id: "10",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
    firstName: "Oluwadunsin",
    lastName: "Gabriel",
    email: "oluwadunsingau@gmail.com",
  },
];

const Members = () => {
  const dispatch = useDispatch();
  const { members, workspaces } = useSelector((state: RootState) => state);
  const { data, value, setValue } = useSearch({
    items: members.map((mem) => mem.userId),
    fields: ["firstName", "lastName"],
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const isDirector = checkIsDirector(workspaces.currentWorkspace);

  useEffect(() => {
    if (workspaces.currentWorkspace?._id) {
      dispatch(getWorkspaceMembers());
    }
  }, [workspaces?.currentWorkspace]);

  return (
    <DashboardLayout pageTitle="Members">
      <>{modalOpen && <InviteUserModal closeModal={() => setModalOpen(false)} />}</>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <TodayDate />
        {/* Only Directors should have this */}
        {isDirector && (
          <Button
            text="Invite user to your workspace"
            icon={<BiPlus />}
            onClick={() => {
              setModalOpen(true);
            }}
          />
        )}
      </div>

      <section className="mt-6">
        <SearchBox value={value} setValue={setValue} placeholder="Search Members..." />

        <div className="mt-5">
          {data?.map((member, index) => {
            return <SingleMember {...member} key={index} />;
          })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Members;
