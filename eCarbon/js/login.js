$(document).ready(function () {
    //CODIGO JS
    var vLogar = false;

    $('#logar').click(function () {

        var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);

        var user = $('#login').val();
        var loggin = $('#senha').val();

        if ((user) && (loggin)) {
            db.transaction(function (tx) {
                tx.executeSql(`SELECT id FROM user
                        where user= ? and pass= ?`, [user, loggin], function (tx, results) {
                    var total = results.rows.length;
                    if (total > 0) {
                        vLogar = true;
                        window.location.href = "menu.html";
                    } else {
                        M.toast({
                            html: "LOGIN OU SENHA INVALIDO"
                        });
                    };
                });
            });
        } else {
            M.toast({
                html: "LOGIN OU SENHA INVALIDO"
            });
        }
    });
});