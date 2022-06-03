<template>
  <div class="markdown-wrapper">
    <div id="editor" ref="editorRef"></div>
  </div>
</template>

<script lang="ts">
import { PropType, ref, SetupContext } from 'vue'
import useMarkdownEditor, { MarkdownEditorProps } from './use-markdown-editor'

export default {
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(
    props: MarkdownEditorProps,
    context: SetupContext<'update:modelValue'[]>
  ) {
    const editorRef = ref()
    const { editor } = useMarkdownEditor(editorRef, props, context)
    return {
      editorRef,
      editor: editor
    }
  }
}
</script>

<style lang="scss" scoped></style>
