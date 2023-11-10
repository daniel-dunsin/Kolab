import React from "react";
import ContentBox from "../ui/ContentBox";

const members = [
  {
    firstName: "Adejare",
    lastName: "Daniel",
    email: "adejaredaniel12@gmail.com",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
  },

  {
    firstName: "Adejare",
    lastName: "Daniel",
    email: "adejaredaniel12@gmail.com",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
  },

  {
    firstName: "Adejare",
    lastName: "Daniel",
    email: "adejaredaniel12@gmail.com",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
  },

  {
    firstName: "Adejare",
    lastName: "Daniel",
    email: "adejaredaniel12@gmail.com",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
  },

  {
    firstName: "Adejare",
    lastName: "Daniel",
    email: "adejaredaniel12@gmail.com",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
  },

  {
    firstName: "Adejare",
    lastName: "Daniel",
    email: "adejaredaniel12@gmail.com",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU",
  },
];

const Members = () => {
  return (
    <ContentBox headerSize="small" header="Members" maxHeight={150}>
      <div className="mt-2">
        {members?.map((member, index) => {
          return (
            <article
              key={index}
              className="border-[1.5px] rounded-[10px] py-[.2rem] px-[0.5rem] flex items-center gap-[.7rem] my-2"
            >
              <img
                src={member?.profilePicture}
                className="w-[30px] h-[30px] object-cover object-center rounded-full"
                alt={member?.firstName + " profile picture"}
              />

              <div>
                <h5 className="font-bold leading-1 text-[1.1rem]">
                  {member?.firstName} {member?.lastName}
                </h5>
                <p className="truncate my-0 py-0 text-[.8rem]">
                  {member?.email}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </ContentBox>
  );
};

export default Members;
