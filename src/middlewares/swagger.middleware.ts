import { Express } from "express"
import * as swaggerUi from "swagger-ui-express"

export const configSwagger = (app: Express) => {
  try {
    const swaggerDocument = require("../docs/swagger.json")
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  } catch (err) {
    console.error("Unable to read swagger.json", err)
  }
}
