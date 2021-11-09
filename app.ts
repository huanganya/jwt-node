import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import routes from "./src/routes/index.route";
const globalAny: any = global;

dotenv.config();

const app = express();
globalAny.publicPath = path.join(__dirname, "public");

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(routes);

export default app;
