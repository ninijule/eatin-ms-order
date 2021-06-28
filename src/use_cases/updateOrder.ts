import Order from "../repositories/order";
import UpdateRestaurantRequest from "../types/requests/updateOrderRequest";

export default async (request: UpdateRestaurantRequest) => {
  const order = Order.findById(request.id);
  order.status = request.status;
  order.save();
  //Check if status is available and if status == AVAI then call other ms to notificate
};
