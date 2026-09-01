import React from "react";
import Header from "../components/Header";
import Discover from "../components/Discover";
import DisplayProperties from "../components/DisplayProperties";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <DisplayProperties isHomePage={true} />
      <Discover />
    </main>
  );
};

export default Home;
