import { onMounted, onUnmounted, Ref, SetupContext, watch } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import '@toast-ui/editor/dist/i18n/en-us'
import '@toast-ui/editor/dist/toastui-editor.css'
import { useStore } from 'vuex'
import { watchLangChange } from '@/utils/i18n'
import '@toast-ui/chart/dist/toastui-chart.css'
import chart from '@toast-ui/editor-plugin-chart'
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import syntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import '@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css'
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
import uml from '@toast-ui/editor-plugin-uml'

export interface MarkdownEditorProps {
  modelValue: string
}

export default function useMarkdownEditor(
  editorRef: Ref<HTMLElement>,
  props: MarkdownEditorProps,
  context: SetupContext<'update:modelValue'[]>
) {
  let editor: Editor
  const store = useStore()
  onMounted(() => {
    createMarkdownEditor(editorRef.value)
  })

  function createMarkdownEditor(el: HTMLElement) {
    editor = new Editor({
      el,
      height: '500px',
      previewStyle: 'vertical',
      language: store.getters.language === 'zh' ? 'zh-CN' : 'en',
      plugins: [chart, syntaxHighlight, colorSyntax, tableMergedCell, uml],
      initialValue: props.modelValue
    })
    editor.on('change', onValueChange)
  }

  function onValueChange() {
    context.emit('update:modelValue', editor.getMarkdown())
  }

  watch(
    () => props.modelValue,
    (newValue) => {
      if (editor && newValue) {
        editor.setMarkdown(newValue)
      }
    },
    {
      immediate: true
    }
  )

  watchLangChange(() => {
    if (!editorRef.value) {
      return
    }
    const markdown = editor.getMarkdown()
    destroyEditor()
    createMarkdownEditor(editorRef.value)
    editor.setMarkdown(markdown)
  })
  function destroyEditor() {
    editor.off('change')
    editor.destroy()
  }
  onUnmounted(() => {
    destroyEditor()
  })
  return {
    editor: editor!
  }
}
