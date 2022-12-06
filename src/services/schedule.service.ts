import schedule from "node-schedule"
import { Inject } from "typedi"
import { SocketService } from "./socket.service"

@Inject()
export class ScheduleService {
  constructor(private socketService: SocketService) {
    const jbo = schedule.scheduleJob("*/5 * * * *", function () {
      socketService.sendNoti()
    })
  }
}
