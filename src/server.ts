import "reflect-metadata"
import { config } from "./configs/index.config"
import { setupServer } from "./loader/app"

const main = async () => {
  const app = await setupServer()

  const port = config.port
  app.listen(port, () => console.log(`App is running at port ${port}`))
}

main()
