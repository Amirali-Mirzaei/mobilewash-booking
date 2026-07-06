import { Schema, model, models, InferSchemaType } from "mongoose";

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
      trim: true,
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
      index: true,
    },

    cancelToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
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

export type BookingDocument = InferSchemaType<typeof BookingSchema>;

const Booking =
  models.Booking || model<BookingDocument>("Booking", BookingSchema);

export default Booking;