import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const BookingSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      index: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
      index: true,
    },

    time: {
      type: String,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "cancelled"],
      default: "pending",
    },

    cancelToken: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index(
  {
    date: 1,
    time: 1,
  },
  {
    unique: true,
  }
);

const Booking =
  models.Booking || model("Booking", BookingSchema);
export default Booking;