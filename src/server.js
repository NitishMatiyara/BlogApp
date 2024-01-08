import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import blogCommentRouter from "./routes/blogCommentRouter.js";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/blogComment", blogCommentRouter);

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
