import React, { useState, FormEvent } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import { BiPencil, BiTrash } from "react-icons/bi";
import FormRow from "../../components/UI/FormRow";
import Button from "../../components/UI/Button";
import { ILocalStorageItem } from "../../interfaces/local-storage.interface";
import { getUserFromLocalStorage } from "../../utils/tokens";
import { useDispatch } from "react-redux";
import { editProfile } from "../../services/user.services";
import Swal from "sweetalert2";

const EditProfile = () => {
  const user = getUserFromLocalStorage();
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState<File | undefined>(undefined);
  const [firstName, setFirstName] = useState<string>(user?.firstName);
  const [lastName, setLastName] = useState<string>(user?.lastName);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const data = await dispatch(editProfile({ firstName, lastName, profilePicture }));

    if (!data.error) {
      await Swal.fire({
        title: "Edit Profile",
        text: "Your profile has been edited successfuly",
        timer: 2000,
        showConfirmButton: false,
        icon: "success",
      });
    }
  };

  return (
    <DashboardLayout pageTitle="Edit Profile">
      <TodayDate />
      <form className="mt-6" onSubmit={submit}>
        <div className="relative mb-4 w-[180px] h-[180px] rounded-full border-[10px] border-white">
          <img
            src={profilePicture ? URL.createObjectURL(profilePicture) : user?.profilePicture}
            alt=""
            className="w-full h-full object-cover object-center rounded-full"
          />

          <input
            type="file"
            className="hidden"
            id="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e?.target?.files?.[0])}
          />
          <label
            htmlFor="file"
            className={styles.iconContainer + " bottom-[30px] right-[-10px]"}
            title="Change Workspace Picture"
          >
            <BiPencil color="white" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-2">
          <FormRow
            label="Firstname"
            placeholder="Enter firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <FormRow
            label="Lastname"
            placeholder="Enter lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <Button text="Submit" className="min-w-[200px] ml-auto mt-6" />
      </form>
    </DashboardLayout>
  );
};

const styles = {
  iconContainer:
    "flex w-[40px] h-[40px] bg-[#222] rounded-full items-center justify-center text-[1.2rem] cursor-pointer absolute ",
};

export default EditProfile;
