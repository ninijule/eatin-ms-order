import Order from "../repositories/order";
import ResourceNotFoundError from "../types/errors/resourceNotFoundError";
import CreateOrderRequest from "../types/requests/createOrderRequest";

export default async (request: CreateOrderRequest) => {
  const restaurant = await Order.findOne({ restaurant: request.restaurantId });
  if (restaurant) {
    throw new ResourceNotFoundError("RestaurantId not found.");
  }
  return await Order.create(request);
};
