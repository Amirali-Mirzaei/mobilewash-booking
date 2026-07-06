import { bookingSchema } from "../validation/booking";
import { sendTelegramMessage } from "../utils/telegram";
import { connectDatabase } from "../db/mongoose";
import Booking from "../models/Booking";

const ipMap = new Map<string, number>();

export default defineEventHandler(async (event) => {
  try {
    if (event.method !== "POST") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method not allowed",
      });
    }

    const ip = getRequestIP(event) || "unknown";
    const now = Date.now();

    const last = ipMap.get(ip);

    if (last && now - last < 10000) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too many requests. Please wait.",
      });
    }

    ipMap.set(ip, now);

    const result = bookingSchema.safeParse(await readBody(event));

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid booking data.",
      });
    }

    const body = result.data;
    await connectDatabase();
    
    console.log("========== BOOKING BODY ==========");
    console.log(body);
    console.log("==================================");

    const safe = (str: string) =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const message = `
🚘 <b>New Booking</b>

👤 <b>Customer</b>
${safe(body.firstName)} ${safe(body.lastName)}

📞 <b>Phone</b>
${safe(body.phone)}

📅 <b>Date</b>
${safe(body.date)}

🕒 <b>Time</b>
${safe(body.time)}

📍 <b>Address</b>
${safe(body.address)}
`;

let booking;

try {
  booking = await Booking.create({
    firstName: body.firstName,
    lastName: body.lastName,
    phone: body.phone,
    address: body.address,
    date: body.date,
    time: body.time,
    status: "pending",
    cancelToken: crypto.randomUUID(),
  });
} catch (error: any) {
  // Duplicate Key Error
  if (error.code === 11000) {
    throw createError({
      statusCode: 409,
      statusMessage: "This time slot is already booked.",
    });
  }

  throw error;
}

    await sendTelegramMessage(message);

    return {
      success: true,
      message: "Booking created successfully.",
    };

  } catch (error: any) {

    console.error("========== BOOKING ERROR ==========");
    console.error(error);
    console.error("===================================");

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Unable to process your booking.",
    });
  }
});