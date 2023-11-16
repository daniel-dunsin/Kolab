import React from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import SelectIssueStatus from "../../components/Dashboard/issues/SelectIssueStatus";
import { BiTrash } from "react-icons/bi";
import Comment from "../../components/Dashboard/issues/Comments";
import CommentsContainer from "../../components/Dashboard/issues/Comments";

const images = [
  "http://res.cloudinary.com/dtori4rq2/image/upload/v1700144936/atph-images/d1tnkjr1ssoslc95u13c.jpg",
  "http://res.cloudinary.com/dtori4rq2/image/upload/v1700144938/atph-images/dyfmqznpsx4fe3cfri1j.jpg",
];

const SingleIssue = () => {
  return (
    <DashboardLayout pageTitle="Issue Details">
      <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        <TodayDate />
        <SelectIssueStatus />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="text-[1.8rem] font-medium">Solve the frontend bug</h2>
          <span>
            <BiTrash color="darkred" size={24} cursor={"pointer"} />
          </span>
        </div>
        <p className="leading-[1.2] text-[.9rem] mt-2 text-mainBlack">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut non maxime
          reprehenderit? Expedita, facere ab voluptates eos vitae mollitia
          deserunt doloremque dolor impedit quidem error ipsum molestiae
          voluptatum, repudiandae nemo itaque magnam ea cumque? Amet dignissimos
          in sit vitae perferendis asperiores nisi deleniti cupiditate optio
          numquam culpa corrupti quidem laboriosam distinctio necessitatibus
          officia consequuntur voluptates fugit totam, dolore neque. Fugit
          temporibus cumque, corporis eos tempore similique accusantium soluta
          provident tempora porro beatae pariatur totam nihil nostrum veritatis
          at incidunt, maiores quos. Minima, quod inventore unde non aspernatur,
          tenetur, nisi suscipit saepe id esse laborum consequatur! Magnam
          pariatur saepe incidunt nisi.
        </p>
      </div>

      {/* Attachments */}
      <div className="mt-5">
        <h3 className="font-bold text-[1.4rem]">Attachments</h3>
        <div className="mt-4 overflow-x-scroll max-w-full">
          <div className="max-w-fit flex items-center gap-2">
            {images?.map((image, index) => {
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
