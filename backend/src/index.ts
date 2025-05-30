import express from "express"
import cors from "cors"
import { router as runRoute } from "./routes/run"

const app = express()
app.use(
  cors({
    origin: ["http://localhost:5173", "https://alpha-agent-runner.vercel.app","https://alpha-agent-runner-1z5s.vercel.app/"], // allow dev + prod
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json())

app.use("/run", runRoute)

app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on http://localhost:4000")
)