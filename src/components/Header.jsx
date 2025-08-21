import React from "react";
import minus from "../../utils/span.bedroom-count-btn.svg";
import plus from "../../utils/span.bedroom-count-btn (1).svg";

const Header = () => {
  return (
    <div className="h-screen place-content-center head">
      <div className="mb-6 flex flex-col gap-10 text-white">
        <h1 className="font-extrabold text-7xl">Browse Our Properties</h1>
        <p className=" font-normal">
          Find your perfect home among our curated properties. Start browsing
          now!
        </p>

        <div className=" bg-amber-50 flex gap-x-6 w-3/4 place-self-center rounded-2xl find z-10 relative after:rounded-xl">
          <div className="filter text-black flex justify-between px-5 py-3 w-full font-semibold">
            <div className="by-location w-1/4">
              <h5>LOCATION</h5>
              <p className="opacity-75 font-normal">e.g Gbagada</p>
            </div>
            <div className="by-type border-x-4 border-gray-300 w-1/2">
              <h5>PROPERTY-TYPE</h5>
              <p className="opacity-75 font-normal">e.g Duplex, Bedroom Flat</p>
            </div>
            <div className="by-bedrooms w-1/4 flex flex-col items-center gap-2">
              <h5>BEDROOM</h5>
              <div className="items-center flex w-fulll gap-4 flex-nowrap">
                <img
                  className="cursor-pointer"
                  src={minus}
                  alt="increment no of bedrooms"
                />
                <p className=" mb-0 font-normal">0</p>
                <img
                  className="cursor-pointer"
                  src={plus}
                  alt="decrement no of bedrooms"
                />
              </div>
            </div>
          </div>
          <button className="rounded-2xl rounded-s-none text-white text-xl text-logo min-w-1/4 cursor-pointer">
            Find Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
