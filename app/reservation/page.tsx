"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReservationPage() {
  const params = useSearchParams();

  const reservationId =
    params.get("reservationId");

  const [timer, setTimer] = useState(900);

  async function confirmPurchase() {
    const res = await fetch("/api/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reservationId
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Purchase Confirmed!");
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Reservation Checkout
      </h1>

      <div className="border p-6 rounded-xl max-w-xl">
        <p className="mb-4">
          Reservation ID:
          {" "}
          <strong>{reservationId}</strong>
        </p>

        <p className="text-red-500 text-xl mb-6">
          Expires in:
          {" "}
          {minutes}:
          {seconds.toString().padStart(2, "0")}
        </p>

        <div className="flex gap-4">
          <button
            onClick={confirmPurchase}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Confirm Purchase
          </button>

          <button
            onClick={() => window.history.back()}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}