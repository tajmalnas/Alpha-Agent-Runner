import express from "express"
import cors from "cors"
import { router as runRoute } from "./routes/run"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/run", runRoute)

app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on http://localhost:4000")
)
