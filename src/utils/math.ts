export function swap<T>(arr: T[], index1: number, index2: number) {
  const t = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = t
}
