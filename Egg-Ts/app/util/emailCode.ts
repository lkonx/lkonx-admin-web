const nodemailer = require("nodemailer");

let transporter;
export default {
    // 创建发送邮件对象
    createTransporterInstance(ctx) {
        if (transporter) {
            return transporter;
        }
        transporter = nodemailer.createTransport({
            host: ctx.app.config.smtp.host,
            port: ctx.app.config.smtp.port,
            secure: true, // true for 465, false for other ports
            auth: {
                user: ctx.app.config.smtp.user, // 发送邮件的邮箱
                pass: ctx.app.config.smtp.pass, // 邮箱对应的授权码
            },
        });
        return transporter;
    },
    // 创建需要发送的内容
    createEmailInfo(ctx, to: string) {
        // 1.生成验证码
        let code = Math.random().toString(16).slice(2, 6).toUpperCase();
        // 2.生成发送内容
        let info = {
            from: '2983353313@qq.com', // 谁发的
            to: to, // 发给谁
            subject: "lkonx管理后台登录验证", // 邮件标题
            text: `您正在注册lkonx后台管理系统, 您的验证码是:${code}`, // 邮件内容
        };
        // 3.保存验证码
        ctx.session.email = {
            code: code,
            expire: Date.now() + 60 * 1000 // 验证码1分钟之后过期
        };
        return info;
    },
    async sendEmailCode(ctx, to: string) {
        const transporter = this.createTransporterInstance(ctx);
        const info = this.createEmailInfo(ctx, to);
        return new Promise((resolve, reject) => {
            transporter.sendMail(info, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    },
    verifyEmailCode(ctx, clientCode) {
        // 1.取出服务端中保存的验证码和过期时间
        const serverCaptcha = ctx.session.email;
        let serverCode;
        let serverExpire;
        try {
            serverCode = serverCaptcha.code;
            serverExpire = serverCaptcha.expire;
        } catch (e) {
            // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
            throw new Error('请重新获取验证码');
        }

        if (Date.now() > serverExpire) {
            // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
            throw new Error('验证码已经过期');
        } else if (serverCode !== clientCode) {
            // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
            throw new Error('验证码不正确');
        }
        // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
        ctx.session.email = null;
    }
}
