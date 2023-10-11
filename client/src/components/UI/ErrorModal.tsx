import React from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeErrorModal } from "../../store/handlersSlice";

const ErrorModal = () => {
  const errorModal = useSelector(
    (state: RootState) => state.handler.errorModal
  );

  const dispatch = useDispatch();

  if (!errorModal.isOpen) return <></>;

  return (
    <div
      id="error-modal"
      className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white w-96 p-6 rounded-lg">
        <div className="text-red-600 text-2xl font-semibold mb-4">Error</div>
        <p className="text-gray-700">{errorModal.text}</p>
        <Button
          text="Close"
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 w-full"
          onClick={() => dispatch(closeErrorModal())}
        />
      </div>
    </div>
  );
};

export default ErrorModal;
