import BaseError from "./baseError";
export default class ResourceNotFoundError extends BaseError {
  constructor(resource: String) {
    super(404, `${resource} not found.`, []);
  }
}
