<template>
  <div><upload-excel :on-success="onSuccess"></upload-excel></div>
</template>

<script lang="ts">
import UploadExcel from '@/components/upload-excel/upload-excel.vue'
import { ExcelBody, ExcelHeader } from '@/components/upload-excel/types'
import { genUserJson } from './import'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'import',
  components: {
    UploadExcel
  },
  setup() {
    const router = useRouter()
    const i18n = useI18n()
    const store = useStore()
    async function onSuccess(data: { header: ExcelHeader; body: ExcelBody }) {
      const uploadData = genUserJson(data.body, (userInfo) => {
        userInfo.openTime = dayjs(userInfo.openTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      })
      await userBatchImport(uploadData)
      ElMessage.success(data.body.length + i18n.t('excel.importSuccess'))
      store.commit('app/removeTagView', {
        type: 'current',
        tagView: store.getters.currentTagView
      })
      router.push({
        name: 'userManage'
      })
    }

    return {
      onSuccess
    }
  }
}
</script>

<style lang="scss" scoped></style>
