
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import bodyparser from "body-parser";
import { createAuthentication } from "./middlewares/authenticate/index.js";
import { createRespond } from "./middlewares/respond/index.js";
import cookieParser from "cookie-parser";
import dayjs from "dayjs";
import { dirname, join } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import connection from "./db.js";
import initRoutes from "./routes/index.js";
import { setUser } from "./routes/user/sql.js";
// import { createFetchPlugin } from './middlewares/fetch/index.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
export const port: number = 3000
app.use(cors({
  credentials: true,
}))

app.use(
  bodyparser()
);
app.use(
  cookieParser()
);
await connection.connect((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log('数据库连接成功')
  }
})
app.use(
  createAuthentication()
);
app.use(express.static('../client/dist'));


await initRoutes("/api",app)



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.send({
    message: err
  })
  next()
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
