import Router from "koa-router";
import auth from "./auth";
import basket from "./basket";
import order from "./order";
import membership from "./membership";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/basket", basket.routes());
api.use("/order", order.routes());
api.use("/membership", membership.routes());

export default api;
