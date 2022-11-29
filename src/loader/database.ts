import { Container } from "typeorm-typedi-extensions"
import { createConnection, useContainer } from "typeorm"

export const initDatabase = async () => {
  useContainer(Container)

  await createConnection({
    type: "postgres",
    url: "postgres://bdizucqk:3cXv40_uh3drpL2yWiqVbqfGtsuTFWvH@arjuna.db.elephantsql.com/bdizucqk",
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: false,
  })
    .then((connection) => {
      console.log("Database has been initialized!")
    })
    .catch((error) => {
      console.error("Error during Database initialization:", error)
      process.exit(1)
    })
}
