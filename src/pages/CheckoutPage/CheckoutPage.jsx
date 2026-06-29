import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FaCreditCard, FaLock, FaSpinner } from "react-icons/fa";

import { useNavigate, useParams } from "react-router";
import api from "../../api/api";

// Initialize Stripe with your Public Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ booking, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setErrorMessage("");

    const cardElement = elements.getElement(CardElement);

    // Confirm the payment using the Client Secret received from the backend
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: booking.email || "",
          },
        },
      },
    );

    if (error) {
      setErrorMessage(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      try {
        // Update booking state in the database upon successful execution
        await api.patch(`/bookings/update-status/${booking._id}`, {
          status: "paid",
          transactionId: paymentIntent.id,
        });

        // Redirect back to tickets collection with a fresh state
        navigate("/my-booked-tickets");
      } catch (err) {
        console.error("Failed to update status on DB:", err);
        setErrorMessage(
          "Payment succeeded, but failed to update status. Contact Support.",
        );
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-base-200/50 rounded-xl border border-base-300">
        <label className="label font-bold text-xs uppercase tracking-wider text-gray-400 p-0 mb-2">
          Credit or Debit Card
        </label>
        <div className="p-3 bg-base-100 rounded-lg border border-base-300 focus-within:border-primary transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="alert alert-error text-sm py-3 text-white font-semibold rounded-xl">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary btn-block font-extrabold text-sm gap-2 shadow-lg"
      >
        {processing ? (
          <>
            <FaSpinner className="animate-spin" /> Processing Payment...
          </>
        ) : (
          <>
            <FaLock /> Pay ${Number(booking.totalPrice).toFixed(2)} Securely
          </>
        )}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentContext = async () => {
      try {
        // 1. Fetch exact booking properties
        const bookingRes = await api.get(`/booking/${bookingId}`);
        setBooking(bookingRes.data);

        // 2. Request payment intent configuration matching price rules from backend
        const intentRes = await api.post("/create-payment-intent", {
          price: bookingRes.data.totalPrice,
        });
        setClientSecret(intentRes.data.clientSecret);
      } catch (error) {
        console.error("Error setting up payment flow:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchPaymentContext();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!booking || !clientSecret) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <p className="text-error font-bold">
          Invalid checkout session or ticket has expired.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="card bg-base-100 border border-base-200 shadow-2xl rounded-2xl p-6 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <FaCreditCard className="text-xl" />
          </div>
          <h2 className="text-2xl font-black">Complete Purchase</h2>
          <p className="text-gray-400 text-xs mt-1">
            Ticket: {booking.ticketTitle}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm font-semibold bg-base-200 p-3 rounded-xl">
          <span className="text-gray-500">Total Due:</span>
          <span className="text-success font-bold text-lg">
            ${Number(booking.totalPrice).toFixed(2)}
          </span>
        </div>

        {/* Stripe Context Provider Injection Wrap */}
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm booking={booking} clientSecret={clientSecret} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
