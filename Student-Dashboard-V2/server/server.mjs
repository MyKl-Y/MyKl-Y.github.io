import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import tasks from "./routes/task.mjs"
import courses from "./routes/courses.mjs"
import graduation from "./routes/graduation.mjs"
import jobs from "./routes/jobs.mjs"
//import scrape from "./routes/scrape.mjs"
//import updateField from "./routes/updateField.mjs"
import auth from "./routes/auth.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({    
    origin: "http://localhost:3000" // Replace with the actual URL of your React frontend
}));
app.use(express.json())
app.use(express.urlencoded());

app.use("/auth", auth);
app.use("/task", tasks)
app.use("/courses", courses)
app.use("/graduation", graduation)
app.use("/jobs", jobs)
//app.use("/scrape", scrape)
//app.use("/update-field", updateField)

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});