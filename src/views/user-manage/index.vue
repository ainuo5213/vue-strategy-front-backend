<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div class="excel-btn">
        <el-button
          type="primary"
          v-permission="'importUser'"
          @click="onImportExcelClick"
          >{{ $t('excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onExportExcelClick">{{
          $t('excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="tableManageData.list"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          :label="$t('excel.name')"
          prop="username"
        ></el-table-column>
        <el-table-column
          :label="$t('excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <el-table-column :label="$t('excel.avatar')" width="120">
          <template #default="{ row }">
            <div class="center">
              <el-avatar
                :src="row.avatar"
                class="avatar"
                shape="circle"
              ></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length">
              <el-tag v-for="role in row.role" :key="role.id" size="small">{{
                role.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.openTime')" prop="openTime">
          <template #default="{ row }">
            {{ dayjs(row.openTime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.action')" fixed="right" width="240">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onDetailBtnClick(row)"
              >{{ $t('excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="small"
              @click="onShowRoleBtnClick(row)"
              v-permission="'distributeRole'"
              >{{ $t('excel.showRole') }}</el-button
            >
            <el-button
              @click="onUserRemoveBtnClick(row)"
              type="danger"
              size="small"
              v-permission="'removeUser'"
              >{{ $t('excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          class="pagination"
          @current-change="onCurrentPageChange"
          @size-change="onPageSizeChange"
          :current-page="requestParameter.page"
          :page-size="requestParameter.size"
          :page-sizes="pageSizes"
          :total="tableManageData.total"
          :layout="layout"
        ></el-pagination>
      </div>
    </el-card>

    <role-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @update-role="onRoleUpdated"
      @close="onDialogClose"
    ></role-dialog>
  </div>
</template>

<script lang="ts">
import { pageSizes, layout } from '@/config/pagination'
import {
  getManageUsers,
  IManageUserRequestParameter,
  IManageUserInfoResultDTO,
  deleteUser,
  getTotalUser,
  IManageRoleInfoResultDTO
} from '@/api/user-manage'
import { PaginationWrapper } from '@/types'
import { onActivated, ref } from 'vue'
import { watchLangChange } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { formatJson, json2Excel } from './export'
import dayjs from 'dayjs'
import RoleDialog from './components/role-dialog.vue'
import { IRoleListResultDTO } from '@/api/role'
export default {
  name: 'user-manage',
  components: {
    RoleDialog
  },
  setup() {
    const router = useRouter()
    const i18n = useI18n()
    const loading = ref(false)
    const selectUserId = ref<string>('')
    const roleDialogVisible = ref(false)
    const requestParameter = ref<IManageUserRequestParameter>({
      size: 5,
      page: 1
    })
    const tableManageData = ref<PaginationWrapper<IManageUserInfoResultDTO>>({
      list: [],
      page: requestParameter.value.page,
      size: requestParameter.value.size,
      total: 0
    })
    async function gerUsers() {
      loading.value = true
      try {
        const data = await getManageUsers(requestParameter.value)
        tableManageData.value = data
      } catch {
        tableManageData.value.list = []
        tableManageData.value.total = 0
      } finally {
        loading.value = false
      }
    }
    watchLangChange(
      () => {
        gerUsers()
      },
      {
        immediate: true
      }
    )
    onActivated(() => {
      gerUsers()
    })

    function onPageSizeChange(newPageSize: number) {
      requestParameter.value.size = newPageSize
      requestParameter.value.page = 1
      gerUsers()
    }

    function onCurrentPageChange(currentPage: number) {
      requestParameter.value.page = currentPage
      gerUsers()
    }

    function onImportExcelClick() {
      router.push({
        name: 'import'
      })
    }

    async function onUserRemoveBtnClick(user: IManageUserInfoResultDTO) {
      const warnInfo =
        i18n.t('excel.dialogTitle1') +
        user.username +
        i18n.t('excel.dialogTitle2')
      await ElMessageBox.confirm(warnInfo, i18n.t('excel.dialogTitle0'), {
        type: 'warning'
      })
      await deleteUser(user._id)
      ElNotification({
        title: i18n.t('excel.removeSuccessTitle'),
        message: i18n.t('excel.removeSuccess'),
        type: 'success'
      })
      gerUsers()
    }

    function onExportExcelClick() {
      ElMessageBox.prompt(i18n.t('excel.genExcelTitle'), {
        showCancelButton: true,
        showInput: true,
        inputPlaceholder: i18n.t('excel.placeholder'),
        inputValidator(value: string) {
          return value.length > 0
        },
        inputErrorMessage: i18n.t('excel.errorExcelName'),
        inputValue: i18n.t('excel.defaultName'),
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            if (!instance.inputValidator(instance.inputValue)) {
              return
            }
            instance.confirmButtonLoading = true
            instance.confirmButtonText = i18n.t('excel.genExceling')
            try {
              await exportExcel(instance.inputValue)
            } catch (err: any) {
              ElMessage.error(err.message)
            } finally {
              done()
            }
          } else {
            done()
          }
        }
      }).then((res) => {
        console.log(res)
      })
    }

    async function exportExcel(fileName: string) {
      const { list } = await getTotalUser()
      const normalizedJson = formatJson(
        list,
        (columnName: string, columnData: any) => {
          if (columnName === 'role') {
            const roles = columnData as IManageRoleInfoResultDTO[]

            return roles.map((role) => role.title).toString()
          } else if (columnName === 'openTime') {
            return dayjs(
              Number.isNaN(+columnData) ? columnData : +columnData
            ).format('YYYY-MM-DD HH:mm:ss')
          }
          return columnData
        }
      )
      json2Excel(fileName, normalizedJson)
    }

    function onDetailBtnClick(userInfo: IManageUserInfoResultDTO) {
      router.push({
        name: 'userInfo',
        params: {
          id: userInfo._id
        }
      })
    }

    function onShowRoleBtnClick(userInfo: IManageUserInfoResultDTO) {
      roleDialogVisible.value = true
      selectUserId.value = userInfo._id
    }

    function onRoleUpdated(data: Array<IRoleListResultDTO>) {
      const userId = selectUserId.value
      const user = tableManageData.value.list.find((r) => r._id === userId)
      if (user) {
        user.role = data.map((r) => ({ id: r.id, title: r.title }))
      }
    }
    function onDialogClose() {
      selectUserId.value = ''
    }
    return {
      tableManageData,
      requestParameter,
      loading,
      onPageSizeChange,
      onCurrentPageChange,
      pageSizes,
      onImportExcelClick,
      onUserRemoveBtnClick,
      onExportExcelClick,
      onDetailBtnClick,
      onShowRoleBtnClick,
      onRoleUpdated,
      onDialogClose,
      roleDialogVisible,
      selectUserId,
      layout
    }
  }
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep(.el-tag) {
    margin-right: 6px;
  }

  .center {
    text-align: center;
  }
}
</style>
