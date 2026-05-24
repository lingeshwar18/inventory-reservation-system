import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { reservationId } = body;

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: reservationId
        }
      });

    if (!reservation) {
      return NextResponse.json({
        error: "Reservation not found"
      });
    }

    if (new Date() > reservation.expiresAt) {
      return NextResponse.json({
        error: "Reservation expired"
      });
    }

    await prisma.reservation.update({
      where: {
        id: reservationId
      },
      data: {
        status: "CONFIRMED"
      }
    });

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    return NextResponse.json({
      error: "Confirmation failed"
    });
  }
}