import Router from "koa-router";
import * as membershipCtrl from "./membership.ctrl";

const membership = new Router();

membership.post("/input", membershipCtrl.input);
membership.get("/output", membershipCtrl.output);

export default membership;
