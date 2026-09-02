import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { ApiContext } from "../ApiContext";
import { toast } from "react-toastify";
import { FiArrowLeft, FiCheckCircle, FiShield, FiLock } from "react-icons/fi";
import { BsFillGeoAltFill, BsCreditCard, BsBank, BsCheck2Circle } from "react-icons/bs";

const Checkout = () => {
  const navigate = useNavigate();
  const myApi = useContext(ApiContext);
  const { cart, calculateTotal, clearCart } = useContext(CartContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Lagos",
    paymentMethod: "Bank Transfer",
    notes: "",
  });

  const subtotal = calculateTotal();
  const legalFee = cart.length > 0 ? 50000 : 0;
  const total = subtotal + legalFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please provide your name, email, and phone number.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // Generate unique Idempotency Key for backend transaction safety
      const idempotencyKey =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "idemp-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);

      const cartIds = cart.map((item) => (item._id || item.id).toString());

      const payload = {
        cart: cartIds,
        buyerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || formData.city || "Lagos",
          city: formData.city || "Lagos",
          notes: formData.notes || "",
        },
        paymentMethod: formData.paymentMethod || "Bank Transfer",
      };

      let resData = null;
      if (myApi) {
        const res = await myApi.post("/checkout/initiate", payload, {
          headers: {
            "Idempotency-Key": idempotencyKey,
          },
        });
        resData = res.data;
      }

      const generatedRef =
        resData?.orderRef ||
        resData?.reference ||
        "BH-" + Math.floor(100000 + Math.random() * 900000);
      setOrderRef(generatedRef);

      toast.success("Property acquisition reservation initiated!");
      clearCart();

      if (resData?.authorizationUrl) {
        toast.info("Redirecting to Paystack secure payment gateway...");
        setTimeout(() => {
          window.location.href = resData.authorizationUrl;
        }, 1200);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Failed to initiate checkout. Please try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-[#3d9970]/10 text-[#3d9970] flex items-center justify-center mx-auto mb-6">
            <BsCheck2Circle className="text-5xl" />
          </div>
          <span className="text-xs font-extrabold text-[#3d9970] uppercase tracking-wider bg-[#3d9970]/10 px-3 py-1 rounded-full inline-block mb-3">
            Reservation Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Thank You, {formData.fullName}!
          </h1>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Your property acquisition request has been securely logged. Your legal reference code is{" "}
            <span className="font-bold text-gray-900 font-mono">{orderRef}</span>. A licensed Betahouse conveyancer has been assigned to your transaction.
          </p>

          <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 text-left text-xs text-gray-600 space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Mode:</span>
              <span className="font-bold text-gray-800">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Contact Email:</span>
              <span className="font-bold text-gray-800">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="font-bold text-gray-800">{formData.phone}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/properties"
              className="w-full bg-[#3d9970] hover:bg-[#327e5c] text-white py-3.5 rounded-xl font-bold transition text-sm shadow-md"
            >
              Browse More Properties
            </Link>
            <Link
              to="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Items in Cart</h2>
          <p className="text-gray-500 text-sm mb-6">
            You do not have any saved properties in your cart to checkout.
          </p>
          <Link
            to="/properties"
            className="inline-block bg-[#3d9970] hover:bg-[#327e5c] text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-md"
          >
            Explore Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9970] hover:underline mb-8"
        >
          <FiArrowLeft /> Back to Cart
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Secure Property Checkout
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Complete your information to finalize your property reservation and title verification.
        </p>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">1. Buyer Information</h3>
                <p className="text-xs text-gray-400 mb-4">Official names to appear on Title documentation</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Adewale Babatunde"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="adewale@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+234 800..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Current City / State</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Lagos, Nigeria"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-1">2. Payment & Settlement Option</h3>
                <p className="text-xs text-gray-400 mb-4">Select how you prefer to settle the reservation amount</p>

                <div className="space-y-3">
                  {[
                    {
                      id: "Bank Transfer",
                      title: "Bank Wire Transfer / Escrow Holding",
                      desc: "Direct corporate bank transfer into audited escrow with title deed issuance.",
                      icon: <BsBank className="text-lg text-[#3d9970]" />,
                    },
                    {
                      id: "Installment Plan",
                      title: "Flexible Milestone Installment Plan",
                      desc: "Pay an initial 30% commitment, with remainder spread across structured milestones.",
                      icon: <BsCreditCard className="text-lg text-[#3d9970]" />,
                    },
                    {
                      id: "Debit Card",
                      title: "Instant Debit / Credit Card Payment",
                      desc: "Secured through modern 256-bit encrypted card gateway.",
                      icon: <FiLock className="text-lg text-[#3d9970]" />,
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition cursor-pointer ${
                        formData.paymentMethod === method.id
                          ? "border-[#3d9970] bg-[#3d9970]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="mt-1 accent-[#3d9970]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                          {method.icon}
                          <span>{method.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-700 mb-1">Special Legal / Inspection Notes</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Optional notes or scheduling preferences for your legal representative..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970] focus:bg-white transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold py-4 rounded-xl transition shadow-lg shadow-[#3d9970]/30 text-base cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheckCircle /> {loading ? "Initiating Secure Reservation..." : `Confirm & Place Reservation (₦${total.toLocaleString()})`}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-28 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                Order Items ({cart.length})
              </h3>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cart.map((item, idx) => {
                  const imgUrl = item.image
                    ? item.image.replace("../utils", "/utils")
                    : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200";
                  const price = item.amount || item.price || 0;

                  return (
                    <div key={item._id || item.id || idx} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <img src={imgUrl} alt={item.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-xs truncate">{item.title}</h4>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1">
                          <BsFillGeoAltFill className="text-[#3d9970]" />
                          <span className="truncate">{item.location || "Victoria Island, Lagos"}</span>
                        </p>
                        <span className="text-xs font-bold text-[#3d9970]">
                          ₦{Number(price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Properties Total:</span>
                  <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Title Search & Legal Fee:</span>
                  <span className="font-bold text-gray-900">₦{legalFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total Amount:</span>
                  <span className="text-xl text-[#3d9970]">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-[#3d9970]/10 p-4 rounded-2xl flex items-start gap-3 text-xs text-gray-700">
                <FiShield className="text-xl text-[#3d9970] shrink-0 mt-0.5" />
                <p>
                  Transactions are monitored under Nigerian lands registry compliance and certified escrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
