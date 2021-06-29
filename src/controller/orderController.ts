import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import createOrder from "../use_cases/createOrder";
import deleteOrder from "../use_cases/deleteOrder";
import updateOrder from "../use_cases/updateOrder";
import getOrder from "../use_cases/getOrder";
import getAllOrder from "../use_cases/getAllOrders";

import CreateOrderRequest from "../types/requests/createOrderRequest";
import UpdateOrderRequest from "../types/requests/updateOrderRequest";
import DeleteOrderRequest from "../types/requests/deleteOrderRequest";
import GetOrderRequest from "../types/requests/getOrderRequest";
import GetAllOrderRequest from "../types/requests/getAllOrdersRequest";

export default {
  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request: CreateOrderRequest = {
        restaurantId: req.body.restaurantId,
        content: req.body.content,
        profileId: JSON.parse(<string>req.headers.user).id,
      };

      return res.status(200).json((await createOrder(request))._id);
    } catch (error) {
      next(error);
    }
  },

  deleteOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request: DeleteOrderRequest = {
        id: req.params.id,
        profileId: JSON.parse(<string>req.headers.user).id,
      };
      await deleteOrder(request);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },

  getOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request: GetOrderRequest = {
        id: req.params.id,
        role: JSON.parse(<string>req.headers.user).role,
        profileId: JSON.parse(<string>req.headers.user).id,
      };

      const result = await getOrder(request);
      if (result) {
        return res.status(200).json(result);
      }
      return res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  },
  getAllOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const request: GetAllOrderRequest = {
        profileId: JSON.parse(<string>req.headers.user).id,
        role: JSON.parse(<string>req.headers.user).role,
      };

      return res.status(200).json(await getAllOrder(request));
    } catch (error) {
      next(error);
    }
  },
  updateOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const request: UpdateOrderRequest = {
        id: req.params.id,
        status: req.body.status,
      };
      await updateOrder(request);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
};
