import React, { useContext, useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { CartContext } from "../CartContext";
import {
  BsCheck2Circle,
  BsClockHistory,
  BsXCircle,
  BsShieldCheck,
  BsFillGeoAltFill,
  BsCopy,
  BsPrinter,
  BsCheckLg,
  BsBuilding,
} from "react-icons/bs";
import { FiHome, FiArrowLeft, FiPhoneCall } from "react-icons/fi";
import LoaderComp from "../components/LoaderComp";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const trxref = searchParams.get("trxref");
  const queryRef = searchParams.get("reference");
  const reference = queryRef || trxref;

  const myApi = useContext(ApiContext);
  const { clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const cartClearedRef = useRef(false);

  const verifyOrder = async (isSilent = false) => {
    if (!reference) {
      setLoading(false);
      setError("No transaction reference found in request.");
      return;
    }

    if (!myApi) {
      setLoading(false);
      setError("API context not available.");
      return;
    }

    if (!isSilent) {
      setLoading(true);
    }

    try {
      const res = await myApi.get(`/checkout/verify/${reference}`);
      if (res.data?.success && res.data?.order) {
        const fetchedOrder = res.data.order;
        setOrder(fetchedOrder);
        setError(null);

        // Clear cart if payment is verified paid
        if (fetchedOrder.status === "paid" && !cartClearedRef.current) {
          cartClearedRef.current = true;
          clearCart();
        }
      } else {
        setError(res.data?.message || "Could not verify order details.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to verify transaction with server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyOrder();
  }, [reference, myApi]);

  // Poll server if transaction is currently pending (e.g. while Paystack webhook completes)
  useEffect(() => {
    let timer;
    if (order && order.status === "pending" && pollCount < 5) {
      timer = setTimeout(() => {
        setPollCount((prev) => prev + 1);
        verifyOrder(true);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [order, pollCount]);

  const handleCopyReference = () => {
    const refToCopy = order?.orderRef || reference || "";
    if (refToCopy) {
      navigator.clipboard.writeText(refToCopy);
      setCopied(true);
      toast.success("Reference code copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
          <LoaderComp />
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
            Verifying Transaction
          </h2>
          <p className="text-gray-500 font-medium text-xs leading-relaxed">
            Please wait while we confirm your reservation reference{" "}
            <span className="font-mono font-bold text-gray-800">
              {reference || "..."}
            </span>{" "}
            with Betahouse secure servers...
          </p>
        </div>
      </div>
    );
  }

  const isPaid = order?.status === "paid";
  const isPending = order?.status === "pending";

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 print:p-0 print:max-w-full">
        {/* Top Action Header (Hidden during print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d9970] hover:underline"
          >
            <FiArrowLeft /> Back to Properties
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold text-xs transition shadow-sm cursor-pointer"
            >
              <BsPrinter className="text-sm" /> Print Summary
            </button>
            <Link
              to="/orders"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3d9970] text-white rounded-xl font-semibold text-xs hover:bg-[#327e5c] transition shadow-sm"
            >
              <BsBuilding className="text-sm" /> My Reservations
            </Link>
          </div>
        </div>

        {/* Main Status Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Status Header Banner */}
          <div
            className={`p-8 sm:p-12 text-center text-white ${
              isPaid
                ? "bg-linear-to-br from-[#3d9970] via-[#327e5c] to-[#1e543c]"
                : isPending
                ? "bg-linear-to-br from-amber-500 via-amber-600 to-amber-700"
                : "bg-linear-to-br from-red-500 via-red-600 to-red-700"
            }`}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-5 shadow-inner">
              {isPaid ? (
                <BsCheck2Circle className="text-5xl text-white" />
              ) : isPending ? (
                <BsClockHistory className="text-5xl text-white animate-pulse" />
              ) : (
                <BsXCircle className="text-5xl text-white" />
              )}
            </div>

            <span className="text-xs font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-3 border border-white/20">
              {isPaid
                ? "Payment Verified & Property Reserved"
                : isPending
                ? "Processing Settlement"
                : "Verification Failed"}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {isPaid
                ? "Property Reservation Confirmed!"
                : isPending
                ? "Payment Processing..."
                : "Transaction Verification Issue"}
            </h1>

            <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
              {isPaid
                ? "Your payment was successfully received and verified. Title conveyance documentation has been initiated for your property reservation."
                : isPending
                ? "We have recorded your reservation attempt. If you completed payment, verification will complete as soon as banking settlement confirms."
                : error ||
                  "We could not confirm payment completion for this reference code."}
            </p>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Reference Badge & Copy Action */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-gray-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Transaction Reference Code
                </span>
                <span className="font-mono font-extrabold text-xl text-gray-900">
                  {order?.orderRef || reference || "BH-PENDING"}
                </span>
              </div>

              <button
                onClick={handleCopyReference}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-bold text-xs text-gray-700 shadow-sm transition cursor-pointer active:scale-95"
              >
                {copied ? (
                  <>
                    <BsCheckLg className="text-emerald-600 text-sm" /> Copied!
                  </>
                ) : (
                  <>
                    <BsCopy className="text-gray-500 text-sm" /> Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Order Summary & Financials */}
            {order && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Buyer Details */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center justify-between">
                    <span>Buyer Information</span>
                    <span className="text-[11px] font-normal text-gray-400">
                      Title Beneficiary
                    </span>
                  </h3>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400">Full Name:</span>
                    <span className="font-bold text-gray-900">
                      {order.buyerInfo?.fullName || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400">Email:</span>
                    <span className="font-bold text-gray-900">
                      {order.buyerInfo?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400">Phone:</span>
                    <span className="font-bold text-gray-900">
                      {order.buyerInfo?.phone || "N/A"}
                    </span>
                  </div>
                  {order.buyerInfo?.city && (
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Location/City:</span>
                      <span className="font-bold text-gray-900">
                        {order.buyerInfo.city}
                      </span>
                    </div>
                  )}
                  {order.buyerInfo?.notes && (
                    <div className="pt-2">
                      <span className="text-gray-400 block mb-1">
                        Legal / Inspection Notes:
                      </span>
                      <p className="bg-slate-50 p-2.5 rounded-lg text-gray-700 italic">
                        "{order.buyerInfo.notes}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3 text-xs">
                  <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center justify-between">
                    <span>Payment Summary</span>
                    <span className="text-[11px] font-bold text-[#3d9970] uppercase">
                      {order.status}
                    </span>
                  </h3>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="font-bold text-gray-900 capitalize">
                      {order.paymentMethod || "Bank Transfer"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400">Properties Subtotal:</span>
                    <span className="font-bold text-gray-900">
                      ₦
                      {Number(
                        (order.totalAmountNgn || 0) - (order.legalFeeNgn || 50000)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-50">
                    <span className="text-gray-400">Title Search & Legal Fee:</span>
                    <span className="font-bold text-gray-900">
                      ₦{Number(order.legalFeeNgn || 50000).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 pt-3 border-t border-gray-200 text-sm font-extrabold text-gray-900">
                    <span>Total Amount Paid:</span>
                    <span className="text-base text-[#3d9970]">
                      ₦{Number(order.totalAmountNgn || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Reserved Properties List */}
            {order?.properties && order.properties.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                  Reserved Property Items ({order.properties.length})
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {order.properties.map((item, idx) => {
                    const prop = item.property || {};
                    const title = item.title || prop.title || "Property Listing";
                    const location =
                      item.location || prop.location || "Lagos, Nigeria";
                    const price = item.priceNgn || prop.amount || 0;
                    const imgUrl = prop.image
                      ? prop.image.replace("../utils", "/utils")
                      : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=300";

                    return (
                      <div
                        key={prop._id || item._id || idx}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-200"
                      >
                        <img
                          src={imgUrl}
                          alt={title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                            {title}
                          </h4>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <BsFillGeoAltFill className="text-[#3d9970] shrink-0" />
                            <span className="truncate">{location}</span>
                          </p>
                          <span className="text-xs font-extrabold text-[#3d9970] block mt-1">
                            ₦{Number(price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Conveyancing Next Steps */}
            <div className="bg-[#3d9970]/10 p-6 rounded-2xl flex items-start gap-4 border border-[#3d9970]/20">
              <BsShieldCheck className="text-2xl text-[#3d9970] shrink-0 mt-0.5" />
              <div className="text-xs text-gray-700 leading-relaxed">
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  Next Steps: Title Verification & Conveyancing
                </h4>
                <p>
                  A Betahouse legal conveyancer will verify your land title registry records and dispatch your physical Deed of Assignment & Allocation documents within 48 business hours. You will receive progress updates via email and phone.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 print:hidden">
              <Link
                to="/orders"
                className="w-full bg-[#3d9970] hover:bg-[#327e5c] text-white py-3.5 rounded-xl font-bold transition text-sm shadow-md flex items-center justify-center gap-2"
              >
                <BsShieldCheck /> View All My Reservations
              </Link>
              <Link
                to="/properties"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2"
              >
                <FiHome /> Browse More Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
