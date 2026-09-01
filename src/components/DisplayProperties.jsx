import React, { useContext, useEffect, useRef, useState } from "react";
import filterImg from "../assets/Icon (1).svg";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillGeoAltFill, BsShare, BsHeart, BsCartPlus, BsArrowRight } from "react-icons/bs";
import imglink1 from "../assets/Vector (9).svg";
import imglink2 from "../assets/Vector (8).svg";
import imglink3 from "../assets/Vector (7).svg";
import bed from "../assets/Icon.svg";
import bathroom from "../assets/Vector (6).svg";
import { toast } from "react-toastify";
import queryArrow from "../assets/Vector (10).svg";
import { ApiContext, PropertiesContext } from "../ApiContext";
import { CartContext } from "../CartContext";
import { Link, useNavigate } from "react-router-dom";
import LoaderComp from "./LoaderComp";

const DisplayProperties = ({ isHomePage = false }) => {
  const { propertiesFromApi, setPropertiesFromApi } = useContext(PropertiesContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(
    "Loading properties..."
  );
  const [active, setActive] = useState(1);
  const myApi = useContext(ApiContext);

  const retryCountRef = useRef(0);
  const timerRef = useRef(null);
  const MAX_RETRIES = 5;

  const getProperties = async (isRetry = false) => {
    if (!isRetry) {
      retryCountRef.current = 0;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (propertiesFromApi && propertiesFromApi.length >= 1) {
      setProperties(propertiesFromApi);
      setFilterMode(true);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pageParam = isHomePage ? 1 : active;
      const limitParam = isHomePage ? 9 : 9;
      const res = await myApi.get(`/property?page=${pageParam}&limit=${limitParam}`);
      if (res.data?.properties) {
        setProperties(res.data.properties);
        setFilterMode(false);
        setLoading(false);
        retryCountRef.current = 0;
      }
    } catch (err) {
      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        setMessage(`Connecting to server, retrying (${retryCountRef.current}/${MAX_RETRIES})...`);
        timerRef.current = setTimeout(() => getProperties(true), 3000);
      } else {
        console.error("Error fetching properties:", err);
        setLoading(false);
        const errMsg = "Unable to connect to the server. Please check your internet connection or reload the page.";
        setError(errMsg);
        toast.error(errMsg);
      }
    }
  };

  const sortBy = async (by, order) => {
    try {
      setLoading(true);
      setError(null);
      const res = await myApi.get(`/property/sort-by-${by}?order=${order}`);
      if (res.data?.properties) {
        setProperties(res.data.properties);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to sort properties.");
    }
  };

  useEffect(() => {
    getProperties();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, myApi, propertiesFromApi, isHomePage]);

  const displayedProperties = isHomePage ? properties.slice(0, 9) : properties;

  return (
    <section className="px-6 sm:px-10 lg:px-24 pt-12 pb-16 relative">
      {!filterMode && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[16px] sm:text-xl font-medium mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-10">
            {!isHomePage && (
              <div className="more-filter flex items-center gap-3">
                <img src={filterImg} alt="" />
                <p className="text-nowrap font-semibold">More Filter</p>
              </div>
            )}
            <p className="text-nowrap text-gray-700 font-semibold text-base sm:text-lg">
              {isHomePage
                ? "Featured Properties (Top 9 Listings)"
                : `Showing ${
                    properties.length > 9
                      ? "Properties in sorted order"
                      : active === 1
                      ? "1 - 9"
                      : "10 - 15"
                  } of 15 results`}
            </p>
          </div>

          {!isHomePage && (
            <div className="flex items-center gap-2 relative">
              <p className="opacity-75 text-sm sm:text-base text-nowrap font-medium">Sort by: </p>
              <select
                className="text-sm sm:text-base font-semibold px-4 appearance-none bg-white py-2 ps-3 pr-8 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3d9970] cursor-pointer shadow-sm"
                onChange={(e) => {
                  let value = e.target.value;
                  value === "Alphabetical"
                    ? sortBy("title", "asc")
                    : value === "Price: Low to High"
                    ? sortBy("price", "asc")
                    : value === "Price: High to Low"
                    ? sortBy("price", "des")
                    : getProperties();
                }}
              >
                <option value="Default">Default</option>
                <option value="Alphabetical">Alphabetical</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="text-center my-14 flex flex-col items-center justify-center">
          <LoaderComp />
          <p className="mt-4 font-semibold text-base sm:text-lg text-gray-700">{message}</p>
        </div>
      )}

      {error && !loading && (
        <div className="text-center my-10 p-6 bg-red-50 border border-red-200 rounded-2xl max-w-lg mx-auto shadow-sm">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => getProperties()}
              className="px-5 py-2 bg-[#3d9970] text-white rounded-xl cursor-pointer hover:bg-[#327e5c] transition font-medium text-sm shadow"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-gray-800 text-white rounded-xl cursor-pointer hover:bg-gray-700 transition font-medium text-sm"
            >
              Reload Page
            </button>
          </div>
        </div>
      )}

      {filterMode && !loading && (
        <div
          className="flex gap-4 items-center cursor-pointer mb-6"
          onClick={() => {
            setPropertiesFromApi([]);
            getProperties();
          }}
        >
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-800 font-bold text-sm transition">
            <img src={queryArrow} className="rotate-180 w-3 h-3" alt="Back button" />
            <span>Back to All</span>
          </button>
          <p className="text-nowrap text-base sm:text-lg font-semibold text-gray-700">
            Showing {propertiesFromApi.length} filtered results
          </p>
        </div>
      )}

      {/* Grid of Properties */}
      <div className="properties grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {displayedProperties.map((property) => (
          <div
            key={property._id || property.id}
            className="rounded-2xl border border-gray-200 bg-white group overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
          >
            <div className="max-h-64 overflow-hidden relative">
              <div className="flex justify-between items-center w-full z-10 pointer-events-none">
                <span className="rounded-lg absolute left-4 top-4 px-3.5 py-1 bg-[#3d9970] font-bold text-xs text-white shadow-xs">
                  Featured
                </span>
                <span className="rounded-lg absolute right-4 top-4 px-3.5 py-1 bg-white/90 backdrop-blur-xs text-gray-800 font-bold text-xs shadow-xs">
                  For {property.whatFor || "Sale"}
                </span>
              </div>

              {/* Action Floating Icons */}
              <div className="flex gap-2.5 bottom-3.5 right-3.5 absolute z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(
                      `${window.location.origin}/properties/${property._id || property.id}`
                    );
                    toast.success("Link copied to clipboard!");
                  }}
                  className="bg-white/30 hover:bg-white/50 text-gray-700 rounded-full p-2 shadow-md transition hover:scale-110 cursor-pointer"
                  title="Copy Link"
                >
                  <img className="w-3.5 h-3.5" src={imglink1} alt="Copy link" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const token =
                      sessionStorage.getItem("token") ||
                      localStorage.getItem("token") ||
                      sessionStorage.getItem("firstName") ||
                      localStorage.getItem("firstName");
                    if (!token) {
                      toast.warning("Please sign in to add properties to your favorites.");
                      navigate("/login");
                      return;
                    }
                    toast.success("Added to favorites!");
                  }}
                  className="bg-white/30 hover:bg-white/50 text-gray-700 rounded-full p-2 shadow-md transition hover:scale-110 cursor-pointer"
                  title="Favorite"
                >
                  <BsHeart className="text-sm text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const token =
                      sessionStorage.getItem("token") ||
                      localStorage.getItem("token") ||
                      sessionStorage.getItem("firstName") ||
                      localStorage.getItem("firstName");
                    if (!token) {
                      toast.warning("Please sign in to add properties to your cart.");
                      navigate("/login");
                      return;
                    }
                    addToCart(property);
                  }}
                  className="bg-[#3d9970] hover:bg-[#327e5c] text-white rounded-full p-2 shadow-md transition hover:scale-110 cursor-pointer"
                  title="Add to Cart"
                >
                  <BsCartPlus className="text-sm" />
                </button>
              </div>

              <Link to={`/properties/${property._id || property.id}`}>
                <img
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                  src={
                    property.image
                      ? property.image.replace("../utils", "/utils")
                      : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
                  }
                  alt={property.title}
                />
              </Link>
            </div>

            {/* Card Content Body */}
            <div className="text-start p-5 flex flex-col gap-3">
              <Link to={`/properties/${property._id || property.id}`}>
                <h4 className="font-bold text-gray-900 text-lg hover:text-[#3d9970] transition line-clamp-1">
                  {property.title}
                </h4>
              </Link>

              <div className="flex gap-2 items-center text-xs text-gray-500 font-medium">
                <BsFillGeoAltFill className="text-[#3d9970]" />
                <span className="truncate">{property.location || "Victoria Island, Lagos"}</span>
              </div>

              <div className="flex gap-4 items-center text-xs text-gray-600 font-semibold py-2 border-y border-gray-100">
                <div className="flex gap-1.5 items-center">
                  <img src={bed} alt="" className="w-4 h-4" />
                  <span>{property.bed || 4} Beds</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <img src={bathroom} alt="" className="w-4 h-4" />
                  <span>{property.bath || 3} Baths</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Price</span>
                  <h4 className="font-extrabold text-lg text-[#3d9970]">
                    ₦{Number(property.amount || property.price || 0).toLocaleString()}
                    {property.whatFor === "Rent" ? <span className="text-xs font-normal text-gray-500">/yr</span> : ""}
                  </h4>
                </div>

                <Link
                  to={`/properties/${property._id || property.id}`}
                  className="px-4 py-2 bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold text-xs rounded-xl shadow-xs transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* HOME PAGE: View More Properties Button */}
      {isHomePage && (
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/properties")}
            className="inline-flex items-center gap-2 bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-[#3d9970]/30 transition transform hover:-translate-y-0.5 text-base cursor-pointer"
          >
            <span>View More Properties</span>
            <BsArrowRight className="text-lg" />
          </button>
        </div>
      )}

      {/* PROPERTIES PAGE: Pagination */}
      {!isHomePage && !filterMode && properties.length <= 9 && (
        <div className="paginator cursor-pointer font-semibold text-lg flex gap-4 items-center justify-center mt-12">
          <button
            onClick={() => setActive((prev) => Math.max(1, prev - 1))}
            disabled={active === 1}
            className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition shadow-xs"
          >
            <img src={queryArrow} className="rotate-180 w-3 h-3" alt="previous page" />
          </button>

          <button
            onClick={() => setActive(1)}
            className={`w-10 h-10 rounded-xl font-bold transition ${
              active === 1
                ? "bg-[#3d9970] text-white shadow-md shadow-[#3d9970]/30"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            1
          </button>

          <button
            onClick={() => setActive(2)}
            className={`w-10 h-10 rounded-xl font-bold transition ${
              active === 2
                ? "bg-[#3d9970] text-white shadow-md shadow-[#3d9970]/30"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            2
          </button>

          <button
            onClick={() => setActive((prev) => Math.min(2, prev + 1))}
            disabled={active === 2}
            className="p-3 rounded-xl bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition shadow-xs"
          >
            <img src={queryArrow} className="w-3 h-3" alt="next page" />
          </button>
        </div>
      )}
    </section>
  );
};

export default DisplayProperties;
