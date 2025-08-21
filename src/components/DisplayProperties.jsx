import React from "react";
import filterImg from "../../utils/Icon (1).svg";
import { IoIosArrowDown } from "react-icons/io";

const DisplayProperties = () => {
  return (
    <section className="px-34 pt-15">
      <div className="flex items-center justify-between text-xl font-medium">
        <div className=" flex gap-x-10">
          <div className="more-filter flex gap-4">
            <img src={filterImg} alt="" />
            <p>More Filter</p>
          </div>
          <p>Showing 1 - 9 of 15 results</p>
        </div>

        <div className="flex items-center gap-4 relative">
          <p className="opacity-60 text-xl">Sort by: </p>

          <select
            name=""
            id=""
            className="text-xl border-gray-500 font-semibold px-4 appearance-none bg-white border py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
    "
          >
            <option value="Default">Default</option>
            <option value="Alphabetical">Alphabetical</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>

          <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>
    </section>
  );
};

export default DisplayProperties;
