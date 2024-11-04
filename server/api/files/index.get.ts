export default eventHandler(async () => {
  const { blobs } = await hubBlob().list()
  console.log('blobs', blobs)
  return blobs
})
