import React, { useState } from "react";
import { getUserFromLocalStorage } from "../../../utils/tokens";
import { BiChevronDown, BiChevronUp, BiLogOut } from "react-icons/bi";
import image from "../../../assets/images/profile-img.jpg";
import { logOut } from "../../../services/thunks/auth.thunk";

function UserInfoTab() {
  const [tabOpened, setTabOpened] = useState<boolean>(false);

  const user = getUserFromLocalStorage();

  return (
    <div className="lg:w-[300px] lg:max-w-[300px] relative">
      <div
        className="px-[1rem] py-[.6rem] rounded-[30px] border-2 flex items-center justify-between cursor-pointer lg:w-full max-w-fit lg:max-w-full"
        onClick={() => setTabOpened(!tabOpened)}
      >
        <div className="flex items-center flex-1">
          <img
            src={user?.profilePicture}
            className="w-[30px] h-[30px] rounded-full object-cover object-center block mr-2"
            alt="Adejare Daniel Dp"
          />
          <p className="hidden lg:block truncate flex-1 text-mainBlack font-medium">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <span className="text-[1.8rem] text-mainBlack">
          <BiChevronDown />
        </span>
      </div>

      <div
        className={`absolute overflow-hidden transition-all duration-300 lg:top-0 top-[105%] lg:left-0 right-0 border-2 bg-white z-[5] rounded-[30px] ${
          tabOpened
            ? "w-screen lg:w-[300px] max-w-[300px] h-[200px] border-white"
            : "w-0 h-0 border-transparent"
        }`}
      >
        <div className="px-[1rem] py-[1rem] h-full flex justify-between flex-col ">
          <div>
            <div className="flex items-start gap-[1rem]">
              <img
                src={user?.profilePicture}
                className="w-[70px] h-[70px] rounded-full object-center object-cover border-[10px] border-[#f7f7f7]"
                alt=""
              />
              <h2 className="break-words text-[1.6rem] font-bold text-mainBlack leading-[1.1]">
                {user?.firstName} {user?.lastName}
              </h2>

              <span
                className="text-[1.8rem] text-mainBlack cursor-pointer"
                onClick={() => setTabOpened(false)}
              >
                <BiChevronUp />
              </span>
            </div>

            <p className="mt-2 text-mainBlack truncate">
              <b>Email: </b> {user?.email}
            </p>
          </div>

          <p className="mt-2 text-mainBlack cursor-pointer" onClick={logOut}>
            <span className="inline-block mr-2 align-middle text-[1.2rem] font-bold">
              <BiLogOut />
            </span>
            Log out
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoTab;
