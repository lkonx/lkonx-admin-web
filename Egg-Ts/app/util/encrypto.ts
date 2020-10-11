import * as crypto from "crypto";

export default {
    _md5(password) {
        // 1.指定加密方式
        const md5 = crypto.createHash('md5')
        // 2.指定需要加密的内容和加密之后输出的格式
        return md5.update(password) // 指定需要加密的内容
            .digest('hex');
    },
    encryptText(helper, text: string) {
        text = text + helper.config.keys;
        return this._md5(text);
    }
}
