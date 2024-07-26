import { sql } from "../db.ts"

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
