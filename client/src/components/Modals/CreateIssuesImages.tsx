import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import ModalOverlay from "./ModalOverlay";
import { BiTrash } from "react-icons/bi";

interface Props {
  closeModal(): void;
  images: File[];
}

const CreateIssuesImagesModal = ({ closeModal, images }: Props) => {
  const [allImages, setImages] = useState<File[]>(images);

  const removeImage = (index: number) => {
    setImages(allImages.filter((image, idx) => idx != index));
  };

  return (
    <ModalOverlay modalWidth={1000}>
      <header className="flex items-center justify-between">
        <h2 className="font-bold text-[1.1rem] text-mainBlack">Images</h2>

        <span className="text-red-500 text-[1.3rem] cursor-pointer" onClick={closeModal} title="Close Modal">
          <MdClose />
        </span>
      </header>

      {allImages?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {allImages?.map((image, index) => {
            return (
              <div className="rounded-md overflow-hidden shadow-md" key={index}>
                <img src={URL.createObjectURL(image)} alt="" className="w-full h-[120px]" />
                <p
                  className="p-2 text-center text-red-700 bg-[#f3f3f3] cursor-pointer"
                  onClick={() => removeImage(index)}
                >
                  <BiTrash
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center py-4 font-bold">No Image Selected</p>
      )}
    </ModalOverlay>
  );
};

export default CreateIssuesImagesModal;
