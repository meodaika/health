import * as dotenv from "dotenv"

const configEnv = dotenv.config()
if (!configEnv) {
  throw new Error("Couldn't find .env file")
}

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 8080,

  jwtSecret: process.env.JWT_SECRET || "",

  database: {
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
  },

  blogSummaryLength: 200,

  photoUrl: process.env.PHOTO_URL || "http://localhost:8080/uploads/",
}
