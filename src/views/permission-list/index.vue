<template>
  <el-card>
    <el-table
      v-loading="loading"
      :data="permissions"
      width="100%"
      style="margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="permissionName"
        :label="$t('permission.name')"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="permissionMark"
        :label="$t('permission.mark')"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="permissionDesc" :label="$t('permission.desc')">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { getPermissions, IPermissionListResultDTO } from '@/api/permission'
import { ref } from 'vue'
import { watchLangChange } from '@/utils/i18n'

export default {
  name: 'permission-list',
  setup() {
    const loading = ref(false)
    const permissions = ref<Array<IPermissionListResultDTO>>([])
    async function getPermissionList() {
      try {
        loading.value = true
        const res = await getPermissions()
        permissions.value = res
      } finally {
        loading.value = false
      }
    }

    watchLangChange(
      () => {
        getPermissionList()
      },
      {
        immediate: true
      }
    )

    return {
      permissions,
      loading
    }
  }
}
</script>

<style lang="scss" scoped></style>
