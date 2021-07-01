import axios from "axios";
import Order from "../repositories/order";
import CreateDeliveryError from "../types/errors/createDeliveryError";
import ResourceNotFoundError from "../types/errors/resourceNotFoundError";
import updateOrderRequest from "../types/requests/updateOrderRequest";

export default async (request: updateOrderRequest) => {
  const order = await Order.findById(request.id);

  if (!order) {
    throw new ResourceNotFoundError("Order");
  }

  order.status = request.status;
  order.save();

  if (order.status == "AVA") {
    try {
      await axios.post(`http://eatin-ms-delivery-service:3000/delivery`, {
        orderId: order.id,
        profileId: order.profileId,
      });
    } catch (error) {
      throw error;
    }
  }

  try {
    axios.post("http://eatin-ms-log-service:3000/log", {
      name: `Order ${order.id} is ready`,
      type: "Order",
      content: `The order of ProfileId is ready`,
    });
  } catch (error) {
    console.error("Failed to reach log service.");
  }
};
