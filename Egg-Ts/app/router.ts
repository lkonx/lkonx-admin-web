import {Application} from 'egg';

export default (app: Application) => {
    const {controller, router} = app;
    router.get('/', controller.home.index);
    // 验证码生成
    router.get('/captcha', controller.util.imageCode);
    // 注册
    router.post('/register', controller.user.create);
};
