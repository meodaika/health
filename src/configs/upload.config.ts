import multer from "multer"
import * as path from "path"

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  },
})

export const photoUploadOptions = {
  storage: storageEngine,
  fileFilter: (req: any, file: any, cb: any) => {
    checkFileType(file, cb)
  },
  limits: { fileSize: 1000000 },
}

const checkFileType = function (file: any, cb: any) {
  const fileTypes = /jpeg|jpg|png|gif/

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

  const mimeType = fileTypes.test(file.mimetype)

  if (mimeType && extName) {
    return cb(null, true)
  } else {
    cb("You can Only Upload Images!!")
  }
}
