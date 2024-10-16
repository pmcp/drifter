export default eventHandler(async () => {
  const db = hubDatabase()

  await db.exec('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, text TEXT, created_at INTEGER)')

  const { results } = await db.prepare('SELECT * FROM items ORDER BY created_at DESC').all()

  return results
})
