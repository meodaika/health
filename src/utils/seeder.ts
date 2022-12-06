import { initDatabase } from "../loader/database"
import { EntityManager } from "typeorm"
import { Record } from "../entities/record.entity"
import { faker } from "@faker-js/faker"
import { User } from "../entities/user.entity"
import * as bcrypt from "bcrypt"
import dayjs from "dayjs"

const seedData = async () => {
  const database = await initDatabase()
  const entity = new EntityManager(database)

  await entity.delete(Record, {})
  const testUserPass = await bcrypt.hash("123456", 10)
  let user = await entity.findOne(User, { email: "test@gmail.com" })
  if (!user) {
    user = await entity.save(User, {
      username: "Mr Test",
      email: "test@gmail.com",
      password: testUserPass,
    })
  }

  // seed record
  /*   const times = faker.date.betweens(
    "2022-12-01T00:00:00.000Z",
    "2022-12-31T00:00:00.000Z",
    30
  )
  const records = 0
  for (let i = 0; i < times.length; i++) {
    await entity.insert(Record, {
      weight: faker.datatype.float({ min: 50, max: 60, precision: 0.01 }),
      fatPercent: faker.datatype.float({ min: 25, max: 30, precision: 0.01 }),
      time: Number(dayjs(times[i]).format("YYYYMMDDHHmm")),
      user: user.id as any,
    })
  } 
  
  console.log(`Generated ${times.length} record`)
  */

  for (let i = 3; i < 15; i++) {
    for (let j = 0; j < 24; j++) {
      const day = i.toString().padStart(2, "0")
      const hour = j.toString().padStart(2, "0")
      console.log(day, hour)
      await entity.insert(Record, {
        weight: faker.datatype.float({ min: 55, max: 60, precision: 0.01 }),
        fatPercent: faker.datatype.float({ min: 27, max: 30, precision: 0.01 }),
        time: Number(
          dayjs(`2022-12-${day}T${hour}:00:00.000Z`).format("YYYYMMDDHHmm")
        ),
        user: user.id as any,
      })
    }
  }

  process.exit(1)
}

seedData()
