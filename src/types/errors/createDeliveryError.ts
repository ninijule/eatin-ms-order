import BaseError from "./baseError";
export default class CreateDeliveryError extends BaseError {
  constructor() {
    super(400, "Failed to create delivery.", []);
  }
}
