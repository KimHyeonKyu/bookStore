import Router from "koa-router";
import * as basketCtrl from "./basket.ctrl";

const basket = new Router;

basket.post('/input', basketCtrl.input);
basket.get('/output', basketCtrl.output);

export default basket;