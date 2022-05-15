<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown trigger="click" class="avatar-container">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="onLogoutBtnClick">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from '@/store/state'
import { computed } from '@vue/runtime-core'
import { Store, useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  name: 'nav-bar',
  setup() {
    const store: Store<RootState> = useStore()
    const userInfo = computed(() => store.state.user.userInfo)
    async function onLogoutBtnClick() {
      await store.dispatch('user/doLogout')
      ElMessage.success('已退出登录')
    }
    return {
      userInfo,
      onLogoutBtnClick
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-bg-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>