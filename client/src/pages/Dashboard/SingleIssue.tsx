import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import SelectIssueStatus from "../../components/Dashboard/issues/SelectIssueStatus";
import { BiTrash } from "react-icons/bi";
import Comment from "../../components/Dashboard/issues/Comments";
import CommentsContainer from "../../components/Dashboard/issues/Comments";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { deleteIssue, getSingleIssue } from "../../services/issue.services";
import { useNavigate, useParams } from "react-router-dom";
import Swal, { SweetAlertResult } from "sweetalert2";
import { getUserFromLocalStorage } from "../../utils/tokens";

const SingleIssue = () => {
  const dispatch = useDispatch();
  const { currentIssue } = useSelector((state: RootState) => state?.issues);
  const { currentWorkspace } = useSelector((state: RootState) => state?.workspaces);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUserFromLocalStorage();

  const isAllowedToDelete =
    currentIssue?.userId?._id === user?._id ||
    currentIssue?.assignedBy?._id === user?._id ||
    currentWorkspace?.director?._id === user?._id;

  const deleteThis = async () => {
    Swal.fire({
      title: "Delete issue",
      text: "Are you sure you want to delete this issue?",
      icon: "warning",
      confirmButtonColor: "#76b1a6",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonColor: "darkred",
      cancelButtonText: "No",
    }).then(async (result: SweetAlertResult) => {
      if (result.isConfirmed) {
        const data = await dispatch(deleteIssue(id));
        if (!data.error) {
          navigate("/dashboard/issues");
        }
      }
    });
  };

  React.useEffect(() => {
    dispatch(getSingleIssue(id));
  }, []);

  return (
    <DashboardLayout pageTitle="Issue Details">
      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        <TodayDate />
        <SelectIssueStatus />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="text-[1.8rem] font-medium">{currentIssue?.title}</h2>
          {isAllowedToDelete && (
            <span>
              <BiTrash color="darkred" size={24} cursor={"pointer"} onClick={deleteThis} />
            </span>
          )}
        </div>
        <div
          className="leading-[1.2] text-[.9rem] mt-2 text-mainBlack"
          dangerouslySetInnerHTML={{ __html: currentIssue?.description || "" }}
        ></div>
      </div>

      {/* Attachments */}
      <div className="mt-5">
        <h3 className="font-bold text-[1.4rem]">Attachments</h3>
        <div className="mt-4 overflow-x-scroll max-w-full">
          <div className="max-w-fit flex items-center gap-2">
            {currentIssue?.attachments?.map((image, index) => {
              return (
                <img
                  src={image}
                  key={index}
                  className="min-w-[200px] w-[200px] h-[150px] rounded-md object-center object-cover"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-5">
        <h3 className="font-bold text-[1.4rem]">Comments</h3>
        <CommentsContainer />
      </div>
    </DashboardLayout>
  );
};

export default SingleIssue;
