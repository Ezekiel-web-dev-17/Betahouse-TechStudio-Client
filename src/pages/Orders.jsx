import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import LoaderComp from "../components/LoaderComp";
import { BsBagCheck, BsFillGeoAltFill, BsClock, BsShieldCheck } from "react-icons/bs";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

const Orders = () => {
  const myApi = useContext(ApiContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!myApi) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await myApi.get("/checkout/my-orders");
        if (res.data?.success && Array.isArray(res.data?.orders)) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your reservations history.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [myApi]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <LoaderComp />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#3d9970] hover:underline mb-2"
            >
              <FiArrowLeft /> Back to Properties
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <BsBagCheck className="text-[#3d9970]" /> My Property Reservations
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              View your title deed requests, acquisition status, and past property checkout orders.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-100 text-sm mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#3d9970]/10 text-[#3d9970] flex items-center justify-center mx-auto mb-4 text-2xl">
              <BsShieldCheck />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Past Reservations</h3>
            <p className="text-gray-500 text-sm mb-6">
              You haven't initiated any property acquisition reservations yet. Explore listed luxury properties to get started.
            </p>
            <Link
              to="/properties"
              className="inline-block bg-[#3d9970] hover:bg-[#327e5c] text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-md"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = order.status || "pending";
              const isPaid = status === "paid";
              const isFailed = status === "failed";

              const badgeColor = isPaid
                ? "bg-[#3d9970]/10 text-[#3d9970] border-[#3d9970]/30"
                : isFailed
                ? "bg-red-500/10 text-red-600 border-red-500/30"
                : "bg-amber-500/10 text-amber-600 border-amber-500/30";

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs font-extrabold bg-slate-100 text-gray-800 px-3 py-1 rounded-lg">
                          REF: {order.orderRef}
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${badgeColor}`}
                        >
                          {status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
                        <BsClock /> Initiated on {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-gray-400 block font-medium">Total Settlement</span>
                      <span className="text-xl font-extrabold text-[#3d9970]">
                        ₦{Number(order.totalAmountNgn || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Reserved Properties list */}
                  <div className="py-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                      Reserved Items ({order.properties?.length || 0})
                    </h4>
                    <div className="grid gap-3">
                      {order.properties?.map((item, idx) => {
                        const propObj = item.property || {};
                        const imgUrl = propObj.image
                          ? propObj.image.replace("../utils", "/utils")
                          : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200";

                        return (
                          <div
                            key={item._id || idx}
                            className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100"
                          >
                            <img
                              src={imgUrl}
                              alt={propObj.title || "Property"}
                              className="w-14 h-14 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold text-gray-900 text-sm truncate">
                                {propObj.title || item.titleAtPurchase || "Real Estate Unit"}
                              </h5>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                                <BsFillGeoAltFill className="text-[#3d9970]" />
                                <span>{propObj.location || "Victoria Island, Lagos"}</span>
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-gray-900 block">
                                ₦{Number(item.priceAtPurchase || propObj.amount || 0).toLocaleString()}
                              </span>
                              {propObj._id && (
                                <Link
                                  to={`/properties/${propObj._id}`}
                                  className="text-[11px] font-semibold text-[#3d9970] hover:underline inline-flex items-center gap-0.5 mt-0.5"
                                >
                                  View <FiExternalLink />
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Buyer & Payment Meta */}
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-500 gap-2">
                    <div>
                      <span>Buyer: <strong className="text-gray-800">{order.buyerInfo?.fullName}</strong></span>
                      <span className="mx-2">•</span>
                      <span>Payment: <strong className="text-gray-800">{order.paymentMethod}</strong></span>
                    </div>
                    {order.paystackReference && (
                      <Link
                        to={`/checkout/verify/${order.paystackReference}`}
                        className="text-[#3d9970] font-bold hover:underline"
                      >
                        Verify Receipt Status →
                      </Link>
                    )}
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

export default Orders;
