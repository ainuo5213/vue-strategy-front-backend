<template>
  <div><upload-excel :on-success="onSuccess"></upload-excel></div>
</template>

<script lang="ts">
import UploadExcel from '@/components/upload-excel/upload-excel.vue'
export default {
  name: 'import',
  components: {
    UploadExcel
  },
  setup() {
    function onSuccess(data) {
      console.log(data)
    }

    return {
      onSuccess
    }
  }
}
</script>

<style lang="scss" scoped></style>
