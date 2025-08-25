import { BsFillGeoAltFill } from "react-icons/bs";
import backArr from "../assets/backArr.svg";
import nextArr from "../assets/nextArr.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";
import LoaderComp from "./LoaderComp";

const Discover = () => {
  const discoverRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [activeLeft, setActiveLeft] = useState(false);
  const [activeRight, setActiveRight] = useState(false);
  const [discoverApi, setDiscoverApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
    "Waking up the server, this may take a few seconds..."
  );
  const itemWidth = 265; // width of one card (adjust if needed)
  const maxIndex = 1;
  const mobile = window.innerWidth;
  const myApi = useContext(ApiContext);

  const getDiscover = async () => {
    try {
      setLoading(true);
      const discover = await myApi.get("/discover/");

      setDiscoverApi(discover.data.properties);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSwipeRight = (e) => {
    if (mobile <= 1270) return;
    setActiveLeft(false);
    setActiveRight(true);
    e.preventDefault();
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  };

  const handleSwipeLeft = (e) => {
    if (mobile <= 1270) return;
    setActiveLeft(true);
    setActiveRight(false);
    e.preventDefault();
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    setMessage("Server is awake! Fetching popular properties...");
    getDiscover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="my-18 mx-10 lg:m-20 flex flex-col gap-10 lg:px-14 relative">
      <h3 className="font-semibold text-4xl">
        Discover Our Popular Properties
      </h3>
      {mobile <= 1270 && <h6>Scroll to view more.</h6>}
      {loading && (
        <div className="text-center my-10">
          <LoaderComp />
          <p className="mt-4 font-thin text-lg">{message}</p>
        </div>
      )}

      <img
        src={backArr}
        alt="Back Arrow"
        className={`bg-[#3d9970] ${
          activeLeft ? "opacity-100" : "opacity-70"
        } outline-2 outline-zinc-500 rounded-3xl p-5 px-4 hidden lg:block absolute top-1/2 z-10 -left-8 drop-shadow-xl/50 ${
          index > 0 ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={handleSwipeLeft}
      />

      <div className="overflow-x-scroll lg:overflow-x-hidden text-white w-full">
        <div
          className="w-9/10 flex gap-x-9 items-center"
          ref={discoverRef}
          style={{
            transform: `translateX(-${
              index * (itemWidth + itemWidth * 2 + 41)
            }px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {discoverApi.map((discover, i) => (
            <div
              key={i}
              className="disc relative min-w-11/12 sm:min-w-5/12 lg:min-w-1/4"
            >
              <img
                src={discover.image.replace("../utils", "/utils")}
                alt="Discover properties first image"
              />
              <div className="absolute bottom-0 w-4/4 flex flex-col items-start gap-2 rounded-b-xl bg-[#4a4a4c33] p-4 backdrop-blur-xs">
                <h5 className="font-semibold text-xl">{discover.title}</h5>
                <h5 className="font-semibold text-xl">₦{discover.price}</h5>
                <p>6 Bed | 3 Bath | 720 sq ft</p>
                <div className="house-location flex gap-3">
                  <BsFillGeoAltFill />
                  <p>Victoria Island, Lagos</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img
        src={nextArr}
        alt="Next Arrow"
        className={`${
          activeRight ? "opacity-100" : "opacity-70"
        } bg-[#3d9970] rounded-4xl outline-2 outline-zinc-500 py-5 px-4 hidden lg:block absolute top-1/2 z-10 -right-8 drop-shadow-xl/50 ${
          maxIndex > index ? "cursor-pointer" : "cursor-not-allowed "
        }`}
        onClick={handleSwipeRight}
      />
    </section>
  );
};

export default Discover;
