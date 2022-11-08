import Router from "koa-router";
import * as boardctrl from "./board.ctrl";

const board = new Router();

board.post("/input", boardctrl.input);
board.get("/output", boardctrl.output);
board.get("/outputPaging", boardctrl.outputPaging);
board.delete("/deleteItem", boardctrl.deleteItem);
board.get("/readBoard", boardctrl.readBoard);
board.post("/updateBoard", boardctrl.update);

export default board;
