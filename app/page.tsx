"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [timer, setTimer] = useState(900);

  async function fetchProducts() {
    const res = await fetch("/api/products");

    const data = await res.json();

    setProducts(data);
  }

  async function reserveStock(
    productId: string,
    warehouseId: string
  ) {
    const res = await fetch("/api/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId,
        warehouseId
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Stock Reserved!");
      setTimer(900);
      fetchProducts();
    } else {
      alert(data.error);
    }
  }

  async function releaseStock(
    productId: string,
    warehouseId: string
  ) {
    const res = await fetch("/api/release", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId,
        warehouseId
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Stock Released!");
      fetchProducts();
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
      <h1 className="text-4xl font-bold mb-4">
        Inventory System
      </h1>

      <p className="mb-8 text-red-500 font-semibold">
        Reservation expires in:{" "}
        {minutes}:
        {seconds.toString().padStart(2, "0")}
      </p>

      <div className="grid gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-6 rounded-xl shadow"
          >
            <h2 className="text-2xl font-semibold">
              {product.name}
            </h2>

            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            {product.inventories.map((inventory: any) => {
              const available =
                inventory.totalStock -
                inventory.reservedStock;

              return (
                <div
                  key={inventory.id}
                  className="mb-4"
                >
                  <p>
                    Warehouse:{" "}
                    <strong>
                      {inventory.warehouse.name}
                    </strong>
                  </p>

                  <p className="mb-3">
                    Available Stock:{" "}
                    {available}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        reserveStock(
                          product.id,
                          inventory.warehouse.id
                        )
                      }
                      className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                      Reserve Stock
                    </button>

                    <button
                      onClick={() =>
                        releaseStock(
                          product.id,
                          inventory.warehouse.id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Release Stock
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}