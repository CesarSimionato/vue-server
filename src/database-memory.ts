import { randomUUID } from "node:crypto"

import { VideoProps } from "./dtos/video"

export class DatabaseMemory {
  #videos = new Map()

  list(search: string | undefined) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
          id,
          ...data,
        }
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search)
        }

        return true
      })
  }

  create(video: VideoProps) {
    const videoId = randomUUID()

    this.#videos.set(videoId, video)
  }

  update(id: string, video: VideoProps) {
    this.#videos.set(id, video)
  }

  delete(id: string) {
    this.#videos.delete(id)
  }
}
