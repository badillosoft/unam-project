const auth = require("../lib/auth");
const db = require("../lib/db");
const server = require("../lib/server");

const cliAuthRouter = require("../auth/cli.auth");
// TODO: Load more auths

const cliRouter = require("../routers/cli.router");
// TODO: Load more routers

const config = {
    host: "192.169.200.243",
    user: "unam2",
    password: "IIMAS@2019",
    database: "unam_cup"
};

async function test() {
    await db.connect(config);

    await auth.mount();

    await server.addRouter(cliAuthRouter);
    // TODO: Add other auth routers

    await server.addRouter(cliRouter);
    // TODO: Add other routers

    await server.mount();
    console.log("Server started");
}

test();