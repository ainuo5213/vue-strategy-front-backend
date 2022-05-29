<template>
  <el-dialog
    :title="$t('excel.roleDialogTitle')"
    :model-value="modelValue"
    append-to-body
    @close="onDialogClose"
    @open="onDialogOpen"
  >
    <el-checkbox-group v-model="currentUserRoles">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{
        item.title
      }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:modelValue', false)">{{
          $t('universal.cancel')
        }}</el-button>
        <el-button
          type="primary"
          :loading="updating"
          @click="onDialogConfirm"
          >{{ $t('universal.confirm') }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  getUserRoles,
  IUserRoleResultDTO,
  updateUserRoles
} from '@/api/user-manage'
import { PropType, ref } from 'vue'
import { getRoles, IRoleListResultDTO } from '@/api/role'
import { watchLangChange } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

export default {
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    userId: {
      type: String as PropType<string>,
      required: true
    }
  },
  emits: ['update:modelValue', 'update-role', 'close'],
  setup(props, { emit }) {
    const userRoles = ref<IUserRoleResultDTO>({
      role: [],
      _id: ''
    })
    const i18n = useI18n()
    const currentUserRoles = ref<Array<string>>([])
    const roles = ref<Array<IRoleListResultDTO>>([])
    const updating = ref(false)
    function onDialogClose() {
      emit('close')
    }

    async function onDialogConfirm() {
      try {
        updating.value = true
        const data = roles.value.filter(
          (r) => currentUserRoles.value.findIndex((p) => r.id === p) > -1
        )
        await updateUserRoles(props.userId, data)
        ElMessage.success(i18n.t('role.updateRoleSuccess'))
        emit('update-role', data)
        emit('update:modelValue', false)
      } finally {
        updating.value = false
      }
    }

    async function getAllRoles() {
      const res = await getRoles()
      roles.value = res
    }

    async function getAllUserRoles() {
      const userId = props.userId
      const res = await getUserRoles(userId)
      currentUserRoles.value = res.role.map((r) => r.id)
      userRoles.value = res
    }
    getAllRoles()

    function onDialogOpen() {
      getAllUserRoles()
    }
    watchLangChange(() => {
      getAllRoles()
    })

    return {
      onDialogClose,
      onDialogConfirm,
      onDialogOpen,
      userRoles,
      roles,
      updating,
      currentUserRoles
    }
  }
}
</script>

<style></style>
