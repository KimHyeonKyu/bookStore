import Joi from "joi";
import ShoppingBasket from "../../models/shoppingBasket";

export const input = async (ctx) => {
  const schema = Joi.object().keys({
    bookName: Joi.string().required(),
    bookPrice: Joi.number().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { bookName, bookPrice } = ctx.request.body; // 변수 받아오는것

  try {
    const shoppingBasket = new ShoppingBasket({
      bookName,
      bookPrice,
    });     // 변수 저장

    await shoppingBasket.save();    // db 저장

    const data = shoppingBasket.toJSON();
    ctx.body = data;    // 값을 json형식으로 받기

  } catch (e) {
    ctx.throw(500, e);
  }
};

export const output = async (ctx) => {
    const shoppingBasket = await ShoppingBasket.find().exec();
    ctx.body = shoppingBasket;
};
