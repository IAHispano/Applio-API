import { Hono } from 'hono'
import { logger } from 'hono/logger'
import pingRouter from "./routes/ping"
import modelsRouter from "./routes/models"

const app = new Hono()

app.use('*', logger())
app.notFound((c) => {
  return c.text('Endpoint not found (404), please see https://applio.org/api/docs', 404)
})
app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Unexpected error (500), report the error in https://github.com/IAHispano/Applio-API/issues', 500)
})


app.route("/ping", pingRouter)
app.route("/models", modelsRouter)


export default {
  port: 4000,
  fetch: app.fetch,
}