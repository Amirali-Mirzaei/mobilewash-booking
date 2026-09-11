import mongoose from "mongoose";
import { connectDatabase } from "../../db/mongoose";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const date = query.date;

  if (typeof date !== "string" || !date) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid date.",
    });
  }

  await connectDatabase();

  const collection =
    mongoose.connection.db?.collection("bookings");

  if (!collection) {
    throw createError({
      statusCode: 500,
      statusMessage: "Database connection unavailable.",
    });
  }

  const bookings = await collection
    .find({
      date: {
        $regex: `^${date}`,
      },
      status: "pending",
    })
    .project({
      _id: 0,
      time: 1,
    })
    .toArray();

  return {
    bookedTimes: bookings
      .map((booking) => booking.time)
      .filter(
        (time): time is string =>
          typeof time === "string"
      ),
  };
});