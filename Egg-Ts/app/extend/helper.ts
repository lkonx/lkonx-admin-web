import ImageCode from '../util/imageCode';

module.exports = {
    // 创建验证码
    createImageCode() {
        return ImageCode.createImageCode(this.ctx);
    },
    // 校验验证码
    verifyImageCode(clientCode){
        ImageCode.verifyImageCode(this.ctx, clientCode);
    }
};
