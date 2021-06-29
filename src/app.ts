import express from "express";
import cookieParser from "cookie-parser";
import RouterConfig from "./types/utils/routerConfig";
import routers from "./routes";
import BaseError from "./types/errors/baseError";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routers.forEach((router: RouterConfig) => {
  app.use(router.path, router.router);
});

app.use((err: any, req: any, res: any, next: any) => {
  if (!(err instanceof BaseError)) {
    err = BaseError.fromError(err);
  }
  return res.status(err.code).send({
    message: err.message,
    details: err.details,
  });
});

app.listen(3000, () => {
  console.log("The application is listening on port 3000 ! ");
});
