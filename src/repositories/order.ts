import mongoose from "../db/mongodb/index";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    restaurantId: {
      type: String,
      required: true,
    },
    profileId: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "PEN",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
