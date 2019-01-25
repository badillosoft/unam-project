const express = require("express");

const auth = require("../lib/auth");

const router = express.Router();

router.use("/cli", async function (req, res, next) {
    try {
        const { levl, hierchy } = await auth.user(req);
        await auth.pass(levl === 1)
            .and(hierchy === 1)
            .or(levl >= 3)
            .done();
        next();
    } catch(e) {
        console.log(e);
        res.sendStatus(401);
    }
});

module.exports = router;