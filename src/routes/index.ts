import RouterConfig from "../types/utils/routerConfig";
import orderRouter from "./order";

const order: RouterConfig = {
  router: orderRouter,
  path: "/order",
};

export default [order];