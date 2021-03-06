const fastify = require('fastify')({ logger: true })

async function slowPromise() {
  const rand = Math.random() * 10000
  await new Promise((resolve) => setTimeout(resolve, rand))
  return true
}

fastify.get('/', (req, reply) => {
  reply.send({ ok: true })
})

fastify.get('/slow', async (req, reply) => {
  const result = await slowPromise()
  return { ok: result }
})

fastify.listen(3000, '0.0.0.0', (err) => {
  if (err) throw err
})
