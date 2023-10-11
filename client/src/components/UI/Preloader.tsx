import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Preloader = () => {
  const preloader = useSelector((state: RootState) => state.handler.preloader);

  if (!preloader.isOpen) return <></>;

  return (
    <section className="min-h-screen z-[999] w-full top-0 left-0 fixed bg-[rgba(0,0,0,0.5)] flex items-center justify-center flex-col">
      <BiLoaderAlt className="text-white text-[2rem] animate-spin" />
      <p className="text-white text-[1.1rem] mt-2">{preloader.text}</p>
    </section>
  );
};

export default Preloader;
