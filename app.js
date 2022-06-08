//imports 
require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000','http://localhost:8080','http://localhost:4200','http://localhost:8080','http://localhost:8081']
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("uploads"));

//database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => console.log("Connected to the database!"))
.catch((err) => console.log(err));

//routes prefix
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use("/api/users",require("./routes/routesUsers"));
app.use("/api/courses",require("./routes/routesCourses"));
app.use("/api/lessons",require("./routes/routesLessons"));
app.use("/api/scripts",require("./routes/routesScriptFiles"));
app.use("/api/tasks",require("./routes/routesTasks"));
app.use("/api/userTasks",require("./routes/routesUserTasks"));

//start server
app.listen(port, () => console.log(`server running at http://localhost:${port}`));
