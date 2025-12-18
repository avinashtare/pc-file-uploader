import type { Request, Response } from "express";

export const Home = (req: Request, res: Response) => {
    return res.render("home", {
        sources: {
            css: ["home.css"],
            js: ["utils.js", "home.js"],
        },
    });
}