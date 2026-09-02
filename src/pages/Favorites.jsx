import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { FavoritesContext } from "../FavoritesContext";
import { CartContext } from "../CartContext";
import LoaderComp from "../components/LoaderComp";
import {
  BsHeartFill,
  BsFillGeoAltFill,
  BsCart3,
  BsTrash,
  BsArrowRight,
} from "react-icons/bs";
import { FaBed, FaBath } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";

const Favorites = () => {
  const navigate = useNavigate();
  const myApi = useContext(ApiContext);
  const { toggleFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  const [favProperties, setFavProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavList = async () => {
    if (!myApi) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await myApi.get("/property/favorites");
      if (res.data?.success && Array.isArray(res.data?.favorites)) {
        // filter out any null/undefined items
        setFavProperties(res.data.favorites.filter((f) => f && typeof f === "object"));
      } else {
        setFavProperties([]);
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
      setFavProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavList();
  }, [myApi]);

  const handleRemove = async (property) => {
    await toggleFavorite(property);
    setFavProperties((prev) =>
      prev.filter((p) => (p._id || p.id) !== (property._id || property.id))
    );
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <LoaderComp />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3d9970] hover:underline mb-2"
          >
            <FiArrowLeft /> Back to Properties
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <BsHeartFill className="text-red-500" /> Saved Properties
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Your saved shortlist of luxury real estate listings on Betahouse.
          </p>
        </div>

        {favProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-2xl">
              <BsHeartFill />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Saved Properties</h3>
            <p className="text-gray-500 text-sm mb-6">
              You haven't saved any property listings to your favorites yet. Click the heart icon on any property card to save it here.
            </p>
            <Link
              to="/properties"
              className="inline-block bg-[#3d9970] hover:bg-[#327e5c] text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-md"
            >
              Discover Properties
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favProperties.map((item) => {
              const imgUrl = item.image
                ? item.image.replace("../utils", "/utils")
                : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800";
              const price = Number(item.amount || item.price || 0).toLocaleString();

              return (
                <div
                  key={item._id || item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-200 transition flex flex-col group"
                >
                  <div className="h-52 relative overflow-hidden bg-gray-900">
                    <img
                      src={imgUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#3d9970] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {item.status || item.whatFor || "For Sale"}
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-red-50 text-red-500 flex items-center justify-center shadow-md transition cursor-pointer"
                      title="Remove from Saved"
                    >
                      <BsTrash className="text-sm" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-[#3d9970] transition line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 mb-4">
                        <BsFillGeoAltFill className="text-[#3d9970] shrink-0" />
                        <span className="truncate">{item.location || "Victoria Island, Lagos"}</span>
                      </p>

                      <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 pb-4 border-b border-gray-100">
                        <span className="flex items-center gap-1.5">
                          <FaBed className="text-[#3d9970]" /> {item.bedrooms || item.bed || 4} Beds
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaBath className="text-[#3d9970]" /> {item.bathrooms || item.bath || 3} Baths
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Price</span>
                        <span className="text-base font-extrabold text-[#3d9970]">₦{price}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="p-2.5 bg-slate-100 hover:bg-[#3d9970] hover:text-white text-gray-700 rounded-xl transition cursor-pointer text-sm"
                          title="Add to Cart"
                        >
                          <BsCart3 />
                        </button>
                        <Link
                          to={`/properties/${item._id || item.id}`}
                          className="px-3 py-2.5 bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold rounded-xl text-xs transition flex items-center gap-1 shadow-sm"
                        >
                          Details <BsArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
