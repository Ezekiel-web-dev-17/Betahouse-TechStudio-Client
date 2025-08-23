import minus from "../utils/span.bedroom-count-btn.svg";
import plus from "../utils/span.bedroom-count-btn (1).svg";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ApiContext, PropertiesContext } from "../ApiContext";

const Header = () => {
  const { setPropertiesFromApi } = useContext(PropertiesContext);
  const [noOfBeds, setNoOfBeds] = useState(4);
  const [filterBy, setFillterBy] = useState({
    location: "",
    type: "",
    noOfBeds,
  });
  const myApi = useContext(ApiContext);
  const handleIncrement = (e) => {
    e.preventDefault();
    setNoOfBeds((prevBedNo) => prevBedNo + 1);
  };
  const handleDecrement = (e) => {
    e.preventDefault();
    setNoOfBeds((prevBedNo) => prevBedNo - 1);
  };

  const filterChange = (e) => {
    e.preventDefault();
    setFillterBy({ ...filterBy, [e.target.name]: e.target.value });
  };

  const filterSubmit = async (e) => {
    e.preventDefault();
    const response = await myApi.get(`/property/filter`, {
      params: {
        bed: noOfBeds,
        type: filterBy.type,
        locate: filterBy.location,
      },
    });

    setPropertiesFromApi(response.data.properties);
  };
  return (
    <div
      className="[@media(width:320px)]:h-[140vh]
 h-screen place-content-center head "
    >
      <div className="mb-6 flex flex-col gap-10 text-white">
        <h1 className="font-extrabold text-4xl mt-12 text-wrap md:text-5xl md:mt-9">
          Browse
          <br className="md:hidden" /> Our Properties
        </h1>
        <p className="font-normal text-xl w-1/2 text-wrap place-self-center">
          Find your perfect home among our curated properties. Start browsing
          now!
        </p>

        <form
          method="POST"
          onSubmit={filterSubmit}
          className=" bg-white w-1/4 min-w-1/2 flex gap-x-6 flex-col lg:flex-row lg:w-3/4 place-self-center rounded-xl lg:rounded-2xl find z-10 relative after:rounded-xl after:w-[120%] after:-left-5 md:after:-left-9 lg:after:-left-[2.5%] lg:after:w-[105%] after:h-[120%] after:-top-6  lg:after:-top-1/4 lg:after:h-[150%]"
        >
          <div className="filter items-center text-black flex flex-col lg:flex-row justify-between lg:ps-5 py-3 w-full font-semibold">
            <div className="by-location lg:w-1/4">
              <h5>LOCATION</h5>
              <input
                name="location"
                className="opacity-75 font-normal px-3 py-1 w-35 rounded-[5px]"
                type="text"
                placeholder="e.g Gbagada"
                value={filterBy.location}
                onChange={filterChange}
              />
            </div>
            <div className="by-type border-y-2 lg:border-x-4 lg:border-y-0 py-3 lg:py-0 place-content-center border-gray-300 w-full lg:w-1/2">
              <h5>PROPERTY-TYPE</h5>
              <input
                name="type"
                className="opacity-75 font-normal px-3 py-1 lg:max-w-70 w-40 lg:w-fit rounded-[5px]"
                type="text"
                placeholder="e.g Duplex, Bedroom Flat"
                value={filterBy.type}
                onChange={filterChange}
              />
            </div>
            <div className="by-bedrooms lg:w-1/4 flex flex-col items-center gap-2">
              <h5>BEDROOM</h5>
              <div className="items-center flex w-fulll gap-4 flex-nowrap">
                <img
                  className="cursor-pointer"
                  src={minus}
                  alt="increment no of bedrooms"
                  onClick={
                    noOfBeds >= 1
                      ? handleDecrement
                      : toast.warning(
                          "A property with One(1) bedroom is the lowest possible number of bedrooms you can ever find at Betahouse."
                        )
                  }
                />
                <p className=" mb-0 font-normal">{noOfBeds}</p>
                <img
                  className="cursor-pointer"
                  src={plus}
                  alt="decrement no of bedrooms"
                  onClick={
                    noOfBeds <= 9
                      ? handleIncrement
                      : toast.warning(
                          "A property with Nine (9) bedroom is the maximum possible number of bedrooms you can ever find at Betahouse."
                        )
                  }
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-b-xl rounded-t-none lg:rounded-e-2xl lg:rounded-s-none text-white text-xl text-logo min-w-1/4 cursor-pointer py-2"
          >
            Find Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
