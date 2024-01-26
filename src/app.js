import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser";


const app =express();

//need to explore this more
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

//need to explore this also
//now by default express contains all the functionalities of bodyparser
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"})) //to understand the encoded part in url

app.use(express.static("public"))

//this is to ensure that I can access the cookies of my user's browser and set them
app.use(cookieParser())

//routes

import userRouter from "./routes/user.routes.js"


//routes declaration
app.use("/api/v1/users", userRouter)


export { app };
