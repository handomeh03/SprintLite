import express from "express";
import dotenv from "dotenv";
import { init } from "./db/connection.js";
import { authRouter } from "./Routes/authRouter.js";
import { userRouter } from "./Routes/userRouter.js";
import { Auth } from "./Middleware/AuthMiddleware.js";
import { ProjectRouter } from "./Routes/ProjectRouter.js";
import { CommentRouter } from "./Routes/CommentRouter.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import { GlobelLimit } from "./Middleware/rateLimitGlobe.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(GlobelLimit);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swaager.json"), "utf-8")
);

const PORT = process.env.PORT || 8080;


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));








app.use("/api/auth", authRouter);
app.use("/api/users", Auth, userRouter);
app.use("/api/project", Auth, ProjectRouter);
app.use("/api/issues", Auth, CommentRouter);





init()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running at PORT " + PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
