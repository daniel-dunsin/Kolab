import React, { Dispatch, SetStateAction } from "react";
import { IUser } from "../../../interfaces/auth.interface";
import { BiChevronDown } from "react-icons/bi";

interface Props {
  user?: IUser;
  setUser?: Dispatch<SetStateAction<IUser>>;
  users?: IUser[];
}

const SelectUser = ({ user, setUser, users }: Props) => {
  const [tabOpened, setTabOpened] = React.useState<boolean>(false);

  return (
    <div className="relative w-full mb-[1rem]">
      <header
        className="flex w-full items-center gap-[1rem] justify-between p-[10px] rounded-md border-[1.5px] cursor-pointer"
        onClick={() => setTabOpened((prev) => !prev)}
      >
        <div className="flex flex-1 items-center gap-[.5rem]">
          <img
            src={user?.profilePicture}
            alt=""
            className="w-[25px] h-[25px] object-center object-cover rounded-full"
          />

          <p className="truncate text-[.8rem] font-bold">
            {user?.firstName} {user?.lastName}
          </p>
        </div>

        <BiChevronDown size={25} />
      </header>

      {tabOpened && (
        <div className="max-h-[200px] overflow-y-scroll bg-[#f5f5f5] absolute top-[116%] lg:right-0 left-0 w-full">
          {users?.map((user, index) => {
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
                  src={user?.profilePicture}
                  alt=""
                  className="w-[25px] h-[25px] object-center object-cover rounded-full"
                />

                <p className="truncate text-[.8rem] font-bold">
                  {user?.firstName} {user?.lastName}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectUser;
