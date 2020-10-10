import {Controller} from 'egg';
import NormalUserRule from '../validate/normalUserRule'

export default class UserController extends Controller {
    public async create() {
        const {ctx} = this;
        const data = ctx.request.body
        try {
            //验证前端数据
            ctx.validate(NormalUserRule, data)
            ctx.body = '注册'
        }catch (e) {
            console.log(e)
        }
    }
}
