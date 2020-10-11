import {Controller} from 'egg';

export default class UtilController extends Controller {

    public async imageCode() {
        const {ctx} = this;
        // 创建验证码
        console.log()
        ctx.body = ctx.helper.createImageCode()
    }

}
