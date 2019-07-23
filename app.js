const Koa = require("koa");
const Router = require("koa-router");
const multer = require("koa-multer");
const { join } = require("path");

const app = new Koa();
const router = new Router();

const storage = multer.diskStorage({
  destination: join(process.cwd(), "upload"),
  filename(req, file, cb) {
    const filename = file.originalname.split(".");
    cb(null, `${Date.now()}.${filename[filename.length - 1]}`);
  }
});

const upload = multer({ storage });

router.post("/v5/medias", upload.single("file"), async ctx => {
  console.log(ctx.req.file);
  ctx.body = {
    filename: ctx.req.file.filename
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
