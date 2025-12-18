import express from "express";
import { engine } from "express-handlebars";
import router from "./route/index.js";

const app = express();

//  middleware
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "views");

// all the routes
app.use("/", router);

export { app };
