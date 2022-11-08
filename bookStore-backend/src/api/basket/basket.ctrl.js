import Joi from "joi";
import ShoppingBasket from "../../models/shoppingBasket";

export const input = async (ctx) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    bookName: Joi.string().required(),
    bookPrice: Joi.number().required(),
    quantity: Joi.number().required(),
    checkState: Joi.string().required(),
    bookImage: Joi.string().required()
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { id, bookName, bookPrice, quantity, checkState, bookImage } = ctx.request.body; 

  try {
    const shoppingBasket = new ShoppingBasket({
      id,
      bookName,
      bookPrice,
      quantity,
      checkState,
      bookImage
    });

    await shoppingBasket.save();

    const data = shoppingBasket.toJSON();
    ctx.body = data;    

  } catch (e) {
    ctx.throw(500, e);
  }
};

export const output = async (ctx) => {
    const { id } = ctx.query;
    try{
      const shoppingBasket = await ShoppingBasket.find({"id": id}).exec();
      if (!shoppingBasket) {
        ctx.status = 404;
        ctx.body = '아이디가 존재하지 않습니다.';
      }
      ctx.body = shoppingBasket;
    } catch (e) {
      ctx.throw(500, e);
    }
};

export const deleteItem = async (ctx) => {
  const { _id } = ctx.query;
  try{
    const shoppingBasket = await ShoppingBasket.deleteOne({"_id": _id}).exec();
      if (!shoppingBasket) {
        ctx.status = 404;
        ctx.body = '아이디가 존재하지 않습니다.';
      }
      ctx.body = shoppingBasket;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const deleteItemList = async (ctx) => {
  const { id } = ctx.query;
  try{
    const shoppingBasket = await ShoppingBasket.deleteMany({"id": id}).exec();
      if (!shoppingBasket) {
        ctx.status = 404;
        ctx.body = '아이디가 존재하지 않습니다.';
      }
      ctx.body = shoppingBasket;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const updateItem = async (ctx) => {
  const { _id, quantity } = ctx.query;
  try{
    const shoppingBasket = await ShoppingBasket.updateOne({_id: _id}, {$set: {quantity: quantity}});
    if(!shoppingBasket) {
      ctx.status = 404;
      ctx.body = "아이디 및 수량이 존재하지 않습니다."
    }
    ctx.body = shoppingBasket;
  } catch(e) {
    ctx.throw(500, e);
  }
};

export const updateCheck = async (ctx) => {
  const { _id, checkState, quantity } = ctx.query;
  try{
    const shoppingBasket = await ShoppingBasket.updateOne({_id: _id}, {$set: {checkState: checkState, quantity: quantity}});
    if(!shoppingBasket) {
      ctx.status = 404;
      ctx.body = "아이디 및 수량이 존재하지 않습니다."
    }
    ctx.body = shoppingBasket;
  } catch(e) {
    ctx.throw(500, e);
  }
};

