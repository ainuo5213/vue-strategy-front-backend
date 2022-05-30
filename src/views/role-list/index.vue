<template>
  <div class="role-list-container">
    <el-card>
      <el-table :data="roles" border width="100%">
        <el-table-column
          type="index"
          :label="$t('role.index')"
          width="120"
        ></el-table-column>
        <el-table-column
          :label="$t('role.name')"
          prop="title"
        ></el-table-column>
        <el-table-column
          :label="$t('role.desc')"
          prop="describe"
        ></el-table-column>
        <el-table-column :label="$t('role.action')" width="200">
          <template #default="{ row }">
            <el-button
              v-permission="'distributePermission'"
              size="small"
              type="primary"
              @click="onRoleActionBtnClick(row)"
              >{{ $t('role.assignPermissions') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <role-permission-dialog
      v-model="rolePermissionDialogVisible"
      :role-id="selectedRoleId"
      @close="onDialogClose"
    ></role-permission-dialog>
  </div>
</template>

<script lang="ts">
import { getRoles, IRoleListResultDTO } from '@/api/role'
import { ref } from 'vue'
import { watchLangChange } from '@/utils/i18n'
import RolePermissionDialog from './components/role-permission-dialog.vue'

export default {
  name: 'role-list',
  components: {
    RolePermissionDialog
  },
  setup() {
    const roles = ref<Array<IRoleListResultDTO>>([])
    const selectedRoleId = ref<string>('')
    const rolePermissionDialogVisible = ref(false)
    const loading = ref(false)
    async function getRoleList() {
      try {
        loading.value = true
        const res = await getRoles()
        roles.value = res
      } finally {
        loading.value = false
      }
    }
    watchLangChange(
      () => {
        getRoleList()
      },
      {
        immediate: true
      }
    )

    function onRoleActionBtnClick(data: IRoleListResultDTO) {
      selectedRoleId.value = data.id
      rolePermissionDialogVisible.value = true
    }

    function onDialogClose() {
      selectedRoleId.value = ''
    }

    return {
      roles,
      selectedRoleId,
      onRoleActionBtnClick,
      rolePermissionDialogVisible,
      onDialogClose
    }
  }
}
</script>
<style lang="scss" scoped></style>
