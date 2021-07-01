import axios from "axios";
import Order from "../repositories/order";
import ResourceNotFoundError from "../types/errors/resourceNotFoundError";
import CreateOrderRequest from "../types/requests/createOrderRequest";

export default async (request: CreateOrderRequest) => {
  try {
    const restaurant = await axios.get(
      `http://eatin-ms-restaurant-service:3000/restaurant/${request.restaurantId}`
    );
    await axios.post("http://eatin-ms-log-service:3000/log", {
      name: `Order is being created`,
      type: "Order",
      content: `New order created`,
    });
  } catch (error) {
    throw new ResourceNotFoundError("Restaurant");
  }

  return await Order.create(request);
};
