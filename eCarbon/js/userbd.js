$(document).ready(function () {

    var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);

    db.transaction(function (tx) {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pnome VARCHAR,
            unome VARCHAR,
            email VARCHAR,
            user VARCHAR,
            pass VARCHAR)`);
    });

    db.transaction(function (tx) {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS machine(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            maquina VARCHAR,
            marca VARCHAR,
            co2 INTEGER,
            voltagem VARCHAR,
            tempfunc INTEGER,
            coment VARCHAR
            )`);
    });

       /*db.transaction(function (tx) {
        tx.executeSql("INSERT INTO user(id, user, pass) VALUES(?,?,?)", ['1', 'root', '123'], function () {});
    });
    /*db.transaction(function (tx) {
        tx.executeSql("INSERT INTO carbon(id, industria, maquina, co, energia) VALUES(?,?,?,?,?)", ['1', 'teste', 'teste', '52', '1'], function () {});
    });

     db.transaction(function (tx) {
       tx.executeSql("drop table carbon ", [], function () {});
});*/
});