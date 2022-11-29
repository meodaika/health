import { setupServer } from "./loader/app"

const main = async () => {
  const app = setupServer()

  const port = 8080
  app.listen(port, () => console.log(`App is running at port ${port}`))
}

main()
