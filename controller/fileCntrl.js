import multer from "multer";
import path from "path";
import File from "../models/file";
const { v4: uuid4 } = require("uuid");
import { APP_URL } from "../config";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const ufname = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, ufname);
  },
});

const handleFile = multer({
  storage,
  limits: { fileSize: 100000 * 10000 },
}).single("myfile");

const fileCntrl = {
  async create(req, res, next) {

    handleFile(req, res, async (err) => {
      if (err) {
        return next(res.json({ error: "all field require.." }));
      }

      let filePath;
      try {
        filePath = req.file.path;
      } catch (err) {
        return next(res.json({ error: "all field require.." }));
      }

      if (!filePath) {
        return next(res.json({ error: "all field require.." }));
      }

      let filedocx;

      try {
        filedocx = await File.create({
          filename: req.file.filename,
          path: req.file.path,
          filesize: req.file.size,
          uuid: uuid4(),
        });
      } catch (err) {
        return next(err);
      }

      return res
        .status(201)
        .json({id: filedocx._id, resfile: `${APP_URL}/files/${filedocx.uuid}`, });
    });
  },
  
  async rend(req, res, next) {
             return res.render('index')
  },
  //show file controller
  async show(req, res, next) {
    try {
      const file = await File.findOne({ uuid: req.params.uuid });
      if (!file) {
        return res.render("fileview", {
          error: "link has been expired or remove permanently",
        });
      }

      return res.render("fileview", {
        uuid: file.uuid,
        filename: file.filename,
        filesize: file.filesize,
        downloadLink: `${APP_URL}/files/download/${file.uuid}`,
      });
    } catch (err) {
      return res.render("index", { error: "something error" });
    }
  },

  async download(req, res, next) {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.render("download", { error: "Link has been expired" });
    }
    const mpath = path.resolve(__dirname, "../");
    const fpath = `${mpath}/${file.path}`;
    res.download(fpath);
  },
};

export default fileCntrl;
