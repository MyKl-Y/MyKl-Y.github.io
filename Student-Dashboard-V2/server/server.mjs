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
    "https://mykl-y.github.io/",
    "https://student-dashboard.onrender.com",
    "https://mykl-y.github.io/Student-Dashboard-V2",
    "https://mykl-y.github.io/Student-Dashboard-V2/client"
];
//var corsOptions = function (req, callback) {
//    var corsOptions;
//    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
//        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//    } else {
//        corsOptions = { origin: false }; // disable CORS for this request
//    }
//    callback(null, corsOptions); // callback expects two parameters: error and options
//}

//app.use(cors(corsOptions));
//app.use(cors());
app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
  });
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