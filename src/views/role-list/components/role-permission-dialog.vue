<template>
  <el-dialog
    :title="$t('excel.roleDialogTitle')"
    :model-value="modelValue"
    @open="onDialogOpen"
    append-to-body
    :open-delay="0"
    @close="$emit('close')"
  >
    <el-tree
      v-loading="loading"
      ref="treeRef"
      :data="permissions"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
      :default-checked-keys="defaultCheckedKeys"
    >
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:modelValue', false)">{{
          $t('universal.cancel')
        }}</el-button>
        <el-button
          type="primary"
          @click="onDialogConfirm"
          :loading="updating"
          >{{ $t('universal.confirm') }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { getPermissions, IPermissionListResultDTO } from '@/api/permission'
import { getRolePermission, updateRolePermission } from '@/api/role'
import { PropType, ref } from 'vue'
import { watchLangChange } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
export default {
  name: 'role-permission-dialog',
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    roleId: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const rolePermissions = ref<Array<string>>([])
    const updating = ref(false)
    const treeRef = ref()
    const i18n = useI18n()
    const loading = ref(false)
    const permissions = ref<Array<IPermissionListResultDTO>>([])
    const defaultCheckedKeys = ref<Array<string>>([])
    async function onDialogConfirm() {
      try {
        updating.value = true
        await updateRolePermission({
          roleId: props.roleId,
          permissions: treeRef.value.getCheckedKeys()
        })
        ElMessage.success(i18n.t('role.updateRoleSuccess'))
        emit('update:modelValue', false)
      } finally {
        updating.value = false
      }
    }

    async function getAllPermissions() {
      const res = await getPermissions()
      permissions.value = res
    }

    async function getAllRolePermissions() {
      try {
        loading.value = true
        const res = await getRolePermission(props.roleId)
        rolePermissions.value = res
        defaultCheckedKeys.value = res.map((r) => {
          const arr = r.split('-')
          return arr[arr.length - 1]
        })
      } finally {
        loading.value = false
      }
    }

    getAllPermissions()
    watchLangChange(() => {
      getAllPermissions()
    })

    function onDialogOpen() {
      getAllRolePermissions()
    }

    return {
      onDialogConfirm,
      onDialogOpen,
      rolePermissions,
      permissions,
      defaultProps: {
        children: 'children',
        label: 'permissionName'
      },
      defaultCheckedKeys,
      treeRef,
      loading,
      updating
    }
  }
}
</script>
