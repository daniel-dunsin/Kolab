import React, { useState } from "react";
import FormRow from "../ui/FormRow";
import { MdClose } from "react-icons/md";
import ModalOverlay from "./ModalOverlay";
import Button from "../ui/Button";
import { FileUploader } from "react-drag-drop-files";
import { BiPhotoAlbum } from "react-icons/bi";
import CreateIssuesImagesModal from "./CreateIssuesImages";

interface Props {
  closeModal(): void;
}

const CreateIssueModal = ({ closeModal }: Props) => {
  // modal
  const [imagesModalOpen, setImagesModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const onChange = (file_list: FileList) => {
    for (let i = 0; i < file_list.length; i++) {
      setFiles([...files, file_list.item(i) as File]);
    }
  };

  return imagesModalOpen ? (
    <CreateIssuesImagesModal
      images={files}
      closeModal={() => setImagesModalOpen(false)}
    />
  ) : (
    <ModalOverlay modalWidth={1000}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Create Issue</h2>

        <span
          className="text-red-500 text-[1.3rem] cursor-pointer"
          onClick={closeModal}
          title="Close Modal"
        >
          <MdClose />
        </span>
      </header>

      <form
        className="pt-[1rem] border-t-2 mt-[1rem]"
        // onSubmit={submit}
      >
        <div className="flex gap-[1rem]">
          <div className="md:pr-[1rem] border-r-2 flex-[.7] flex flex-col gap-y-[.5rem]">
            <FormRow
              label="Title"
              placeholder="Enter Title"
              type="text"
              required={true}
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormRow
              label="Description"
              placeholder="Enter Description"
              type="text"
              required={true}
              value={description}
              className="h-[150px]"
              isTextArea={true}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />

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
          <div className="flex-[.3]"></div>
        </div>
        <Button text="Create Issue" type="submit" className="mt-4 ml-auto" />
      </form>
    </ModalOverlay>
  );
};

export default CreateIssueModal;
