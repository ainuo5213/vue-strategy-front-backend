<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printing" v-print="printData">{{
        $t('userInfo.print')
      }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="user-info-box" v-if="userInfo">
        <h2 class="title">{{ $t('userInfo.title') }}</h2>
        <div class="header">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('userInfo.name')">{{
              userInfo.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.sex')">{{
              userInfo.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.nation')">{{
              userInfo.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.mobile')">{{
              userInfo.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.province')">{{
              userInfo.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.date')">{{
              dayjs(
                Number.isNaN(+userInfo.openTime)
                  ? userInfo.openTime
                  : +userInfo.openTime
              ).format('YYYY-MM-DD HH:mm:ss')
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.remark')" :span="2">
              <el-tag
                v-for="(item, index) in userInfo.remark"
                :key="index"
                class="remark"
                size="small"
                >{{ item }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.address')" :span="2">{{
              userInfo.address
            }}</el-descriptions-item>
          </el-descriptions>
          <el-image class="avatar" :src="userInfo.avatar"></el-image>
        </div>
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('userInfo.experience')">
              <ul>
                <li v-for="(item, index) in userInfo.experience" :key="index">
                  <span
                    >{{
                      dayjs(
                        Number.isNaN(+item.startTime)
                          ? item.startTime
                          : +item.startTime
                      ).format('YYYY-MM')
                    }}
                    ----
                    {{
                      dayjs(
                        Number.isNaN(+item.endTime)
                          ? item.endTime
                          : +item.endTime
                      ).format('YYYY-MM')
                    }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.major')">
              {{ userInfo.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.glory')">
              {{ userInfo.glory }}</el-descriptions-item
            >
          </el-descriptions>
        </div>
        <div class="foot">{{ $t('userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { PropType, ref } from 'vue'
import { getUerDetail, IUserInfoDetailResultDTO } from '@/api/user-manage'
import { watchLangChange } from '@/utils/i18n'
export default {
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    }
  },
  name: 'user-info',
  setup(props) {
    const userInfo = ref<IUserInfoDetailResultDTO>()
    const printing = ref(false)
    const printData = {
      id: 'user-info-box',
      popTitle: 'imooc-vue-element-admin',
      beforeOpenCallback() {
        printing.value = false
      },
      openCallback() {
        printing.value = true
      },
      closeCallback() {
        printing.value = false
      }
    }
    async function getUserDetailInfo(userId: string) {
      const res = await getUerDetail(userId)
      userInfo.value = res
    }

    watchLangChange(
      () => {
        getUserDetailInfo(props.id)
      },
      {
        immediate: true
      }
    )

    return {
      userInfo,
      printing,
      printData
    }
  }
}
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}

.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep(.el-descriptions) {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
