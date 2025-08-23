import React, { useContext, useEffect, useState } from "react";
import filterImg from "../assets/Icon (1).svg";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillGeoAltFill, BsShare, BsHeart } from "react-icons/bs";
import imglink1 from "../assets/Vector (9).svg";
import imglink2 from "../assets/Vector (8).svg";
import imglink3 from "../assets/Vector (7).svg";
import arrowToFro from "../assets/Vector (4).svg";
import bed from "../assets/Icon.svg";
import bathroom from "../assets/Vector (6).svg";
import { toast } from "react-toastify";
import queryArrow from "../assets/Vector (10).svg";
import { ApiContext, PropertiesContext } from "../ApiContext";
import LoaderComp from "./LoaderComp";
const DisplayProperties = () => {
  const { propertiesFromApi, setPropertiesFromApi } =
    useContext(PropertiesContext);
  const [properties, setProperties] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(
    "Waking up the server this may take a few seconds..."
  );
  const [active, setActive] = useState(1);
  const myApi = useContext(ApiContext);

  const checkServer = async () => {
    try {
      const res = await myApi.get("/property");
      if (res.data) {
        setMessage("✅ Server is awake! 🚀 Fetching properties...");
        getProperties();
      } else {
        setTimeout(checkServer, 3000);
      }
    } catch (err) {
      // server still cold
      console.log(err);
      setTimeout(checkServer, 3000);
    }
  };

  const getProperties = async () => {
    try {
      if (propertiesFromApi.length >= 1) {
        setProperties(propertiesFromApi);
        setFilterMode(true);
      } else {
        const res = await myApi.get(`/property?page=${active}&lmt=9`);
        setProperties(res.data.properties);
        setFilterMode(false);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching properties:", err);
      setError(`${err?.response?.data?.message}. Try refreshing the page.`);
      toast.error("Failed to fetch properties.");
    }
  };

  useEffect(() => {
    setLoading(true);
    checkServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, myApi, propertiesFromApi]);

  console.log(properties);
  return (
    <section className="px-10 lg:px-34 pt-15 relative">
      {loading && LoaderComp}

      {!filterMode && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[16px] sm:text-xl font-medium">
          <div className=" flex flex-col md:flex-row gap-x-10">
            <div className="more-filter flex gap-4">
              <img src={filterImg} alt="" />
              <p className="text-nowrap">More Filter</p>
            </div>
            <p className="text-nowrap">
              Showing {active === 1 ? "1 - 9 of 15" : "10 - 15"} of 15 results
            </p>
          </div>

          <div className="flex items-center gap-1 lg:gap-4 relative lg:w-1/4">
            <p className="opacity-60 text-xl text-nowrap">Sort by: </p>

            <select
              name=""
              id=""
              className="text-[16px] lg:text-xl font-semibold px-4 appearance-none bg-white py-1 lg:py-2 ps-1 lg:pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 max-w-8/12
    "
            >
              <option value="Default">Default</option>
              <option value="Alphabetical">Alphabetical</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>

            <IoIosArrowDown className="absolute right-1 lg:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
      )}
      {loading && (
        <div className="text-center my-10">
          <LoaderComp />
          <p className="mt-4 font-semibold text-lg">{message}</p>
        </div>
      )}
      {error && toast.error(error)}

      {filterMode && !loading && (
        <div
          className="w-30 flex gap-10 items-center cursor-pointer"
          onClick={() => {
            setPropertiesFromApi([]);
            getProperties();
          }}
        >
          <img
            src={queryArrow}
            className="rotate-180 absolute"
            alt="Back button"
          />
          <h4 className="text-2xl ps-5 font-bold font-mono opacity-75">Back</h4>
          <p className="text-nowrap text-xl font-medium">
            Showing{" "}
            {propertiesFromApi.length >= 1
              ? `${propertiesFromApi.length} `
              : " "}
            results
          </p>
        </div>
      )}

      <div className="properties grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {properties.map((property) => (
          <div
            key={property._id}
            className="rounded-xl border-2 border-gray-300 min-w-3/4 md:min-w-1/3"
          >
            <div className="max-h-[265px] overflow-hidden relative">
              <div className="justify-between space-between">
                <button
                  className="rounded absolute left-5 top-4 px-5 py-2 bg-[var(--accent-color)] font-medium text-[13px] text-white"
                  disabled
                >
                  Featured
                </button>
                <button
                  className="rounded absolute right-5 top-4 px-5 py-2 bg-gray-200 font-medium text-[13px] text-white "
                  disabled
                >
                  For {property.whatFor}
                </button>
                <div className="flex gap-9 bottom-5 right-5 absolute">
                  <img
                    className="bg-gray-400 rounded p-1 overflow-visible w-1/6"
                    src={imglink1}
                    alt=""
                  />
                  <img
                    className="bg-gray-400 rounded p-1 overflow-visible w-1/6"
                    src={imglink2}
                    alt=""
                  />
                  <img
                    className="bg-gray-400 rounded p-1 overflow-visible w-1/6"
                    src={imglink3}
                    alt=""
                  />
                </div>
              </div>
              <img
                className="rounded-t-xl"
                src={`${property.image.replace("../utils", "/utils")}`}
                alt=""
              />
            </div>
            <div className="text-start p-4 flex flex-col gap-4">
              <h4 className="opacity-70 font-semibold text-[20px]">
                {property.title}
              </h4>
              <div className="flex gap-2 items-center">
                <BsFillGeoAltFill className="opacity-40" /> {property.location}
              </div>
              <div className="flex gap-6 flex-col lg:flex-row">
                <div className="bed-sect flex gap-2 items-center">
                  <img src={bed} />
                  <p>{property.bed} Bedrooms</p>
                </div>
                <div className="bath-sect flex gap-2 items-center">
                  <img src={bathroom} />
                  <p>{property.bath} Bathrooms</p>
                </div>
              </div>
              <div className="border-t-2 border-gray-300 flex flex-col lg:flex-row justify-between pt-3">
                <h4 className="font-semibold lg:text-2xl text-xl opacity-70 pb-2 lg:px-0">
                  ₦{Number(property.amount).toLocaleString()}
                  {property.whatFor === "Rent" ? "/1Year" : ""}
                </h4>

                <div className="flex items-center gap-3 place-content-center lg:place-content-end">
                  <img
                    width="20px"
                    src={arrowToFro}
                    alt="share between two user"
                  />
                  <BsShare />
                  <BsHeart />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!filterMode && (
        <div className="paginator cursor-pointer font-semibold text-2xl flex gap-8 items-center place-content-center mt-10">
          <img
            src={queryArrow}
            className="opacity-50 active:opacity-100 rotate-180"
            alt="srcoll back arrow"
            onClick={() => setActive((prevActive) => prevActive - 1)}
          />
          <div
            onClick={(e) => {
              e.preventDefault();
              if (active !== 1) {
                setActive(1);
              }
            }}
            className={`opacity-60 ${
              active === 1
                ? "rounded px-2 py-1 text-white bg-[var(--accent-color)]"
                : ""
            } w-8`}
          >
            1
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              if (active !== 2) {
                setActive(2);
              }
            }}
            className={`opacity-60 ${
              active === 2
                ? "rounded-xl px-2 py-1 text-white bg-[var(--accent-color)]"
                : ""
            } w-8`}
          >
            2
          </div>

          <img
            src={queryArrow}
            alt="scroll to next arrow"
            className="opacity-50 active:opacity-100"
            onClick={() => {
              setActive((prevActive) => prevActive + 1);
            }}
          />
        </div>
      )}
    </section>
  );
};

export default DisplayProperties;
