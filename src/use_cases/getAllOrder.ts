import Order from "../repositories/order";
import GetAllOrderRequest from "../types/requests/getAllOrderRequest";

export default async (request: GetAllOrderRequest) => {
  return await Order.find({ profileId: request.profileId });
};
