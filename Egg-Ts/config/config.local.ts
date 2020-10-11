import {EggAppConfig, PowerPartial} from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    // 添加sequelize配置
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        username: 'root',
        password: 'root',
        port: 3306,
        database: 'lkonx',
    };
    // 关闭CSRF安全校验
    config.security = {
        csrf: {
            enable: false
        }
    }
    // 设置Redis
    config.redis = {
        client: {
            host: '127.0.0.1',
            port: 6379,
            password: '',
            db: 0,
        },
        agent: true
    };
    return config;
};
