import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {
    /**
     * 创建用户
     * @param username 用户名
     * @param email 邮箱
     * @param phone 手机号
     * @param password 密码
     */
    public async createUser({username, email, phone, password}) {
        if(username){
            // 普通注册
            return await this.createUserByUserName(username, password);
        }else if(email){
            // 邮箱注册
            return await this.createUserByEmail(email, password);
        }else if(phone){
            // 手机注册
            return await this.createUserByPhone(phone, password);
        }
    }

    /**
     * 根据名称查询用户是否存在
     * @param username 用户名
     * @param password 密码
     */
    private async createUserByUserName(username, password){
        password = this.ctx.helper.encryptText(password);
        // 1.查询当前用户是否存在
        const user = await this.findUser({username:username});
        if(user){
            throw new Error('当前用户已存在');
        }
        // 2.如果不存在才保存
        const data = await this.ctx.model.User.create({
            username:username,
            password:password
        });
        return data['dataValues'];
    }
    /**
     * 根据邮箱查询用户是否存在
     * @param email 用户名
     * @param password 密码
     */
    private async createUserByEmail(email, password){
        password = this.ctx.helper.encryptText(password);
        // 1.查询当前用户是否存在
        const user = await this.findUser({email:email});
        if(user){
            throw new Error('当前用户已存在');
        }
        // 2.如果不存在才保存
        const data = await this.ctx.model.User.create({
            email:email,
            password:password
        });
        return data['dataValues'];
    }
    /**
     * 根据手机号查询用户是否存在
     * @param phone 用户名
     * @param password 密码
     */
    private async createUserByPhone(phone, password){
        password = this.ctx.helper.encryptText(password);
        // 1.查询当前用户是否存在
        const user = await this.findUser({phone:phone});
        if(user){
            throw new Error('当前用户已存在');
        }
        // 2.如果不存在才保存
        const data = await this.ctx.model.User.create({
            phone:phone,
            password:password
        });
        return data['dataValues'];
    }

    /**
     * 查找模型中数据
     * @param options 查找条件
     */
    private async findUser(options){
        return await this.ctx.model.User.findOne({where: options});
    }
}
