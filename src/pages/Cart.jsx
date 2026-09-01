import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";
import { FiTrash2, FiArrowLeft, FiShield } from "react-icons/fi";
import { BsFillGeoAltFill, BsCreditCard, BsCartX } from "react-icons/bs";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, calculateTotal } = useContext(CartContext);

  const subtotal = calculateTotal();
  const legalFee = cart.length > 0 ? 50000 : 0;
  const total = subtotal + legalFee;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Your Property Cart
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Review saved properties before proceeding to legal reservation and checkout.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#3d9970] hover:underline"
          >
            <FiArrowLeft /> Continue Browsing Properties
          </Link>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200 max-w-xl mx-auto my-12">
            <div className="w-20 h-20 rounded-full bg-[#3d9970]/10 text-[#3d9970] flex items-center justify-center mx-auto mb-6">
              <BsCartX className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Currently Empty</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              You haven't added any properties to your reservation cart yet. Explore our top verified properties and click "Add to Cart" or "Buy Now".
            </p>
            <Link
              to="/properties"
              className="bg-[#3d9970] hover:bg-[#327e5c] text-white px-8 py-3.5 rounded-xl font-bold transition shadow-lg shadow-[#3d9970]/30 inline-block text-sm"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          /* Main Cart Content */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center bg-white p-4 px-6 rounded-2xl border border-gray-200 shadow-xs">
                <span className="font-bold text-gray-700 text-sm">
                  {cart.length} Property Item(s)
                </span>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear your cart?")) {
                      clearCart();
                      toast.info("Cart cleared.");
                    }
                  }}
                  className="text-xs text-red-500 font-semibold hover:underline cursor-pointer"
                >
                  Clear All Items
                </button>
              </div>

              {cart.map((item, idx) => {
                const imgUrl = item.image
                  ? item.image.replace("../utils", "/utils")
                  : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400";
                const price = item.amount !== undefined ? item.amount : item.price;

                return (
                  <div
                    key={item._id || item.id || idx}
                    className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={imgUrl}
                        alt={item.title}
                        className="w-24 h-24 sm:w-28 sm:h-24 rounded-2xl object-cover shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-extrabold text-[#3d9970] bg-[#3d9970]/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          {item.status || item.whatFor || "For Sale"}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-1 line-clamp-1 group-hover:text-[#3d9970] transition">
                          <Link to={`/properties/${item._id || item.id}`}>{item.title}</Link>
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium">
                          <BsFillGeoAltFill className="text-[#3d9970]" />
                          {item.location || "Victoria Island, Lagos"}
                        </p>
                        <p className="text-xs font-semibold text-gray-600 mt-1.5">
                          {item.bedrooms || item.bed || 4} Beds • {item.bathrooms || item.bath || 3} Baths
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <span className="text-lg sm:text-xl font-extrabold text-[#3d9970]">
                        ₦{Number(price || 0).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
                        title="Remove Item"
                      >
                        <FiTrash2 className="text-sm" /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="bg-[#3d9970]/10 p-6 rounded-3xl border border-[#3d9970]/30 flex items-start gap-4">
                <FiShield className="text-2xl text-[#3d9970] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Betahouse Buyer Guarantee</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    All transactions made through Betahouse are backed by audited title verification, escrow legal oversight, and certified developer contracts.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-200 space-y-6 sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                  Reservation Summary
                </h2>

                <div className="space-y-3.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Properties Total</span>
                    <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Legal & Title Admin Fee</span>
                    <span className="font-bold text-gray-900">₦{legalFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-2xl text-[#3d9970]">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#3d9970] hover:bg-[#327e5c] text-white font-bold py-4 rounded-xl transition shadow-lg shadow-[#3d9970]/30 text-base cursor-pointer flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <BsCreditCard />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
