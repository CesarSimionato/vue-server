import fastify from "fastify"
import fastifyCors from "@fastify/cors"

import { VideoProps } from "./dtos/video"

// import { DatabaseMemory } from "./database-memory"
import { DatabasePostgres } from "./database-postgres"

const server = fastify()

server.register(fastifyCors, {
  origin: "*"
})

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// Create
server.post<{ Body: VideoProps }>("/videos", async (request, reply) => {
  const { title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
})

// Read
server.get<{ Querystring: { search?: string } }>("/videos", async (request) => {
  const { search } = request.query

  const videos = await database.list(search)

  return videos
})

// Update
server.put<{ Body: VideoProps; Params: { id: string } }>(
  "/videos/:id",
  async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
      title,
      description,
      duration,
    })

    return reply.status(204).send()
  }
)

// Delete
server.delete<{ Params: { id: string } }>(
  "/videos/:id",
  async (request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)

    return reply.status(204).send()
  }
)

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
    await server.listen({
      host: "0.0.0.0",
      port,
    })
    server.log.info(`Server listening on http://localhost:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
