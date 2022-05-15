<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="loginFormRules"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="用户名"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="密码"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        />
        <span class="show-pwd">
          <span class="svg-container" @click="onChangePwdTypeBtnClick">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></svg-icon>
          </span>
        </span>
      </el-form-item>

      <el-form-item>
        <el-button
          size="large"
          type="primary"
          style="width: 100%"
          :loading="loading"
          @click="onLoginBtnClick"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/base/svg-icon/svg-icon.vue'
import { validatePassword } from './rules'
import type { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

type ElFormInstance = InstanceType<typeof ElForm>

export default {
  name: 'login-page',
  setup() {
    const store = useStore()
    const router = useRouter()
    const passwordType = ref('password')
    const loginFromRef = ref<ElFormInstance>()
    const loading = ref(false)
    const loginForm = ref({
      username: 'super-admin',
      password: '123456'
    })
    const loginFormRules = ref({
      username: [{ triger: 'blur', required: true, message: '请输入用户名' }],
      password: [{ triger: 'blur', validator: validatePassword() }]
    })
    function onLoginBtnClick() {
      if (loginFromRef.value) {
        loginFromRef.value.validate(async (isValid: boolean) => {
          if (isValid) {
            try {
              loading.value = true
              await store.dispatch('user/doLogin', loginForm.value)
              router.push({
                name: 'Home'
              })
              ElMessage({
                type: 'success',
                message: '登陆成功'
              })
            } finally {
              loading.value = false
            }
          }
        })
      }
    }
    function onChangePwdTypeBtnClick() {
      passwordType.value =
        passwordType.value === 'password' ? 'text' : 'password'
    }
    return {
      loginForm,
      passwordType,
      loading,
      loginFormRules,
      onLoginBtnClick,
      onChangePwdTypeBtnClick,
      loginFromRef
    }
  },
  components: { SvgIcon }
}
</script>

<style lang="scss" scoped>
$bg: #324c6d;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      .el-input {
        display: inline-block;
        height: 47px;
        flex: 1;

        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 20px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
        }
      }

      .el-input__wrapper {
        box-shadow: none;
        width: 100%;
        background: transparent;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
