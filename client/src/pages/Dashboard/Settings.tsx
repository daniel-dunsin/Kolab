import React, { useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import TodayDate from "../../components/Dashboard/UI/TodayDate";
import { BiPencil, BiSave, BiTrash } from "react-icons/bi";
import FormRow from "../../components/UI/FormRow";
import Button from "../../components/UI/Button";

const Settings = () => {
  const [newFile, setNewFile] = useState<File | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <DashboardLayout pageTitle="Workspace Settings">
      <TodayDate />
      <form className="mt-6">
        <div className="relative mb-4 w-[180px] h-[180px] rounded-full border-[10px] border-white">
          <img
            src={
              newFile
                ? URL.createObjectURL(newFile)
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU"
            }
            alt=""
            className="w-full h-full object-cover object-center rounded-full"
          />

          {newFile && (
            <span
              className={styles.iconContainer + " right-[-10px] top-[30px]"}
              onClick={() => setNewFile(undefined)}
              title="Delete Workspace Picture"
            >
              <BiTrash color="white" />
            </span>
          )}

          <input
            type="file"
            className="hidden"
            id="file"
            accept="image/*"
            onChange={(e) => setNewFile(e?.target?.files?.[0])}
          />
          <label
            htmlFor="file"
            className={styles.iconContainer + " bottom-[30px] right-[-10px]"}
            title="Change Workspace Picture"
          >
            <BiPencil color="white" />
          </label>
        </div>

        <FormRow
          label="Edit Workspace Name"
          placeholder="Enter workspace name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="max-w-[300px] mb-2"
          required
        />

        <FormRow
          label="Edit Workspace Description"
          placeholder="Enter workspace description"
          value={description}
          isTextArea={true}
          onChange={(e) => setDescription(e.target.value)}
          className="max-w-[400px] min-w-[400px] max-h-[150px] min-h-[150px]"
          required
        />

        <div className="flex items-center justify-end flex-wrap flex-col-reverse md:flex-row gap-4 ">
          <Button
            text="Delete Workspace"
            className="bg-red-500"
            type="button"
            icon={<BiTrash />}
          />
          <Button text="Edit Workspace Settings" icon={<BiSave />} />
        </div>
      </form>
    </DashboardLayout>
  );
};

const styles = {
  iconContainer:
    "flex w-[40px] h-[40px] bg-[#222] rounded-full items-center justify-center text-[1.2rem] cursor-pointer absolute ",
};

export default Settings;
