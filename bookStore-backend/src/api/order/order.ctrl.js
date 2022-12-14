import Joi from "joi";
import MyOrder from "../../models/myOrder";

export const input = async (ctx) => {
  const schema = Joi.object().keys({
    buyerDay: Joi.string().required(),
    orderNumber: Joi.string().required(),
    buyerName: Joi.string().required(),
    bookName: Joi.string().required(),
    bookPrice: Joi.number().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { buyerDay, orderNumber, buyerName, bookName, bookPrice } =
    ctx.request.body; // 변수 받아오는것

  try {
    const myOrder = new MyOrder({
      bookName,
      bookPrice,
      buyerDay,
      orderNumber,
      buyerName,
    }); // 변수 저장

    await myOrder.save(); // db 저장

    const data = myOrder.toJSON();
    ctx.body = data; // 값을 json형식으로 받기
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const output = async (ctx) => {
  const { userName } = ctx.query;

  const myOrder = await MyOrder.find({ buyerName: userName }).exec();
  ctx.body = myOrder;
};
