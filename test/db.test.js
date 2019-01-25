const db = require("../lib/db");

const config = {
    host: "192.169.200.243",
    user: "unam2",
    password: "IIMAS@2019",
    database: "unam_cup"
};

async function test() {
    await db.connect(config);

    await db.loadQueries();

    

    db.disconnect();
}

test();