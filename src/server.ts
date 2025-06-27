import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "redis";
import blogRoutes from "./routes/blog.js"
import { startConsumer } from "./utils/consumer.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;
export const redisClient = createClient({url:process.env.REDIS_URL});


redisClient.connect()
.then(()=> console.log("Redis is connected"))
.catch((err)=> console.log("error", err))


startConsumer();

app.use("/api/v1", blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});