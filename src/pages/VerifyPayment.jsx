import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ApiContext } from "../ApiContext";
import { BsCheck2Circle, BsXCircle, BsClockHistory, BsShieldCheck } from "react-icons/bs";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import LoaderComp from "../components/LoaderComp";

const VerifyPayment = () => {
  const { reference: paramRef } = useParams();
  const [searchParams] = useSearchParams();
  const queryRef = searchParams.get("reference") || searchParams.get("trxref");
  const reference = paramRef || queryRef;

  const myApi = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkPayment = async () => {
      if (!reference || !myApi) {
        setLoading(false);
        setError("No valid transaction reference provided.");
        return;
      }

      try {
        setLoading(true);
        const res = await myApi.get(`/checkout/verify/${reference}`);
        if (res.data?.success && res.data?.order) {
          setOrder(res.data.order);
        } else {
          setError(res.data?.message || "Could not verify order status.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to verify transaction with the server.");
      } finally {
        setLoading(false);
      }
    };

    checkPayment();
  }, [reference, myApi]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <LoaderComp />
          <p className="mt-4 text-gray-600 font-semibold text-sm">
            Verifying property reservation & title transfer with Betahouse servers...
          </p>
        </div>
      </div>
    );
  }

  const isPaid = order?.status === "paid";
  const isPending = order?.status === "pending";

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50 text-gray-800 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center">
        {isPaid ? (
          <>
            <div className="w-20 h-20 rounded-full bg-[#3d9970]/10 text-[#3d9970] flex items-center justify-center mx-auto mb-6">
              <BsCheck2Circle className="text-5xl" />
            </div>
            <span className="text-xs font-extrabold text-[#3d9970] uppercase tracking-wider bg-[#3d9970]/10 px-3.5 py-1 rounded-full inline-block mb-3">
              Payment Verified & Reserved
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Reservation Confirmed!
            </h1>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Your payment for reference <span className="font-mono font-bold text-gray-900">{order?.orderRef || reference}</span> has been confirmed. A licensed conveyancer is processing your title documentation.
            </p>
          </>
        ) : isPending ? (
          <>
            <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-6">
              <BsClockHistory className="text-5xl" />
            </div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider bg-amber-500/10 px-3.5 py-1 rounded-full inline-block mb-3">
              Processing Settlement
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Payment Under Review
            </h1>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              We have recorded your reservation attempt <span className="font-mono font-bold text-gray-900">{order?.orderRef || reference}</span>. If you completed payment via bank transfer or card, verification will update shortly.
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
              <BsXCircle className="text-5xl" />
            </div>
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider bg-red-500/10 px-3.5 py-1 rounded-full inline-block mb-3">
              Verification Issue
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
              Transaction Not Completed
            </h1>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {error || "We could not confirm payment completion for this reference code."}
            </p>
          </>
        )}

        {order && (
          <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 text-left text-xs text-gray-600 space-y-2.5 mb-8">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400 font-medium">Order Reference:</span>
              <span className="font-bold font-mono text-gray-900">{order.orderRef}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400 font-medium">Buyer Name:</span>
              <span className="font-bold text-gray-900">{order.buyerInfo?.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-400 font-medium">Payment Mode:</span>
              <span className="font-bold text-gray-900">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Total Amount:</span>
              <span className="font-extrabold text-[#3d9970] text-sm">
                ₦{Number(order.totalAmountNgn || 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/orders"
            className="w-full bg-[#3d9970] hover:bg-[#327e5c] text-white py-3.5 rounded-xl font-bold transition text-sm shadow-md flex items-center justify-center gap-2"
          >
            <BsShieldCheck /> View My Reservations
          </Link>
          <Link
            to="/properties"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold transition text-sm flex items-center justify-center gap-2"
          >
            <FiHome /> Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyPayment;
