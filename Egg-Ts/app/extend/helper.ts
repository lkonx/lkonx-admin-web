import ImageCode from '../util/imageCode';
import EmailCode from '../util/emailCode';
import SmsCode from '../util/smsCode';

module.exports = {
    // 创建验证码
    createImageCode() {
        return ImageCode.createImageCode(this.ctx);
    },
    // 校验验证码
    verifyImageCode(clientCode) {
        ImageCode.verifyImageCode(this.ctx, clientCode);
    },
    // 发送邮件验证码
    async sendEmailCode(to: string) {
        return await EmailCode.sendEmailCode(this.ctx, to);
    },
    // 校验验证码
    verifyEmailCode(clientCode) {
        EmailCode.verifyEmailCode(this.ctx, clientCode);
    },
    // 发送手机验证码
    async sendSmsCode(to:string){
        return await SmsCode.sendSmsCode(this.ctx, to);
    },
    verifySmsCode(clientCode){
        SmsCode.verifySmsCode(this.ctx, clientCode);
    }
};
