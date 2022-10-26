import Router from "koa-router";
import auth from "./auth";
import basket from "./basket";

const api = new Router();

api.use('/auth', auth.routes());
api.use('/basket', basket.routes());

export default api;