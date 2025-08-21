import { BsFillGeoAltFill } from "react-icons/bs";
import discover1 from "../../utils/Discover1.svg";
import discover2 from "../../utils/Discover2.svg";
import discover3 from "../../utils/Discover3.svg";
import discover4 from "../../utils/Discover4.svg";
import backArr from "../../utils/backArr.svg";
import nextArr from "../../utils/nextArr.svg";
import { useRef, useState } from "react";

const discoverApi = [
  {
    title: "Semi Detached Duplex",
    price: "1, 430,000,000",
    image: discover1,
  },
  {
    title: "Special Duplex",
    price: "670,000,000",
    image: discover2,
  },
  {
    title: "Split-Level House",
    price: "340,000,000",
    image: discover3,
  },
  {
    title: "Twin Duplex",
    price: "290,000,000",
    image: discover4,
  },
  {
    title: "Semi Detached Duplex",
    price: "1, 430,000,000",
    image: discover1,
  },
  {
    title: "Special Duplex",
    price: "670,000,000",
    image: discover2,
  },
  {
    title: "Twin Duplex",
    price: "290,000,000",
    image: discover4,
  },
];

const Discover = () => {
  const discoverRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [activeLeft, setActiveLeft] = useState(false);
  const [activeRight, setActiveRight] = useState(false);
  const itemWidth = 265; // width of one card (adjust if needed)
  const maxIndex = 3;

  const handleSwipeRight = (e) => {
    setActiveLeft(false);
    setActiveRight(true);
    e.preventDefault();
    if (index < maxIndex) {
      setIndex(index + 1);
    }
  };

  const handleSwipeLeft = (e) => {
    setActiveLeft(true);
    setActiveRight(false);
    e.preventDefault();
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  return (
    <section className="m-20 flex flex-col gap-10 px-14 relative">
      <h3 className="font-semibold text-4xl">
        Discover Our Popular Properties
      </h3>

      <img
        src={backArr}
        alt="Back Arrow"
        className={`bg-[#3d9970] ${
          activeLeft ? "opacity-100" : "opacity-70"
        } outline-2 outline-zinc-500 rounded-3xl p-5 px-4 absolute top-1/2 z-10 -left-8 drop-shadow-xl/50 ${
          index > 0 ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={handleSwipeLeft}
      />

      <div className="overflow-x-hidden text-white w-full">
        <div
          className="w-9/10 flex gap-x-9 items-center"
          ref={discoverRef}
          style={{
            transform: `translateX(-${index * (itemWidth + 45)}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {discoverApi.map((discover, i) => (
            <div key={i} className="disc relative min-w-1/4">
              <img src={discover.image} alt="Discover properties first image" />
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
        } bg-[#3d9970] rounded-4xl outline-2 outline-zinc-500 py-5 px-4 absolute top-1/2 z-10 -right-8 drop-shadow-xl/50 ${
          maxIndex > index ? "cursor-pointer" : "cursor-not-allowed "
        }`}
        onClick={handleSwipeRight}
      />
    </section>
  );
};

export default Discover;
