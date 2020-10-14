<template>
    <div class="register-container">
        <div class="register-box">
            <h1>欢迎注册</h1>
            <el-tabs tab-position="left" @tab-click="handleClick">
                <el-tab-pane label="普通注册">
                    <NormalForm ref="normalForm"></NormalForm>
                </el-tab-pane>
                <el-tab-pane label="邮箱注册">
                    <EmailForm ref="emailForm"></EmailForm>
                </el-tab-pane>
                <el-tab-pane label="手机注册">
                    <PhoneForm ref="phoneForm"></PhoneForm>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Ref} from 'vue-property-decorator';
    import NormalForm from "@/components/NormalForm.vue";
    import EmailForm from "@/components/EmailForm.vue";
    import PhoneForm from "@/components/PhoneForm.vue";

    @Component({
        name: 'Register',
        components: {
            NormalForm,
            EmailForm,
            PhoneForm
        }
    })

    export default class Register extends Vue {
        @Ref() readonly normalForm!: NormalForm ;
        @Ref() readonly emailForm!: NormalForm;
        @Ref() readonly phoneForm!: NormalForm;

        private handleClick() {
            this.normalForm.resetForm();
            this.emailForm.resetForm();
            this.phoneForm.resetForm();
        }
    }
</script>

<style lang='scss' scoped>
    .register-container {
        width: 100%;
        height: 100%;
        background: url("../assets/bg.jpg") no-repeat;
        background-size: cover;

        .register-box {
            width: 600px;
            height: 400px;
            border-radius: 10px;
            background-color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            h1 {
                text-align: center;
            }

            a {
                text-decoration: none;
            }
        }
    }
</style>