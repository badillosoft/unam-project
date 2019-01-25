const express = require("express");

const db = require("../lib/db");

const router = express.Router();

router.get("/cli/all", async function (req, res) {
    try {
        const result = await db.queryNamed("cli/all");
        res.send(result);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.get("/cli/find", async function (req, res) {
    const nombre = `%${req.query.nombre}%`;
    try {
        const result = await db.queryNamed("cli/find", nombre);
        res.send(result);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;