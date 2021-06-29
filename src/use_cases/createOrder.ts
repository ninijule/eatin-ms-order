import axios from "axios";
import Order from "../repositories/order";
import ResourceNotFoundError from "../types/errors/resourceNotFoundError";
import CreateOrderRequest from "../types/requests/createOrderRequest";

export default async (request: CreateOrderRequest) => {
  try {
    const restaurant = await axios.get(
      `http://localhost:3000/restaurant/${request.restaurantId}`
    );
  } catch (error) {
    throw new ResourceNotFoundError("Restaurant");
  }

  return await Order.create(request);
};
