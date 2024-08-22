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

const allowedOrigins = [
    "https://mykl-y.github.io",
    "https://student-dashboard.onrender.com",
    "https://mykl-y.github.io/Student-Dashboard-V2",
    "https://mykl-y.github.io/Student-Dashboard-V2/client"
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request if the origin is in the allowedOrigins list
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow credentials like cookies, authorization headers, etc.
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/task", tasks)
app.use("/courses", courses)
app.use("/graduation", graduation)
app.use("/jobs", jobs)
//app.use("/scrape", scrape)
//app.use("/update-field", updateField)

// start the Express server
app.listen(PORT, () => {
    console.log(`server started`);
});