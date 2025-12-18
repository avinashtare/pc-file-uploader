import type { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "./temp",
    filename: function (req, file, cb) {
        // unique filename
        cb(null, `${crypto.randomUUID().slice(0, 8)}-${file.originalname}`);
    }
});

const uploadFile = multer({ storage });

export const Uplaod = (req: Request, res: Response) => {
    return uploadFile.any()(req, res, (err) => {
        if (err || !req.files) return res.send({ success: false })

        res.send({ success: true })
    })
};