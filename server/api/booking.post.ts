import mongoose from "mongoose";
import { bookingSchema } from "../validation/booking";
import { connectDatabase } from "../db/mongoose";
import Booking from "../models/Booking";
import { sendTelegramMessage } from "../utils/telegram";
import { escapeHtml } from "../utils/escapeHtml";

const ipMap = new Map<string, number>();

const timeToMinutes = (time: string): number => {
  const parts = time.split(" ");

  const timePart = parts[0];
  const period = parts[1];

  if (!timePart || !period) {
    return -1;
  }

  const timeParts = timePart.split(":");

  const hourString = timeParts[0];
  const minuteString = timeParts[1];

  if (!hourString || !minuteString) {
    return -1;
  }

  let hour = Number(hourString);
  const minute = Number(minuteString);

  if (
    !Number.isFinite(hour) ||
    !Number.isFinite(minute) ||
    minute < 0 ||
    minute > 59
  ) {
    return -1;
  }

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  if (hour < 0 || hour > 23) {
    return -1;
  }

  return hour * 60 + minute;
};

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  }

  const ip = getRequestIP(event) || "unknown";

  const lastRequest = ipMap.get(ip);

  if (lastRequest && Date.now() - lastRequest < 10000) {
    throw createError({
      statusCode: 429,
      statusMessage:
        "Please wait before sending another booking.",
    });
  }

  ipMap.set(ip, Date.now());

  const result = bookingSchema.safeParse(await readBody(event));

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid booking data.",
    });
  }

  const body = result.data;

  const requestedStart = timeToMinutes(body.time);

  if (requestedStart < 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid booking time.",
    });
  }

  await connectDatabase();

  const collection = mongoose.connection.db?.collection("bookings");

  if (!collection) {
    throw createError({
      statusCode: 500,
      statusMessage: "Database connection unavailable.",
    });
  }

  // Find all pending bookings for the selected date.
  const existingBookings = await collection
    .find({
      date: {
        $regex: `^${body.date}`,
      },
      status: "pending",
    })
    .project({
      _id: 0,
      time: 1,
    })
    .toArray();

  // Prevent overlapping one-hour bookings.
  const hasOverlap = existingBookings.some((booking) => {
    if (typeof booking.time !== "string") {
      return false;
    }

    const bookedStart = timeToMinutes(booking.time);

    if (bookedStart < 0) {
      return false;
    }

    return (
      requestedStart >= bookedStart &&
      requestedStart <= bookedStart + 60
    );
  });

  if (hasOverlap) {
    throw createError({
      statusCode: 409,
      statusMessage:
        "This time slot or the surrounding one-hour period has already been booked.",
    });
  }

  try {
    const booking = new Booking({
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      address: body.address,
      date: body.date,
      time: body.time,
      status: "pending",
      cancelToken: crypto.randomUUID(),
    });

    await booking.save();
  } catch (error: any) {
    console.error(error);

    if (error?.code === 11000) {
      throw createError({
        statusCode: 409,
        statusMessage:
          "This time slot has already been booked.",
      });
    }

    throw error;
  }

  const message = `
🚘 <b>New Booking</b>

👤 ${escapeHtml(body.firstName)} ${escapeHtml(body.lastName)}

📞 ${escapeHtml(body.phone)}

📅 ${escapeHtml(body.date)}

🕒 ${escapeHtml(body.time)}

📍 ${escapeHtml(body.address)}
`;

  await sendTelegramMessage(message);

  return {
    success: true,
    message: "Booking created successfully.",
  };
});