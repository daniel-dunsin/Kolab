import React from "react";
import Navbar from "../components/home/Navbar";
import Banner from "../components/home/Banner";
import Section2 from "../components/home/Section2";

function Home() {
  return (
    <section className="bg-[#f4f4f4] min-h-screen">
      <Navbar />
      <Banner />
      <Section2 />
    </section>
  );
}

export default Home;
