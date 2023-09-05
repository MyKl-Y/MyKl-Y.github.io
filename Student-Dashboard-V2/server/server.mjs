import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import tasks from "./routes/task.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json())

app.use("/task", tasks)

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});