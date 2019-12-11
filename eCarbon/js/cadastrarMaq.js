$(document).ready(function () {    

    update();//FUNCAO USADA PARA CARREGAR QUANDO DO MENU VEM DO METODO UPDATE
    var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);
    $('select').formSelect();
    $('#cad-ok').click(function () {
        db.transaction(function (tx) {
            var nomemaq = $('#nome-maq').val();
            var marcamaq = $('#marca-maq').val();
            var co2 = $('#CO2-maq').val();
            var voltagem = $("#volts option:selected").text();
            var tempfunc = $("#tempfunc option:selected").text();
            var coment = $('#textarea').val();
            tx.executeSql("INSERT INTO machine(maquina, marca, co2, voltagem, tempfunc, coment) VALUES(?,?,?,?,?,?)", [nomemaq, marcamaq, co2, voltagem, tempfunc, coment], function () {
                M.toast({
                    html: "OK"
                });
                window.location.href = "menu.html";
            });
        });
    });
});

function update() {
    var id = sessionStorage.getItem('id');
    var metodo = sessionStorage.getItem('metodo');

    if (metodo === 'update') {

        var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);
        var mSQl = `SELECT *  FROM machine mar where id =  ` + id;
        db.transaction(function (tx) {
            tx.executeSql(mSQl, [], function (tx, results) {
                var id = results.rows.item(0).id;
                var vmaquina = results.rows.item(0).maquina;
                var vmarca = results.rows.item(0).marca;
                var vco2 = results.rows.item(0).co2;
                var vvoltagem = results.rows.item(0).voltagem;
                var vtempfunc = results.rows.item(0).tempfunc;
                var vcoment = results.rows.item(0).coment;

                $('#nome-maq').val(vmaquina);
                $('#marca-maq').val(vmarca);
                $('#CO2-maq').val(vco2);
                $("#volts option:selected").text(vvoltagem);
                $("#tempfunc option:selected").text(vtempfunc);
                $('#textarea').val(vcoment);

                $("input").change("select");
                sessionStorage.clear();
                M.updateTextFields();
            });
        });

    };
};