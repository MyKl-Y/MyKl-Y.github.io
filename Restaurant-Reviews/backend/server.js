import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())

// Enable CORS for the frontend origin (http://localhost:3000)
const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app