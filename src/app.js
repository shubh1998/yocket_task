require("../globals/global_functions");
require("dotenv").config();

//----------Require the dependencies----------------------
const Knex = require("knex");
const morgan = require("morgan");
const express = require("express");
const knexConfig = require("../db/knexfile");
const cors = require("cors");
const { Model } = require("objection");
var createError = require('http-errors');
const chalk = require("chalk");
const config = require("../config")

//---------Assign all routes to a single variable-------------------
const api_version1_routes = require("./routes/allRoutes");

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

const app = express()
    .use(express.json())
    .use(
        express.urlencoded({
            extended: false
        })
    )
    .use(morgan("dev"))

//CORS Configuration
const whitelist = ['http://example1.com']
const corsOptions = {
    credentials: true,
    origin: ((origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }),
    methods: ['GET, POST, PUT, PATCH, DELETE']
}
app.use(cors(corsOptions));

// Register our REST API.
app.use('/api/v1', api_version1_routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

//-----------------error handler-----------------//
app.use((err, req, res, next) => {
    if (err) {
        // respond with the error
        res.status(err.statusCode || err.status || 500).send(err || {});
        console.log(chalk.red.bold(err));
    } else {
        next();
    }
});

//------------Server Listing on port 3000---------//
const server = app.listen(config.PORT, () => {
  console.log(
    chalk.blue.bold('"Server Starts listening on port %s"'),
    server.address().port
  );
});