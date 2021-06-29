import Order from "../repositories/order";
import GetAllOrdersRequest from "../types/requests/getAllOrdersRequest";
import axios from "axios";
import ResourceNotFoundError from "../types/errors/resourceNotFoundError";

export default async (request: GetAllOrdersRequest) => {
  if (request.role == "USR") {
    return await Order.find({ profileId: request.profileId });
  }

  let result;
  try {
    result = await axios.get(
      `http://eatin-ms-restaurant-service:3000/restaurant?profileId=${request.profileId}`
    );
  } catch (error) {
    throw new ResourceNotFoundError("Restaurant");
  }

  return await Order.find({ restaurantId: result.data.restaurantId });
};
