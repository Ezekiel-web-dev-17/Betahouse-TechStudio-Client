import React from "react";
import Header from "../components/Header";
import Discover from "../components/Discover";
import DisplayProperties from "../components/DisplayProperties";

const Home = () => {
  return (
    <main>
      <Header />
      <DisplayProperties />
      <Discover />
    </main>
  );
};

export default Home;
