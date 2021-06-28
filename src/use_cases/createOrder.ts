import axios from "axios";
import Order from "../repositories/order";
import CreateOrderRequest from "../types/requests/createOrderRequest";

export default async (request: CreateOrderRequest) => {
  try {
    const restaurant = await axios.get(
      `http://localhost:3000/restaurant/${request.restaurantId}`
    );
  } catch (error) {
    throw new Error("Restaurant not found");
  }

  return await Order.create(request);
};
