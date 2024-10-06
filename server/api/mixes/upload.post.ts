export default eventHandler(async (event) => {
  return hubBlob().handleUpload(event, {
    multiple: false,
    ensure: {
      maxSize: '300MB',
      types: ['audio']
    }
  })
})
