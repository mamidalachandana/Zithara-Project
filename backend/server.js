import express from "express";
import dotenv from "dotenv";
import connect from "./config/dbconnect.js";
import userRouter from "./routes/userRoute.js";
import CustomError from "./utils/createError.js";
import errorHandlerModule from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
//config file path
dotenv.config({ path: "config/config.env" });

app.use(
    cors({
        origin: "http://localhost:5173",
        allowedHeaders: ["Content-Type"],
    })
);

//testing
// app.use("/api",(req,res,next)=>{
//     res.send("Hello World!")
// })

app.use("/api/users", userRouter);
app.use(errorHandlerModule);

app.use("*", (req, res, next) => {
    const error = new CustomError("Invalid Route in this server.", 404);
    return next(error);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    connect();
    console.log("Server is connected on port 8080");
});
