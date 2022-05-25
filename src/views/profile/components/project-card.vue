<template>
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>{{ $t('profile.introduce') }}</span>
      </div>
    </template>
    <div class="user-profile">
      <div class="box-center">
        <el-avatar shape="circle" :size="100" :src="userInfo.avatar" />
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ userInfo.username }}
        </div>
        <div class="user-role text-center text-muted">
          {{ userInfo.title }}
        </div>
      </div>
    </div>
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <svg-icon icon="introduce"></svg-icon>
          <span>{{ $t('profile.projectIntroduction') }}</span>
        </div>
        <div class="project-bio-section-body">
          <div class="text-muted">
            {{ $t('profile.muted') }}
          </div>
        </div>
      </div>
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <svg-icon icon="reward"></svg-icon>
          <span>{{ $t('profile.projectFunction') }}</span>
        </div>
        <div class="project-bio-section-body">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="progress-item"
          >
            <div>{{ feature.title }}</div>
            <el-progress
              status="success"
              :percentage="feature.percentage"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { useStore } from 'vuex'
import { IFeatureResultItem } from '@/api/user'

export default {
  props: {
    features: {
      type: Array as PropType<Array<IFeatureResultItem>>
    }
  },
  setup() {
    const store = useStore()
    const userInfo = store.getters.userInfo
    return {
      userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .project-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-bio-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .project-bio-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
