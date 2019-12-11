$(document).ready(function () {
    var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);
    $('#cad-ok').click(function () {
        if (ValidaCampos()) {
            db.transaction(function (tx) {
                var pnome = $('#first_name').val();
                var unome = $('#last_name').val();
                var email = $('#email').val();
                var user = $('#usuario').val();
                var pass = $('#password').val();
                tx.executeSql("INSERT INTO user(pnome, unome, email, user, pass) VALUES(?,?,?,?,?)", [pnome, unome, email, user, pass], function(){
                    M.toast({
                        html: "PREENCHA O CAMPO E-MAIL"
                    });
                    window.location.href = "login.html";
                });
            });
        }
    });

    function ValidaCampos() {
        //validações
        var retorno = true;
        if (!$('#first_name').val()) {
            M.toast({
                html: "PREENCHA O CAMPO NOME"
            });
            retorno = false;
        };
        if (!$('#last_name').val()) {
            M.toast({
                html: "PREENCHA O CAMPO SOBRE NOME"
            });
            retorno = false;
        };
        if (!$('#usuario').val()) {
            M.toast({
                html: "PREENCHA O CAMPO LOGIN"
            });
            retorno = false;
        };
        if (!$('#password').val()) {
            M.toast({
                html: "PREENCHA O CAMPO SENHA"
            });
            retorno = false;
        };
        if (!$('#email').val()) {
            M.toast({
                html: "PREENCHA O CAMPO E-MAIL"
            });
            retorno = false;
        };
        return retorno;
    };
});