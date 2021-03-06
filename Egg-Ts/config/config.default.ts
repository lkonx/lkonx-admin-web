import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1602251146645_8220';
    //跨域配置
    config.cors = {
        origin: 'http://127.0.0.1:8080',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        credentials: true,
    };
    // add your egg config in here
    config.middleware = [];

    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    };
    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...bizConfig,
    };
};
