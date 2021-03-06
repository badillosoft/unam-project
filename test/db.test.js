const db = require("../lib/db");

const config = {
    host: "192.169.200.243",
    user: "unam2",
    password: "IIMAS@2019",
    database: "unam_cup"
};

async function test() {
    try {
        await db.connect(config);

        await db.loadQueries();

        const result1 = await db.query("select ,* from cup where precio=?", 21);
        console.log(result1);

        const result2 = await db.queryNamed("cup/001");
        console.log(result2);

        const result3 = await db.queryNamed("cup/002", 20, 22, 19);
        console.log(result3);

        db.queries = {
            "a001": "select now() as fecha_act",
            "a002": "select random()"
        };

        const result4 = await db.queryNamed("a001");
        console.log(result4);

    } catch(err) {
        console.log(err.toString());
    }
    await db.disconnect();
}

test();