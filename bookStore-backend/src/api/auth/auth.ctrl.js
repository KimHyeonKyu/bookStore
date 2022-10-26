import Joi from 'joi';
import Member from '../../models/member';

export const register = async ctx => {
    // request body null 값인지 검증하기(validate)
    const schema = Joi.object().keys({
        id: Joi.string().required(),
        password: Joi.string().required(),
        userName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required()
    })
    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400; // required된 필드값 null값일시 나타내는 error(400)
        ctx.body = result.error;
        return;
    }

    const { id, password, userName, phoneNumber, address, email } = ctx.request.body;
    try{
        // id가 이미 존재하는지 확인
        const databaseId = await Member.findById(id);
        if (databaseId) {
            ctx.status = 409; // conflict error, 기입할려는 id가 db와 중복 데이터면 나타내는 error(409)
            return;
        }

        const member = new Member({
            id,
            userName,
            phoneNumber,
            address,
            email
        });
        await member.setPassword(password); // 비밀번호 설정
        await member.save(); // 데이터베이스에 저장

        // 응답할 데이터에서 password 필드 제거
        const data = member.toJSON();
        delete data.password;
        ctx.body = data;

        const token = member.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const login = async ctx => {
    const { id, password } = ctx.request.body;

    // id, password가 없으면 에러 처리
    if (!id || !password) {
        ctx.status = 401; // Unauthorized
        return;
    }

    try {
        const member = await Member.findById(id);
        // id가 존재하지 않으면 에러처리
        if (!member) {
            ctx.status = 401;
            return;
        } 
        const correctPassword = await member.checkPassword(password);
        // 잘못된 비밀번호
        if (!correctPassword) {
            ctx.status = 401;
            return
        }
        // 응답할 데이터에서 password 필드 제거
        const data = member.toJSON();
        delete data.password;
        ctx.body = data;

        const token = member.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 로그인 상태 확인
export const check = async ctx => {
    const { member } = ctx.state;
    if (!member) {
        // 로그인 중 아님
        ctx.status = 401; 
        return;
    }
    ctx.body = member;
};
// 로그아웃
export const logout = async ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204; // No Content
};

