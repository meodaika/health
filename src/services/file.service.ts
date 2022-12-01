import { Service } from "typedi"
import sharp from "sharp"
import path from "path"
import fs from "fs"
import HttpException from "../exceptions/http.exception"

@Service()
export default class FileService {
  async processPhoto(photo: Express.Multer.File) {
    const { filename: image } = photo
    try {
      await sharp(photo.path)
        .resize(400, 300)
        .jpeg({ quality: 50 })
        .toFile(path.resolve(photo.destination, "thumbnail", image))
    } catch (err) {
      throw new HttpException("Can not process file ", 400)
    }
    return photo.filename
  }
}
