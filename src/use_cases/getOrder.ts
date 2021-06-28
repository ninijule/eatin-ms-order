import axios from "axios";
import Order from "../repositories/order";
import NotAuthorizedError from "../types/errors/notAuthorizedError";
import GetOrderRequest from "../types/requests/getOrderRequest";

export default async (request: GetOrderRequest) => {
  const order = await Order.findById(request.id);

  if (!order) {
    throw new Error("order not found");
  }

  switch (request.role) {
    case "USR":
      if (order.profileId != request.profileId) {
        throw new NotAuthorizedError();
      }
      break;

    case "RES":
      let result;
      try {
        result = await axios.get(
          `http://localhost:3000/restaurant?profileId=${request.profileId}`
        );
      } catch (error) {
        throw new Error("Restaurant not found");
      }

      if (result.data.length == 0) {
        throw new NotAuthorizedError();
      }

      if (result.data[0]["_id"] != order.restaurantId) {
        throw new NotAuthorizedError();
      }
      break;

    default:
      throw new NotAuthorizedError();
  }

  return order;
};
