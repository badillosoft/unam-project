const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

let app = null;
let server = null;

app = express();
app.use(express.static("/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function mount(port=3000, host="localhost") {
    return new Promise(function (resolve, reject) {
        server = http.createServer(app);

        let flag = true;

        server.once("error", function () {
            if (!flag) {
                reject();
            }
        });

        server.listen(port, host, function () {
            flag = true;
            resolve();
        });
    });
}

function addRouter(route, base="/api") {
    return Promise.resolve().then(function () {
        app.use(base, route);
    });
}

module.exports = {
    mount,
    addRouter
};