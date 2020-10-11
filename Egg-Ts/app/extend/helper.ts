import ImageCode from '../util/imageCode';
import EmailCode from '../util/emailCode';

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
};
