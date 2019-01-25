const auth = require("../lib/auth");

async function test() {
    try {
        await auth.pass(1 === 2)
            .or(1 > 0)
            .and(5 === 3)
            .or(true)
            .and(false)
            .done();
        console.log("Pass");
    } catch(e) {
        console.log("Do not pass");
    }
}

test();