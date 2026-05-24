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

    if (inventory.reservedStock <= 0) {
      return NextResponse.json({
        error: "No reserved stock"
      });
    }

    await prisma.inventory.update({
      where: {
        id: inventory.id
      },
      data: {
        reservedStock:
          inventory.reservedStock - 1
      }
    });

    await prisma.reservation.updateMany({
      where: {
        productId,
        warehouseId,
        status: "PENDING"
      },
      data: {
        status: "RELEASED"
      }
    });

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      error: "Release failed"
    });
  }
}