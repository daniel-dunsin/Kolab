import React, { Dispatch, SetStateAction } from "react";
import { IUser } from "../../../interfaces/auth.interface";
import { BiChevronDown } from "react-icons/bi";
import { IWorkspaceMember } from "../../../interfaces/workspace-members.interface";

interface Props {
  user?: IWorkspaceMember;
  setUser?: Dispatch<SetStateAction<IWorkspaceMember | undefined>>;
  users?: IWorkspaceMember[];
}

const SelectUser = ({ user, setUser, users }: Props) => {
  const [tabOpened, setTabOpened] = React.useState<boolean>(false);

  return (
    <div className="relative w-full mb-[1rem]">
      <header
        className="flex w-full items-center gap-[1rem] justify-between p-[10px] rounded-md border-[1.5px] cursor-pointer"
        onClick={() => {
          setTabOpened((prev) => !prev);
        }}
      >
        <div className="flex flex-1 items-center gap-[.5rem]">
          {user ? (
            <>
              <img
                src={user?.userId?.profilePicture}
                alt=""
                className="w-[25px] h-[25px] object-center object-cover rounded-full"
              />

              <p className="truncate text-[.8rem] font-bold">
                {user?.userId?.firstName} {user?.userId?.lastName}
              </p>
            </>
          ) : (
            <p className="text-[.8rem] font-bold">Select User</p>
          )}
        </div>

        <BiChevronDown size={25} />
      </header>

      {tabOpened && (
        <div className="max-h-[200px] overflow-y-scroll bg-[#f5f5f5] absolute top-[116%] lg:right-0 left-0 w-full">
          {(users?.length as number) > 0 &&
            users?.map((user, index) => {
              return (
                <article
                  onClick={() => {
                    setUser && setUser(user);
                    setTabOpened(false);
                  }}
                  key={index}
                  className="flex flex-1 items-center gap-[.5rem] p-[10px] hover:bg-[#f1f1f1] cursor-pointer"
                >
                  <img
                    src={user?.userId?.profilePicture}
                    alt=""
                    className="w-[25px] h-[25px] object-center object-cover rounded-full"
                  />

                  <p className="truncate text-[.8rem] font-bold">
                    {user?.userId?.firstName} {user?.userId?.lastName}
                  </p>
                </article>
              );
            })}
          {(users?.length as number) === 0 && <p className="p-2 text-center text-[.8rem]">No User Found</p>}
        </div>
      )}
    </div>
  );
};

export default SelectUser;
