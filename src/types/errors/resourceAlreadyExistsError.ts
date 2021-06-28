import BaseError from "./baseError";
export default class ResourceAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(404, message, []);
  }
}
