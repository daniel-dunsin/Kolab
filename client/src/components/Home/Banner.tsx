import React from "react";
import illustration1 from "../../assets/images/Boy Illustration.png";
import kite from "../../assets/images/Plane Element.png";
import analytics from "../../assets/images/Analytics Card 2.png";
import whiteboard from "../../assets/images/Whiteboard Element.png";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function Banner() {
  return (
    <section className="flex  gap-[2rem] flex-wrap md:flex-row flex-col max-w-[1000px] mx-auto px-[1rem] py-[3rem]">
      {/*banner text 1  */}
      <div className="relative max-w-[500px] mt-5 flex flex-col items-center justify-center lg:block text-center lg:text-left lg:mx-0 mx-auto">
        <h1 className="text-[3rem] leading-[1.2] font-bold text-blue-950">
          New Home for Collaboration
        </h1>
        <p className="mt-4">
          The online collaborative whiteboard platform to bring teams together,
          anytime, anywhere.
        </p>

        <Link to={"/signup"} className="block mt-6">
          <Button text="Get Started" icon={<BsArrowRight />} />
        </Link>

        <p className="text-[.9rem] text-mainBlack mt-2">
          Free forever - no credit card required
        </p>

        <img
          src={kite}
          loading="lazy"
          className="absolute top-[20%] -translate-y-[50%] left-[58%] scale-90 hidden lg:block"
        />
      </div>
      {/* banner image 1 */}
      <div className="flex-1 lg:flex items-center justify-end scale-y-[0.9] hidden relative">
        <img src={illustration1} alt="illustration1" />
        <img
          src={whiteboard}
          alt="whiteboard"
          className="absolute top-[25%] right-[63%] "
        />
        <img src={analytics} className="absolute top-[80%] right-[0%]" />
      </div>
    </section>
  );
}

export default Banner;
