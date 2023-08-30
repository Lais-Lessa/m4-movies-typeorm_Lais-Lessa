import "express-async-errors"
import express, { Application } from "express";
import router from "./router/routes";
import handleMiddlewares from "./middlewares/handle.middlewares";


const app: Application = express()
app.use(express.json())
app.use(router)
app.use(handleMiddlewares.error)
export default app;