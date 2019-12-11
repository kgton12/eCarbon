$(document).ready(function () {

    function criarTab() {
        var db = openDatabase('DataCar', '1.0', 'Car', 1024 * 1024 * 2);

        db.transaction(function (tx) {
            tx.executeSql(`
			CREATE TABLE IF NOT EXISTS carros(
			car_id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
	        car_nome varchar(255),
	        car_modelo varchar(255),
	        car_km float,
	        car_cor_id integer,
	        car_img varchar(255),
	        car_comentario varchar(255),
	        car_fab_id integer,
	        car_ano date,
	        FOREIGN KEY(car_cor_id) REFERENCES cor(cor_id),
	        FOREIGN KEY(car_fab_id) REFERENCES fabricante(fab_id))`);
        });
        db.transaction(function (tx) {
            tx.executeSql(`
            CREATE TABLE IF NOT EXISTS fabricante(
            fab_id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
            fab_nome varchar(255)
            )`);
        });
        db.transaction(function (tx) {
            tx.executeSql(`
            CREATE TABLE IF NOT EXISTS cor(
            cor_id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
            cor_hex varchar(6)
            )`);
        });
    };

    function insertCar(nome, modelo, km, cor, img, comentario, fab, ano) {
        var db = openDatabase('DataCar', '1.0', 'Car', 1024 * 1024 * 2);
        db.transaction(function (tx) {
            tx.executeSql(`INSERT INTO carros(car_nome, car_modelo, car_km, car_cor_id, car_img,car_comentario,car_fab_id,car_ano) VALUES
    				(?,?,?,?,?,?,?,?)`, [nome, modelo, km, realizada, cor, img, comentario, fab, ano], function () {
                M.toast({
                    html: "DADOS INSERIDOS COM SUCESSO"
                });
            });
        });
    };

    function insertFab(nome) {
        var db = openDatabase('DataCar', '1.0', 'Car', 1024 * 1024 * 2);
        db.transaction(function (tx) {
            tx.executeSql(`INSERT INTO fabricante(fab_nome) VALUES
    				(?)`, [nome], function () {
                M.toast({
                    html: "DADOS INSERIDOS COM SUCESSO"
                });
            });
        });
    };

    function insertCor(hex) {
        var db = openDatabase('DataCar', '1.0', 'Car', 1024 * 1024 * 2);
        db.transaction(function (tx) {
            tx.executeSql(`INSERT INTO cor(cor_hex) VALUES
    				(?)`, [hex], function () {
                M.toast({
                    html: "DADOS INSERIDOS COM SUCESSO"
                });
            });
        });
    };
});