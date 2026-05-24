import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const reservationId =
      body.reservationId;

    if (!reservationId) {
      return NextResponse.json(
        {
          error: "Reservation ID required"
        },
        {
          status: 400
        }
      );
    }

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: reservationId
        }
      });

    if (!reservation) {
      return NextResponse.json(
        {
          error: "Reservation not found"
        },
        {
          status: 404
        }
      );
    }

    if (
      reservation.status ===
      "CONFIRMED"
    ) {
      return NextResponse.json({
        success: true
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
    console.error(error);

    return NextResponse.json(
      {
        error: "Confirmation failed"
      },
      {
        status: 500
      }
    );
  }
}