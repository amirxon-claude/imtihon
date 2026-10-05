import { createApp } from './src/app.js'
import { createStore } from './src/store.js'

const port = Number(process.env.PORT) || 3001
const store = createStore()

await store.init()
createApp(store).listen(port, () => {
  console.log(`Makon API: http://localhost:${port}`)
})
