import Router from "koa-router";
import * as orderCtrl from "./order.ctrl";

const order = new Router();

order.post("/input", orderCtrl.input);
order.get("/output", orderCtrl.output);

export default order;
