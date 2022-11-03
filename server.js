/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require('path')

// For static assets
app.use('/static', express.static('images'))

/*********************************************************/

/*** API Routes below ************************************/

// Serve the build
app.use(express.static(path.join(__dirname, "/")));

app.get("/blog", (req, res) => {
    // send blog
    // res.sendFile(path.join(__dirname, "/blog/blog.html"));
    res.status(404);
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
