// ✅ Import modul
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express()
// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handle-error');

// router
const categoriesRouter = require("./app/api/v1/categories/router")
const v1 = "/api/v1/cms"

app.use(logger('dev'));
app.use(express.json());
// extended: false mean only string and array
app.use(express.urlencoded({ extended: false }));
// req.cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', ( req, res) => {
    res.status(200).json({
        message: "Welcome to API Semina"
    })
})

app.use(v1, categoriesRouter)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)
module.exports = app;
