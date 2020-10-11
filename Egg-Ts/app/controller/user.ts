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
            this.validateUserInfo()
            ctx.body = '注册'
        } catch (e) {
            if (e.errors) {
                ctx.body = e.errors
            } else {
                ctx.body = e.message
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
                break
            case RegisterTypeEnum.Email:
                ctx.validate(EmailUserRule, data)
                break
            case RegisterTypeEnum.Phone:
                ctx.validate(PhoneUserRule, data)
                break
            default:
                throw new Error('注册类型不存在')
        }
    }
}