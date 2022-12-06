import { Container } from "typeorm-typedi-extensions"
import { createConnection, useContainer } from "typeorm"
import { config } from "../configs/index.config"

export const initDatabase = async () => {
  useContainer(Container)

  const database = await createConnection({
    type: "postgres",
    url: config.database.url,
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: false,
  })
    .then((connection) => {
      console.log("Database has been initialized!")
      return connection
    })
    .catch((error) => {
      console.error("Error during Database initialization:", error)
      process.exit(1)
    })

  return database
}
