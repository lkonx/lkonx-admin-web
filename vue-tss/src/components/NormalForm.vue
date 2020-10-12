<template>
    <div>
        <el-form ref="form" :model="registerData" :rules="registerRules" label-width="0px">
            <el-form-item label="" prop="username">
                <el-input v-model="registerData.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input v-model="registerData.password" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item label="" prop="captcha">
                <el-row>
                    <el-col :span="18">
                        <el-input v-model="registerData.captcha" prefix-icon="el-icon-lock"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <img src="http://127.0.0.1:7001/captcha"
                             ref="captchaImage"
                             style="width: 100%; height: 40px"
                             @click="updateCaptcha(1)">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 100%">注册</el-button>
            </el-form-item>
            <el-form-item prop="checked">
                <el-checkbox v-model="registerData.checked">
                    <p>
                        阅读并接受
                        <a href="javascript:">《lkonx用户协议》</a>
                        及
                        <a href="javascript:">《lkonx隐私权保护声明》</a>
                    </p>
                </el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts'>
    import {Vue, Component, Ref} from 'vue-property-decorator';
    import {ElForm} from 'element-ui/types/form';
    import {registerUser} from '../api/index'
    import da from "element-ui/src/locale/lang/da";

    @Component({
        name: 'NormalForm',
        components: {}
    })
    export default class NormalForm extends Vue {

        registerData = {
            username: '',
            password: '',
            captcha: '',
            registerType: 'normal',
            checked: true
        }
        validateName = (rule: any, value: string, callback: any) => {
            const reg = /^[A-Za-z0-9]{6,}$/;
            if (!value) {
                callback(new Error('请填写用户名'));
            } else if (value.length < 6) {
                callback(new Error('用户名至少是6位'));
            } else if (!reg.test(value)) {
                callback(new Error('用户名只能是字母和数字'));
            } else {
                callback();
            }
        };
        validatePass = (rule: any, value: string, callback: any) => {
            const reg = /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[,\.#%'\+\*\-:;^_`].*))[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,}$/;
            if (!value) {
                callback(new Error('请填写密码'));
            } else if (value.length < 6) {
                callback(new Error('密码至少是8位'));
            } else if (!reg.test(value)) {
                callback(new Error('密码必须包含字母数字和特殊符号'));
            } else {
                callback();
            }
        };
        validateCaptcha = (rule: any, value: string, callback: any) => {
            const reg = /^[A-Za-z0-9]{4}$/;
            if (!value) {
                callback(new Error('请填写验证码'));
            } else if (value.length < 4) {
                callback(new Error('验证码至少是4位'));
            } else if (!reg.test(value)) {
                callback(new Error('验证码只能是字母和数字'));
            } else {
                callback();
            }
        };
        validateChecked = (rule: any, value: string, callback: any) => {
            if (!value) {
                callback(new Error('请阅读并同意用户协议'));
            } else {
                callback();
            }
        };
        registerRules = {
            username: [
                {validator: this.validateName, trigger: 'blur'}
            ],
            password: [
                {validator: this.validatePass, trigger: 'blur'}
            ],
            captcha: [
                {validator: this.validateCaptcha, trigger: 'blur'}
            ],
            checked: [
                {validator: this.validateChecked, trigger: 'change'}
            ],
        }
        @Ref() readonly captchaImage!: HTMLImageElement

        // 更新验证码图片
        updateCaptcha() {
            this.captchaImage.src = `http://127.0.0.1:7001/captcha?r=${Math.random()}`
        }

        @Ref() readonly form!: ElForm

        onSubmit() {
            this.form.validate((flag) => {
                if (flag) {
                    registerUser(this.registerData)
                        .then((data) => {
                            console.log(data);
                            (this as any).$message.success('注册成功');
                        })
                        .catch((e) => {
                            (this as any).$message.error(e);
                        })
                } else {
                    (this as any).$message.error('数据格式不对');
                }
            })
        }
    }
</script>

<style lang='scss' scoped>
    .el-form {
        padding-right: 20px;
        box-sizing: border-box;

        .el-row {
            line-height: 0;
        }
    }
</style>