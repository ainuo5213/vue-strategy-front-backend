<template>
  <el-dialog
    :title="$t('universal.title')"
    :model-value="modeValue"
    @close="onDialogClose"
    width="15%"
  >
    <div class="center">
      <div class="title">{{ $t('theme.themeColorChange') }}</div>
      <el-color-picker
        v-model="color"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">{{
        $t('universal.cancel')
      }}</el-button>
      <el-button type="primary" @click="onConfirm">{{
        $t('universal.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { PropType, ref } from 'vue-demi'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
export default {
  name: 'color-select-dialog',
  props: {
    modeValue: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const color = ref(store.getters.mainColor || '#0f0')
    function onDialogClose() {
      emit('close')
    }

    async function onConfirm() {
      store.commit('theme/setMainColor', color.value)
      emit('update:modelValue', false)
      const newStyle = await generateNewStyle(color.value)
      writeNewStyle(newStyle)
    }

    return {
      color,
      onDialogClose,
      onConfirm,
      predefineColors
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
