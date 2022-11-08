import Router from "koa-router";
import auth from "./auth";
import basket from "./basket";
import order from "./order";
import membership from "./membership";
import board from "./board";

const api = new Router();

api.use("/auth", auth.routes());
api.use("/basket", basket.routes());
api.use("/order", order.routes());
api.use("/membership", membership.routes());
api.use("/board", board.routes());

export default api;
