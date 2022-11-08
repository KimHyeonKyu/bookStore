import Joi from "joi";
import Board from "../../models/board";

export const input = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    subject: Joi.string().required(),
    content: Joi.string().required(),
    datetime: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { username, subject, content, datetime } = ctx.request.body; // 변수 받아오는것

  try {
    const board = new Board({
      username,
      subject,
      content,
      datetime,
    }); // 변수 저장

    await board.save(); // db 저장

    const data = board.toJSON();
    ctx.body = data; // 값을 json형식으로 받기
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const output = async (ctx) => {
  try {
    const board = await Board.find().exec();
    if (!board) {
      ctx.status = 404;
      ctx.body = "아이디가 존재하지 않습니다.";
    }
    ctx.body = board;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const outputPaging = async (ctx) => {
  const { page } = ctx.query;
  let pageNumber = parseInt(page || "1", 10);
  if (pageNumber < 1) {
    return (pageNumber = 1);
  }
  try {
    const board = await Board.find()
      .limit(5)
      .skip((pageNumber - 1) * 5)
      .exec();
    if (!board) {
      ctx.status = 404;
      ctx.body = "아이디가 존재하지 않습니다.";
    }
    ctx.body = board;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const deleteItem = async (ctx) => {
  const { _id } = ctx.query;
  try {
    const board = await Board.deleteOne({ _id: _id }).exec();
    if (!board) {
      ctx.status = 404;
      ctx.body = "해당 내용이 존재하지 않습니다.";
    }
    ctx.body = board;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const readBoard = async (ctx) => {
  const { _id } = ctx.query;

  try {
    const boardList = await Board.find({ _id: _id }).exec();
    if (!boardList) {
      ctx.status = 404;
      ctx.body = "아이디가 존재하지 않습니다.";
    }
    ctx.body = boardList;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { _id } = ctx.query;
  const id = _id;
  try {
    const post = await Board.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      ctx.body = "아이디가 존재하지 않습니다.";
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
