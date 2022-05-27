<template>
  <div class="upload-excel">
    <div
      class="drop"
      draggable
      @click="onUploadClick"
      @drop.stop.prevent="onDrop"
      @dragover.stop.prevent
      @dragenter.stop.prevent
    >
      <el-icon class="upload-icon"><upload-filled /></el-icon>
      <span>{{ $t('uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { read, utils } from 'xlsx'
import { PropType, ref } from 'vue'
import { getHeaderRow, isExcel } from '@/utils/excel'
import { ElMessage } from 'element-plus'
import { ExcelBody, ExcelHeader } from './types'

export default {
  props: {
    onBeforeUpload: {
      type: Function as PropType<(file: File) => boolean>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => true
    },
    onSuccess: {
      type: Function as PropType<(file: File) => void>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  setup(props) {
    const excelUploadInputRef = ref<HTMLInputElement>()
    const readingFile = ref(false)
    function onUploadClick() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.xlsx, .xls'
      input.addEventListener('change', onChange)
      input.click()
    }

    function onChange(e: Event) {
      if (readingFile.value) {
        return
      }
      const files = (e.target as any).files as File[]
      if (!prehandle(files)) {
        return
      }
      const rawFile = files[0]
      upload(rawFile)
    }

    function prehandle(files?: File[]) {
      if (!files || files.length !== 1) {
        ElMessage.error('必须要有一个文件')
        return false
      }
      const rawFile = files[0]
      if (!isExcel(rawFile)) {
        ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
        return false
      }
      return true
    }

    function upload(rawFile: File) {
      const done: boolean =
        typeof props.onSuccess === 'function' && props.onBeforeUpload(rawFile)
      if (!done) {
        return
      }
      readData(rawFile)
    }

    function readData(rawFile: File) {
      readingFile.value = true
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(rawFile)
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const data = (e.target as any).result
        const workBook = read(data, {
          type: 'array',
          cellDates: true
        })
        const firstSheetName = workBook.SheetNames[0]
        const workSheet = workBook.Sheets[firstSheetName]
        // 解析表头
        const header: ExcelHeader = getHeaderRow(workSheet)
        // 解析数据体
        const body: ExcelBody = utils.sheet_to_json(workSheet)
        generateData({ header, body })
        readingFile.value = false
      }
    }

    function generateData(data) {
      typeof props.onSuccess === 'function' && props.onSuccess(data)
    }

    function onDrop(e: DragEvent) {
      const files =
        e.dataTransfer && e.dataTransfer.files
          ? Array.from(e.dataTransfer.files)
          : undefined
      if (!prehandle(files)) {
        return
      }
      const rawFile = files![0]
      upload(rawFile)
    }

    return {
      onUploadClick,
      excelUploadInputRef,
      onDrop,
      onChange,
      readingFile
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    cursor: pointer;
    .upload-icon {
      margin: 0 auto;
    }
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
