import express from "express";
import { body } from "express-validator";
import orderController from "../controller/orderController";

const router = express.Router();

//Restaurant
router.post(
  "/",

  body("restaurantId").escape().isLength({ min: 1, max: 50 }),

  body("content"),

  body("totalPrice").isNumeric(),

  orderController.createOrder
);

router.delete(
  "/:id",

  orderController.deleteOrder
);

router.get(
  "/",

  orderController.getAllOrder
);

router.get(
  "/:id",

  orderController.getOrder
);

router.put(
  "/:id",

  body("name").escape().isLength({ min: 1, max: 50 }),

  body("description").escape().isLength({ min: 1, max: 255 }),

  body("profilePicture").isLength({ min: 1, max: 255 }),

  orderController.updateOrder
);

export default router;
