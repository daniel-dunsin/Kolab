import React, { useState } from "react";
import FormRow from "../UI/FormRow";
import { MdClose } from "react-icons/md";
import ModalOverlay from "./ModalOverlay";
import Button from "../UI/Button";
import { FileUploader } from "react-drag-drop-files";
import { BiPhotoAlbum } from "react-icons/bi";
import CreateIssuesImagesModal from "./CreateIssuesImages";
import Editor from "../UI/Editor";
import { IUser } from "../../interfaces/auth.interface";
import SelectUser from "../Dashboard/issues/SelectUser";
import SelectProject from "../Dashboard/issues/SelectProject";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IWorkspaceMember } from "../../interfaces/workspace-members.interface";
import { IProject } from "../../interfaces/project.interface";
import { useDispatch } from "react-redux";
import { getProject } from "../../services/project.services";
import { getWorkspaceMembers } from "../../services/workspace-members.services";
import { openErrorModal } from "../../store/handlers.slice";
import { createIssue } from "../../services/issue.services";
import Swal from "sweetalert2";

interface Props {
  closeModal(): void;
}

const CreateIssueModal = ({ closeModal }: Props) => {
  // modal
  const [imagesModalOpen, setImagesModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [assignedUser, setAssignedUser] = useState<IWorkspaceMember | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(undefined);

  const members = useSelector((state: RootState) => state.members);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const currentWorkspace = useSelector((state: RootState) => state.workspaces?.currentWorkspace);
  const dispatch = useDispatch();

  const onChange = (file_list: FileList) => {
    for (let i = 0; i < file_list.length; i++) {
      setFiles([...files, file_list.item(i) as File]);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignedUser) return dispatch(openErrorModal("Select User"));
    if (!selectedProject) return dispatch(openErrorModal("Select Project"));

    const data = await dispatch(
      createIssue({
        userId: assignedUser.userId._id,
        projectId: selectedProject._id,
        attachments: files,
        description,
        title,
      })
    );

    if (!data?.error) {
      await Swal.fire({
        title: "Create Issue",
        text: "You have successfully created this issue",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      closeModal();
    }
  };

  React.useEffect(() => {
    if (currentWorkspace) {
      dispatch(getProject({}));
      dispatch(getWorkspaceMembers({}));
    }
  }, [currentWorkspace]);

  return imagesModalOpen ? (
    <CreateIssuesImagesModal images={files} closeModal={() => setImagesModalOpen(false)} />
  ) : (
    <ModalOverlay modalWidth={1000}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Create Issue</h2>

        <span className="text-red-500 text-[1.3rem] cursor-pointer" onClick={closeModal} title="Close Modal">
          <MdClose />
        </span>
      </header>

      <form
        className="pt-[1rem] border-t-2 mt-[1rem] lg:max-h-fit max-h-[80vh] lg:overflow-y-auto overflow-y-scroll overflow-x-hidden"
        onSubmit={submit}
      >
        <div className="flex gap-[1rem] flex-col lg:flex-row">
          <div className="md:pr-[1rem] lg:border-r-2 flex-[.7] flex flex-col gap-y-[.5rem] max-h-[70vh] lg:overflow-y-scroll">
            <FormRow
              label="Title"
              placeholder="Enter Title"
              type="text"
              required={true}
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="w-[100%] min-h-[280px]">
              <label htmlFor="" className="font-bold text-[.8rem] blcok mb-2">
                Description
              </label>
              <Editor
                value={description}
                onChange={setDescription}
                style={{
                  width: "100%",
                  height: "170px",
                  backgroundColor: "#f3f3f3",
                }}
              />
            </div>

            <div className="flex flex-col  col-span-1 gap-y-[0.2rem] w-full flex-1">
              <label className="text-[.8rem] block mb-2">Attachments</label>
              <FileUploader
                multiple={true}
                hoverTitle="Drop here"
                types={["PNG", "JPEG", "WEBP"]}
                handleChange={onChange}
              >
                <div className="flex items-center gap-2 text-[.8rem] p-2 rounded-md border-[3px] cursor-pointer border-primary !border-dashed">
                  <BiPhotoAlbum size={25} />
                  <p>Drag & Drop or click to upload</p>
                </div>
              </FileUploader>
              {files.length > 0 && (
                <p
                  className="mt-2 hover:underline text-[.8rem] font-bold cursor-pointer"
                  onClick={() => setImagesModalOpen(true)}
                >
                  View Selected Images {`(${files.length})`}
                </p>
              )}
            </div>
          </div>

          {/* Second Container */}
          <div className="flex-[.3]">
            <p className="font-bold text-[.8rem] mb-1">Assign To</p>
            <SelectUser users={members} user={assignedUser as IWorkspaceMember} setUser={setAssignedUser} />

            <p className="font-bold text-[.8rem] mb-1">Select Project</p>
            <SelectProject projects={projects} project={selectedProject as IProject} setProject={setSelectedProject} />

            <Button text="Create Issue" type="submit" className="mt-4 ml-auto" />
          </div>
        </div>
      </form>
    </ModalOverlay>
  );
};

export default CreateIssueModal;
