<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        :title="feature.title"
        :name="feature.id"
        v-for="feature in features"
        :key="feature.id"
      >
        <div v-html="feature.content"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { PropType, ref } from 'vue'
import { IFeatureResultItem } from '@/api/user'
export default {
  props: {
    features: {
      type: Array as PropType<Array<IFeatureResultItem>>
    }
  },
  setup() {
    const activeNames = ref([])
    return {
      activeNames
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.el-collapse-item__header) {
  font-weight: bold;
}

.el-collapse-item {
  ::v-deep(a) {
    color: #2d62f7;
    margin: 0 4px;
  }
}
</style>
