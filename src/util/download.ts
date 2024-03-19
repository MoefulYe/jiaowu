export default (filename: string, blob: Blob) => {
  const a = document.createElement('a')
  a.setAttribute('download', filename)
  const href = URL.createObjectURL(blob)
  a.href = href
  a.setAttribute('target', '_blank')
  a.click()
  URL.revokeObjectURL(href)
}
