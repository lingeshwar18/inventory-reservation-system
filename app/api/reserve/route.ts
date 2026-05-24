import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { productId, warehouseId } = body;

    const inventory = await prisma.inventory.findFirst({
      where: {
        productId,
        warehouseId
      }
    });

    if (!inventory) {
      return NextResponse.json({
        error: "Inventory not found"
      });
    }

    const availableStock =
      inventory.totalStock -
      inventory.reservedStock;

    if (availableStock <= 0) {
      return NextResponse.json({
        error: "Out of stock"
      });
    }

    await prisma.inventory.update({
      where: {
        id: inventory.id
      },
      data: {
        reservedStock:
          inventory.reservedStock + 1
      }
    });

    const reservation =
      await prisma.reservation.create({
        data: {
          productId,
          warehouseId,
          quantity: 1,
          status: "PENDING",
          expiresAt: new Date(
            Date.now() + 15 * 60 * 1000
          )
        }
      });

  return NextResponse.json({
  success: true,
  reservationId: reservation.id
});
  } catch (error) {
    return NextResponse.json({
      error: "Reservation failed"
    });
  }
}