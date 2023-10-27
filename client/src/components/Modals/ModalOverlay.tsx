import React from "react";

interface Props {
  modalWidth?: number;
  children?: React.ReactElement | React.ReactElement[];
}

const ModalOverlay = ({ modalWidth, children }: Props) => {
  return (
    <section className="w-full min-h-screen z-[5] bg-[rgba(0,0,0,0.5)] flex items-center justify-center fixed top-0 left-0">
      <div
        className="bg-white rounded-md p-3 w-full pb-5 w-[90vw] mx-auto"
        style={{ maxWidth: modalWidth || 500 }}
      >
        {children}
      </div>
    </section>
  );
};

export default ModalOverlay;
