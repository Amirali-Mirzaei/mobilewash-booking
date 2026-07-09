import { bookingSchema } from "../validation/booking";
import { connectDatabase } from "../db/mongoose";
import Booking from "../models/Booking";
import { sendTelegramMessage } from "../utils/telegram";
import { escapeHtml } from "../utils/escapeHtml";

const ipMap = new Map<string, number>();

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
      statusMessage: "Please wait before sending another booking.",
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

  await connectDatabase();

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

  console.error("========== API ERROR ==========");
  console.dir(error, { depth: null });
  console.error("================================");

  if (error?.code === 11000) {
    throw createError({
      statusCode: 409,
      statusMessage: "This time slot has already been booked.",
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