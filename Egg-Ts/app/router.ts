import {Application} from 'egg';

export default (app: Application) => {
    const {controller, router} = app;
    router.get('/', controller.home.index);
    // 验证码生成
    router.get('/captcha', controller.util.imageCode);
    // 邮箱验证码
    router.get('/emailcode', controller.util.emailCode);
    // 手机验证码
    router.get('/smscode', controller.util.smsCode);
    // 注册
    router.post('/register', controller.user.create);
};
