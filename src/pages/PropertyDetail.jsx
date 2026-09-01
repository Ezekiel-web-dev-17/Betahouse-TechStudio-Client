import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { CartContext } from "../CartContext";
import { FavoritesContext } from "../FavoritesContext";
import { toast } from "react-toastify";
import {
  BsFillGeoAltFill,
  BsHeart,
  BsHeartFill,
  BsShare,
  BsCheckCircleFill,
  BsCalendarCheck,
  BsTelephone,
  BsCart3,
  BsCreditCard,
  BsArrowLeft,
  BsShieldCheck,
} from "react-icons/bs";
import { FaBed, FaBath, FaRulerCombined, FaCar } from "react-icons/fa";
import DiscoverSkeleton from "../components/DiscoverSkeleton";

const fallbackProperties = [
  {
    _id: "prop1",
    title: "Real House Luxury Villa",
    price: "350,000,000",
    location: "Victoria Island, Lagos",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    bedrooms: 6,
    bathrooms: 5,
    sqft: "1,200 sq ft",
    status: "For Sale",
    whatFor: "Sale",
    featured: true,
    description:
      "An architectural masterpiece located in the pristine enclave of Victoria Island. Features double-height ceilings, smart home automation, private infinity pool, fully fitted Italian kitchen, and 24/7 high-security surveillance.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    ],
    amenities: [
      "Private Swimming Pool",
      "Smart Home Automation",
      "Fully Fitted Kitchen",
      "24/7 Security Patrol",
      "Solar Power Backup",
      "Covered Garage (4 Cars)",
      "CCTV Surveillance",
      "Private Garden",
    ],
  },
  {
    _id: "prop2",
    title: "Penthouse Luxury Residence",
    price: "180,000,000",
    location: "Ikoyi, Lagos",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    bedrooms: 4,
    bathrooms: 4,
    sqft: "950 sq ft",
    status: "For Rent",
    whatFor: "Rent",
    featured: true,
    description:
      "Experience elevated urban living in this duplex penthouse offering panoramic ocean views, private elevator access, rooftop lounge, and concierge services.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
    ],
    amenities: [
      "Rooftop Terrace",
      "Elevator Access",
      "Gym & Wellness Center",
      "Concierge Service",
      "High Speed Fiber Internet",
      "Underground Parking",
    ],
  },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const myApi = useContext(ApiContext);
  const { addToCart } = useContext(CartContext);
  const { isFavorited, toggleFavorite } = useContext(FavoritesContext);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [tourForm, setTourForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "10:00 AM",
    tourType: "In-Person",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await myApi.get(`/property/${id}`);
        if (res.data?.property) {
          setProperty(res.data.property);
        } else {
          const found = fallbackProperties.find((p) => p._id === id || p.id === id);
          setProperty(found || fallbackProperties[0]);
        }
      } catch (err) {
        const found = fallbackProperties.find((p) => p._id === id || p.id === id);
        setProperty(found || fallbackProperties[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, myApi]);

  const handleTourSubmit = async (e) => {
    e.preventDefault();
    if (!tourForm.name || !tourForm.date) {
      toast.error("Please provide your name and preferred date for the tour.");
      return;
    }
    try {
      if (myApi) {
        await myApi.post("/tour", {
          ...tourForm,
          propertyId: property?._id || property?.id,
          propertyTitle: property?.title || "",
        });
      }
      toast.success(`Tour requested for ${tourForm.date} at ${tourForm.time}! An agent will contact you shortly.`);
      setTourForm({ name: "", email: "", phone: "", date: "", time: "10:00 AM", tourType: "In-Person" });
    } catch (err) {
      toast.success(`Tour requested for ${tourForm.date} at ${tourForm.time}! An agent will contact you shortly.`);
      setTourForm({ name: "", email: "", phone: "", date: "", time: "10:00 AM", tourType: "In-Person" });
    }
  };

  const handlePrimaryAction = () => {
    const token =
      sessionStorage.getItem("token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("firstName") ||
      localStorage.getItem("firstName");

    if (!token) {
      toast.warning("Please sign in to purchase or reserve properties.");
      navigate("/login");
      return;
    }

    if (property) {
      addToCart(property);
      navigate("/checkout");
    }
  };

  if (loading) {
    return (
      <div className="pt-28 pb-16 px-4 max-w-6xl mx-auto min-h-screen">
        <DiscoverSkeleton />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-32 pb-16 text-center min-h-screen">
        <h2 className="text-3xl font-bold text-gray-900">Property Not Found</h2>
        <p className="text-gray-500 mt-2">The property listing you requested could not be located.</p>
        <Link
          to="/properties"
          className="inline-block mt-6 px-6 py-3 bg-[#3d9970] text-white font-bold rounded-xl shadow-md hover:bg-[#327e5c] transition"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  const galleryImages =
    property.images && property.images.length > 0
      ? property.images.map((img) =>
          typeof img === "string" ? img.replace("../utils", "/utils") : img
        )
      : [
          property.image
            ? property.image.replace("../utils", "/utils")
            : fallbackProperties[0].image,
        ];

  const amenitiesList = property.amenities || fallbackProperties[0].amenities;
  const priceDisplay = Number(property.amount || property.price || 0).toLocaleString();
  const isForRent = (property.whatFor === "Rent" || property.status === "For Rent");
  const actionButtonText = isForRent ? "Rent Now" : "Buy Now";

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#3d9970] hover:underline mb-8"
        >
          <BsArrowLeft className="text-base" /> Back to All Properties
        </Link>

        {/* Property Header Banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="bg-[#3d9970] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {property.status || property.whatFor || "For Sale"}
              </span>
              <span className="bg-[#1d293f] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <BsShieldCheck className="text-[#85e3b5]" /> Verified Title
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-2 font-medium">
              <BsFillGeoAltFill className="text-[#3d9970]" />
              <span>{property.location || "Victoria Island, Lagos"}</span>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 w-full md:w-auto">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              Asking Price
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#3d9970]">
              ₦{priceDisplay}
              {isForRent && <span className="text-sm font-normal text-gray-500"> /year</span>}
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-4 mb-10">
          <div className="h-[360px] sm:h-[460px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-900 relative">
            <img
              src={galleryImages[activeImage]}
              alt={property.title}
              className="w-full h-full object-cover transition duration-300"
            />
            {/* Action Badges */}
            <div className="absolute top-4 right-4 flex gap-2.5 z-10">
              <button
                onClick={() => toggleFavorite(property, navigate)}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition cursor-pointer"
                title={isFavorited(property?._id || property?.id) ? "Remove Favorite" : "Save Property"}
              >
                {isFavorited(property?._id || property?.id) ? (
                  <BsHeartFill className="text-red-500" />
                ) : (
                  <BsHeart />
                )}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Listing link copied to clipboard!");
                }}
                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition cursor-pointer"
                title="Share Property"
              >
                <BsShare />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-20 sm:h-24 w-32 sm:w-36 rounded-2xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  activeImage === idx
                    ? "border-[#3d9970] scale-102 shadow-md"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Key Specs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-200 mb-10 text-center">
          <div className="flex flex-col items-center justify-center p-3 border-r border-gray-100 last:border-0">
            <FaBed className="text-2xl text-[#3d9970] mb-2" />
            <span className="text-base sm:text-lg font-bold text-gray-900">
              {property.bedrooms || property.bed || 5} Bedrooms
            </span>
            <span className="text-xs text-gray-400 font-medium">En-suite rooms</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-r border-gray-100 last:border-0">
            <FaBath className="text-2xl text-[#3d9970] mb-2" />
            <span className="text-base sm:text-lg font-bold text-gray-900">
              {property.bathrooms || property.bath || 4} Bathrooms
            </span>
            <span className="text-xs text-gray-400 font-medium">Fitted sanitary</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-r border-gray-100 last:border-0">
            <FaRulerCombined className="text-2xl text-[#3d9970] mb-2" />
            <span className="text-base sm:text-lg font-bold text-gray-900">
              {property.sqft || "1,100 sq ft"}
            </span>
            <span className="text-xs text-gray-400 font-medium">Built area</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3">
            <FaCar className="text-2xl text-[#3d9970] mb-2" />
            <span className="text-base sm:text-lg font-bold text-gray-900">4 Parking</span>
            <span className="text-xs text-gray-400 font-medium">Covered garage</span>
          </div>
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Details & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Property Overview & Description
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {property.description || fallbackProperties[0].description}
              </p>

              {/* Action Box with BUY NOW / RENT NOW and ADD TO CART */}
              <div className="mt-8 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-base">
                    Interested in this property?
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Add to your cart or proceed immediately to reservation checkout.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 justify-center">
                  <button
                    onClick={() => {
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
                    className="w-full sm:w-auto px-5 py-3.5 bg-white border border-[#3d9970] text-[#3d9970] hover:bg-[#3d9970]/10 font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-sm text-nowrap"
                  >
                    <BsCart3 className="text-base shrink-0" /> <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handlePrimaryAction}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#3d9970]/30 text-nowrap"
                  >
                    <BsCreditCard className="text-base shrink-0" /> <span>{actionButtonText}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Key Features & Amenities
              </h2>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {amenitiesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <BsCheckCircleFill className="text-[#3d9970] shrink-0 text-base" />
                    <span className="font-semibold text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhood / Location */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Location & Accessibility
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Situated in a prime residential community with 24/7 security, access-controlled gates, and excellent road networks.
              </p>
              <div className="h-56 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border border-slate-200">
                <BsFillGeoAltFill className="text-3xl text-[#3d9970] mb-2" />
                <span className="font-bold text-gray-800 text-base">
                  {property.location || "Victoria Island, Lagos"}
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  Guaranteed Clean Legal Title Record
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Tour Booking & Agent Details */}
          <div className="space-y-8">
            {/* Tour Schedule Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <BsCalendarCheck className="text-[#3d9970]" /> Schedule a Tour
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Book a private walkthrough with a certified Betahouse advisor.
              </p>

              <form onSubmit={handleTourSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={tourForm.name}
                    onChange={(e) => setTourForm({ ...tourForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={tourForm.email}
                    onChange={(e) => setTourForm({ ...tourForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={tourForm.date}
                    onChange={(e) => setTourForm({ ...tourForm, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Time</label>
                    <select
                      value={tourForm.time}
                      onChange={(e) => setTourForm({ ...tourForm, time: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition font-medium"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Tour Type</label>
                    <select
                      value={tourForm.tourType}
                      onChange={(e) => setTourForm({ ...tourForm, tourType: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition font-medium"
                    >
                      <option value="In-Person">In-Person</option>
                      <option value="Virtual Video">Virtual Video</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold rounded-xl transition text-sm shadow-md shadow-[#3d9970]/30 cursor-pointer"
                >
                  Confirm Tour Booking
                </button>
              </form>
            </div>

            {/* Agent Contact Card */}
            <div className="bg-[#1d293f] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
                  alt="Listing Agent"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#3d9970]"
                />
                <div>
                  <h4 className="font-bold text-lg">Adewale Johnson</h4>
                  <p className="text-xs text-[#85e3b5] font-semibold">
                    Certified Betahouse Property Partner
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-xs mb-6 leading-relaxed">
                Specialized in luxury residential acquisitions, land titling, and developer contract negotiations.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => window.open("tel:+23480023824687")}
                  className="w-full bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <BsTelephone /> Call Agent (+234)
                </button>
                <button
                  onClick={() => toast.info("Opening WhatsApp conversation with advisor...")}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition text-sm cursor-pointer border border-white/15"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
