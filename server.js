/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
var bodyParser = require('body-parser')
// starting the express server
const app = express();
const path = require('path')

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// For static assets
app.use('/static', express.static('images'))

/*********************************************************/

/*** API Routes below ************************************/

// Serve the build
app.use(express.static(path.join(__dirname, "/")));

app.post("/", urlencodedParser, (req, res) => {
    // send
    const m_name = req.body.name
    const m_email = req.body.email
    const m_message = req.body.message



    res.sendFile(path.join(__dirname, "/index.html"));
});


app.get("/404", (req, res) => {
    // send 404
    res.sendFile(path.join(__dirname, "/404/404.html"));
});

app.get("/blog", (req, res) => {
    // send blog
    res.redirect("https://bjelefano.medium.com/");
});

app.get("/resume", (req, res) => {
    // send resume.pdf
    res.sendFile(path.join(__dirname, "/assets/resume.pdf"));
});

app.get("/projects", (req, res) => {
    // send projects.html
    res.sendFile(path.join(__dirname, "/projects/projects.html"));
});


// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/home", "/dashboard"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    } else {
        // send index.html
        res.sendFile(path.join(__dirname, "/index.html"));
    }
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
