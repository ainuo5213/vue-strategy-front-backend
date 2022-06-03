import Sortable, { Options } from 'sortablejs'
import { onMounted, ref, Ref } from 'vue'
export default function useSortable(
  tableRef: Ref<any>,
  canSort: Ref<boolean>,
  config?: Options
) {
  const sortable = ref<Sortable>()
  onMounted(() => {
    if (canSort.value) {
      const sortParent = tableRef.value.$el.querySelector(
        '.el-table__body tbody'
      )
      if (sortParent) {
        config = config || {
          ghostClass: 'sortable-ghost'
        }
        sortable.value = Sortable.create(sortParent as HTMLElement, config)
      }
    }
  })
  return {
    sortable
  }
}
