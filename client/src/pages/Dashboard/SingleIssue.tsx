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
import { getSingleIssue } from "../../services/issue.services";
import { useParams } from "react-router-dom";

const SingleIssue = () => {
  const dispatch = useDispatch();
  const { currentIssue } = useSelector((state: RootState) => state?.issues);
  const { id } = useParams();

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
          <span>
            <BiTrash color="darkred" size={24} cursor={"pointer"} />
          </span>
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
