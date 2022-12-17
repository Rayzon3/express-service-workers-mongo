import multer from "multer";
import makeId from "../util/helpers";
import path from "path";
import { Request } from "express";

const fileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./files");
  },
  filename: function (req, file, callback) {
    const name = makeId(15);
    callback(null, name + path.extname(file.originalname));
  },
});


const fileFilter = (_: Request, file: any, callback: any) => {
  if (file.mimetype === "file/csv" || "file/xlsx") {
    callback(null, true);
  } else {
    callback(new Error("The file must be a xlsx or csv"), false);
  }
};

export const upload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, //file size limit 5MB
  },
  fileFilter: fileFilter,
});

