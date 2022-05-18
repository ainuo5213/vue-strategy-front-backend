<template>
  <div>
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'profile',
  data() {
    return {
      currentPage: 1,
      pageSize: 100
    }
  }
}
</script>

<style lang="scss" scoped></style>
