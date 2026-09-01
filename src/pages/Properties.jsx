import React from "react";
import Header from "../components/Header";
import DisplayProperties from "../components/DisplayProperties";
import Discover from "../components/Discover";

const Properties = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <DisplayProperties isHomePage={false} />
      <Discover />
    </main>
  );
};

export default Properties;
