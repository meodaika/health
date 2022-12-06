import { Server } from "socket.io"
import { Inject } from "typedi"
import { config } from "../configs/index.config"
import { IJwtPayload } from "../interfaces/jwtPayload.interface"
import * as jwt from "jsonwebtoken"
import dayjs from "dayjs"
import { InjectRepository } from "typeorm-typedi-extensions"
import { User } from "../entities/user.entity"
import { Repository } from "typeorm"

interface IRoomTime {
  [timePoint: string]: {
    [userId: string]: string
  }
}

interface ISocketConnect {
  [k: string]: {
    socket: any
    roomTime: string
  }
}

const defaultScheduleNoti: { [k: string]: string } = {
  "0700": "morning",
  "1200": "lunch",
  "1900": "dinner",
}

@Inject()
export class SocketService {
  private io
  private roomTimes: IRoomTime = {}
  private socketConnection: ISocketConnect = {}
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    // init time

    this.io = new Server(8081, {
      cors: {
        origin: "*",
      },
    })
    this.io.on("connection", (socket) => {
      // console.log("user connected")
      // handle user disconnect , remove from roomTime and list connection
    })

    this.io.use(async (socket, next) => {
      var { token: authHeader } = socket.handshake.auth
      const currentUser = await this.getCurrentUser(authHeader)
      if (currentUser === false)
        throw new Error("Cannot get current User socket")

      // disconnect socket if dont find a user
      // console.log(currentUser, "currentUser:::")

      // find schedule noti of user ( in database)
      const currentUserInfo = await this.userRepository.findOne(currentUser.id)
      console.log(`User: ${currentUserInfo?.username} connected`)

      const userScheduleData = Object.fromEntries(
        Object.entries(currentUserInfo?.notify).map((a) => a.reverse())
      )
      const userSchedule = { ...defaultScheduleNoti, ...userScheduleData }
      console.log(userSchedule)

      // determine next time point to send noti to this user
      const currentTime = dayjs().format("HHmm")
      const scheduleSorted = Object.keys(userSchedule).sort(function (a, b) {
        return Number(a) - Number(b)
      })
      let nextSchedulePoint = scheduleSorted.find((sche) => {
        return Number(sche) > Number(currentTime)
      })

      nextSchedulePoint = nextSchedulePoint || scheduleSorted[0]

      // set infor of current user to list RoomTime and list Socket connection
      this.roomTimes[nextSchedulePoint] = {
        [currentUser.id]: userSchedule[nextSchedulePoint],
      }
      this.socketConnection[currentUser.id] = {
        socket,
        roomTime: nextSchedulePoint,
      }

      next()
    })
  }

  async getCurrentUser(authHeader: string) {
    if (!authHeader) return false
    const token = authHeader.split(" ")[1]
    const currentUser = (await jwt.verify(
      token,
      config.jwtSecret
    )) as IJwtPayload

    return currentUser
  }
  catch(error: any) {
    console.log("Cannot get current User socket", error)
    return false
  }

  sendNoti() {
    // run this function every 5 minute
    // send noti to all user has current time is schedule
    const timePoint = dayjs().format("HHmm")

    if (!this.roomTimes[timePoint]) {
      console.log("do no thing")
    } else {
      console.log("sent noti to users")
      const usersChedule = this.roomTimes[timePoint]
      for (let user in usersChedule) {
        this.socketConnection[user].socket.emit("health", {
          health: usersChedule[user],
        })
      }
    }
  }
}
