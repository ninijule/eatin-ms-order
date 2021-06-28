import Order from "../repositories/order";
import NotAuthorizedError from "../types/errors/notAuthorizedError";
import ResourceNotFoundError from "../types/errors/resourceNotFoundError";
import DeleteOrderRequest from "../types/requests/deleteOrderRequest";

export default async (request: DeleteOrderRequest) => {
  const order = await Order.findById(request.id);

  if (!order) {
    throw new ResourceNotFoundError("order not found");
  }

  if (order.status == "PRE") {
    throw new Error(
      "The order cannot be canceled if it's status is at preparation. "
    );
  }

  if (request.role != "USR") {
    throw new NotAuthorizedError();
  }

  if (request.profileId != order.profileId) {
    throw new NotAuthorizedError();
  }

  await order.delete();
};
