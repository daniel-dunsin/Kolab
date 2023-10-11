import React from "react";
import illustration2 from "../../assets/images/Illustration 2.png";

function Section2() {
  return (
    <section className="flex items-center justify-center gap-[1rem] flex-wrap md:flex-row flex-col max-w-[1000px] mx-auto px-[1rem] py-[3rem]">
      <div className="flex-1">
        <img
          src={illustration2}
          alt="illustration 2"
          className="scale-y-[0.9]"
        />
      </div>

      <div className="max-w-[500px] mx-auto md:mx-0">
        <h1 className="text-[3rem] leading-[1.2] font-bold text-blue-950">
          Stay organized and connected
        </h1>
        <p className="mt-4">
          Bring your team's work together in one shared space. Choose the
          project view that suits your style, and collaborate no matter where
          you are
        </p>
      </div>
    </section>
  );
}

export default Section2;
