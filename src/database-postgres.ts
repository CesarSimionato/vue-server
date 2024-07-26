import { randomUUID } from "node:crypto"

import { VideoProps } from "./dtos/video"

import { sql } from "./db"

export class DatabasePostgres {
  async list(search: string | undefined) {
    let videos

    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title ilike ${
        "%" + search + "%"
      }`
    } else {
      videos = await sql`SELECT * FROM videos`
    }

    return videos
  }

  async create(video: VideoProps) {
    const videoId = randomUUID()
    const { title, description, duration } = video

    await sql`
      INSERT INTO videos (id, title, description, duration) 
      VALUES (${videoId}, ${title}, ${description}, ${duration} )
    `
  }

  async update(id: string, video: VideoProps) {
    const { title, description, duration } = video

    await sql`
      UPDATE videos SET
      title = ${title}, 
      description = ${description}, 
      duration = ${duration}
      WHERE id = ${id}
    `
  }

  async delete(id: string) {
    await sql`DELETE FROM videos WHERE id = ${id}`
  }
}
