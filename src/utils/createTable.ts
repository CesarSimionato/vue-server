import { sql } from "../db"

// sql`DROP TABLE IF EXISTS videos`.then(() => {
//   console.log("Drop table")
// })

sql`
  CREATE TABLE videos (
    id          TEXT PRIMARY KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
  )
`.then(() => {
  console.log("Created table")
})
