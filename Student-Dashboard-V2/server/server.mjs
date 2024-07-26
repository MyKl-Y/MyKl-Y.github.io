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
    "http://localhost:3000",
    "https://mykl-y.github.io"
];
var corsOptions = function (req, callback) {
    var corsOptions;
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
}

app.use(cors(corsOptions));
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