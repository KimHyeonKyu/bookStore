import Joi from "joi";
import membership from "../../models/myMembership";

export const input = async (ctx) => {
  const schema = Joi.object().keys({
    userName: Joi.string().required(),
    point: Joi.number().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { userName, point } = ctx.request.body; // 변수 받아오는것

  try {
    const Membership = new membership({
      userName,
      point,
    }); // 변수 저장

    await Membership.save(); // db 저장

    const data = Membership.toJSON();
    ctx.body = data; // 값을 json형식으로 받기
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const output = async (ctx) => {
  const Membership = await membership.find().exec();
  ctx.body = Membership;
};