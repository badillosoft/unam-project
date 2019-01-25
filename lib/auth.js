const db = require("./db");

function pass(condition1) {
    return {
        and(condition2) {
            return pass(condition1 && condition2);
        },
        or(condition2) {
            return pass(condition1 || condition2);
        },
        done() {
            return condition1 ? Promise.resolve() : Promise.reject();
        }
    };
}

async function mount() {
    await db.query(`
        create table if not exists auth_usr (
            id_usr varchar(255) not null,
            passwd varchar(255) not null,
            token varchar(255) not null,
            levl int,
            hierchy int,
            crea timestamp default now(),
            updt timestamp default now(),
            login timestamp default now()
        )
    `);
    const [result] = await db.query("select * from auth_usr where id_usr='admin'");
    if (!result) {
        const password = "jtal0kdrvqr";
        await db.query("insert into auth_usr set id_usr='admin', passwd=?, levl=100, hierchy=0, token='u0bmcdeqid'", password)
    }
}

async function user(req) {
    const id_usr = req.query.id_usr || req.body.id_usr || "";
    const token = req.query.token || req.body.token || "";
    const [user] = await db.query("select * from auth_usr where id_usr=? and token=?", [id_usr, token]);
    console.log(user);
    return user || {
        id_usr: 0,
        passwd: "",
        token: "", 
        levl: 0, 
        hierchy: 0,
        crea: new Date(),
        updt: new Date(),
        login: new Date(),
    };
}

module.exports = {
    pass,
    mount,
    user
};