"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

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
      fetchProducts();
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Inventory System
      </h1>

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
                    Warehouse:
                    {" "}
                    <strong>
                      {inventory.warehouse.name}
                    </strong>
                  </p>

                  <p className="mb-3">
                    Available Stock:
                    {" "}
                    {available}
                  </p>

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
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}