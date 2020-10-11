import {Controller} from 'egg';
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/phoneUserRule'

const enum RegisterTypeEnum {
    Norma = 'normal',
    Email = 'email',
    Phone = 'phone'
}

export default class UserController extends Controller {
    // 创建用户方法
    public async create() {
        const {ctx} = this;

        try {
            // 1.校验数据和验证码
            this.validateUserInfo();
            // 2.将校验通过的数据保存到数据库中
            const data = await ctx.service.user.createUser(ctx.request.body);
            ctx.success(data)
        } catch (e) {
            if (e.errors) {
                ctx.error(400, e.errors)
            } else {
                ctx.error(400, e.message)
            }
        }
    }

    //验证用户信息
    private validateUserInfo() {
        const {ctx} = this
        const data = ctx.request.body
        const registerType = data.registerType
        switch (registerType) {
            case RegisterTypeEnum.Norma:
                ctx.validate(NormalUserRule, data)
                // 校验验证码
                ctx.helper.verifyImageCode(data.captcha)
                break
            case RegisterTypeEnum.Email:
                ctx.validate(EmailUserRule, data)
                // 校验验证码
                ctx.helper.verifyEmailCode(data.captcha)
                break
            case RegisterTypeEnum.Phone:
                ctx.validate(PhoneUserRule, data)
                ctx.helper.verifySmsCode(data.captcha);
                break
            default:
                throw new Error('注册类型不存在')
        }
    }
}
