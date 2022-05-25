<template>
  <el-timeline>
    <el-timeline-item
      v-for="chatper in chatpers"
      :key="chatper.id"
      :timestamp="chatper.timestamp"
    >
      <el-card>
        <h4>{{ chatper.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang="ts">
import { getChapter, IChapterResultItem } from '@/api/user'
import { ref } from 'vue-demi'
import { watchLangChange } from '@/utils/i18n'
export default {
  setup() {
    const chatpers = ref<Array<IChapterResultItem>>([])
    async function getUserChapter() {
      const data = await getChapter()
      chatpers.value = data
    }
    getUserChapter()
    watchLangChange(() => {
      getUserChapter()
    })
    return {
      chatpers
    }
  }
}
</script>

<style></style>
