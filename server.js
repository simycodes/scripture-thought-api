import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// routers
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import scriptureThoughtRouter from "./routes/scriptureThoughtRouter.js"; 
import commentRouter from "./routes/commentRoutes.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// log/console request types made in node
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Accept JSON in API
app.use(express.json());
// Accept and access cookies
app.use(cookieParser());

// server routes
app.get("/", (req, res) => {
  res.send("Scripture Thought API Home....");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/scripture-thoughts", authenticateUser, scriptureThoughtRouter);
app.use("/api/v1/comments", authenticateUser, commentRouter);

// THIS ROUTE IS AUTOMATICALLY CALLED WHEN THERE IS AN ERROR IN DEFINED ROUTES
// FOR ALL ERRORS IN ROUTES ON API - SHOULD ALWAYS BE PLACED AS FINAL ROUTE
app.use(errorHandlerMiddleware);

// RUN THE SERVER AFTER SUCCESSFULLY GETTING CONNECTED TO THE DATABASE
const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
