import { app } from "./app.js";

const PORT: number = Number(process.env.PORT ?? 5000);
const HOST:string = "0.0.0.0";

app.listen(PORT,HOST,(err)=>{
    if(err) console.error(err)

    console.log("App running on http://localhost:"+PORT)
})