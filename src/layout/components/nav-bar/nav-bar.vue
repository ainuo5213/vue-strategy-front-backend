<template>
  <div class="navbar">
    <humburger class="hamburger-container"></humburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <lang-select
        effect="dark"
        class="right-menu-item hover-effect"
      ></lang-select>
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
              <el-dropdown-item>{{ $t('navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>{{ $t('navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="onLogoutBtnClick">
              {{ $t('navBar.logout') }}
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
import Breadcrumb from '@/components/breadcrumb/breadcrumb.vue'
import Humburger from '@/components/humburger/humburger.vue'
import langSelect from '@/components/lang-select/lang-select.vue'
import ThemeSelect from '@/components/theme-select/theme-select.vue'

export default {
  name: 'nav-bar',
  components: {
    Humburger,
    Breadcrumb,
    langSelect,
    ThemeSelect
  },
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

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e16;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
