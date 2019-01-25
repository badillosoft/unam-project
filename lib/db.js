const mysql = require("mysql");
const path = require("path");

let conn = null;

function connect(config) {
    return disconnect().then(function () {
        return new Promise(function (resolve, reject) {
            conn = mysql.createConnection(config);
            conn.connect(function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(conn);
            });
        });
    });
}

function disconnect() {
    return new Promise(function (resolve, reject) {
        if (!conn) {
            resolve();
            return;
        }
        conn.end();
        conn = null;
        resolve();
    });
}

function query(sql, data) {
    return new Promise(function (resolve, reject) {
        conn.query(sql, data, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

let queries = {};

function loadQueries(filename="query.json") {
    return Promise.resolve().then(function () {
        queries = require(path.join(process.cwd(), "db", filename));
    });
}

async function queryNamed(name, ...params) {
    let arr = queries[name] || [];
    if (typeof arr === "string") {
        arr = [arr];
    }
    const queryarr = arr.map(function (sql, i) {
        return { sql, data: params[i] }
    });
    let results = [];
    for (let {sql, data} of queryarr) {
        let result = await query(sql, data);
        results.push(result);
    }
    return results.length === 1 ? results[0] : results;
}

module.exports = {
    get queries() {
        return queries;
    },
    set queries(value) {
        queries = value;
    },
    connect,
    disconnect,
    query,
    queryNamed,
    loadQueries
};