export default eventHandler(async (event) => {
  return hubBlob().handleUpload(event, {
    multiple: false,
    ensure: {
      maxSize: '1024MB',
      types: ['audio']
    }
  })
})
