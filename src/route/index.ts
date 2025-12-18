import { Router } from "express";
import { Home } from "../controller/home.controller.js";
import { Uplaod } from "../controller/upload.controller.js";

const router = Router();


router.get("/", Home);
router.post("/upload", Uplaod);



export default router;