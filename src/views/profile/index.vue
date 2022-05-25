<template>
  <div class="my-container" v-loading="loading">
    <el-row>
      <el-col :span="6">
        <project-card class="project-card" :features="features"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName" class="tabs" @tab-change="onTabChange">
            <el-tab-pane :label="$t('profile.feature')" name="feature">
              <feature :features="features"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import ProjectCard from './components/project-card.vue'
import Chapter from './components/chapter.vue'
import Author from './components/author.vue'
import Feature from './components/feature.vue'
import { getFeature, IFeatureResultItem } from '@/api/user'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue-demi'
import { watchLangChange } from '@/utils/i18n'
export default {
  name: 'profile',
  components: { ProjectCard, Feature, Chapter, Author },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const activeName = computed(() => route.query.active || 'feature')
    const loading = ref(false)
    const features = ref<Array<IFeatureResultItem>>([])
    async function getUserFeature() {
      loading.value = true
      try {
        const data = await getFeature()
        features.value = data
      } catch {
        features.value = []
      } finally {
        loading.value = false
      }
    }
    watchLangChange(
      () => {
        getUserFeature()
      },
      {
        immediate: true
      }
    )

    function onTabChange(tabName) {
      router.push({
        query: {
          active: tabName
        }
      })
    }

    return {
      activeName,
      features,
      loading,
      onTabChange
    }
  }
}
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
