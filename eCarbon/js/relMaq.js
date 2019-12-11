$(document).ready(function () {
  var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);

  $("#card-maquinas").on("click", '#edit', function () {
    var id_car = $(this).attr('data-id');
    sessionStorage.setItem('metodo', 'update');
    sessionStorage.setItem('id', id_car);
    window.location.href = "cadastrarMaq.html";
  });

  $("#card-maquinas").on("click", '#delete_forever', function () {
    var id_car = $(this).attr('data-id');

    var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);
    var mSQl = `DELETE FROM machine where id = `+id_car;
    //alert(mSQl);
    db.transaction(function (tx) {
      tx.executeSql(mSQl, [], function (tx, results) {
        $("#proc-ok").trigger('click');
      });
    });

  });

  $('#proc-ok').click(function () {
    var procura = $("#search").val();
    var proc_por = $("input[name='group1']:checked").val();

    LimpaAll();
    if (procura.length > 0) {
      Machine(procura, proc_por);
    } else {
      AllMachine();
    };
  });
});

function AllMachine() {
  var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);
  var mSQl = `SELECT *  FROM machine mar `;
  db.transaction(function (tx) {
    tx.executeSql(mSQl, [], function (tx, results) {
      var total = results.rows.length;
      var i;
      var cor;
      for (i = 0; i < total; i++) {
        var id = results.rows.item(i).id;
        var vmaquina = results.rows.item(i).maquina;
        var vmarca = results.rows.item(i).marca;
        var vco2 = results.rows.item(i).co2;
        var vvoltagem = results.rows.item(i).voltagem;
        var vtempfunc = results.rows.item(i).tempfunc;
        var vcoment = results.rows.item(i).coment;


        if (vco2 <= 10) {
          cor = 'green';
        } else if (vco2 <= 20) {
          cor = 'orange';
        } else {
          cor = 'red';
        };
        $('#card-maquinas').append(`<div class="row maquinas">
          <div class="col s12 m6">
              <div class="card `+ cor + ` darken-1">
                  <div class="card-content white-text">
                      <span class="card-title">`+ vmaquina + `</span>
                      <p>Nome: `+ vmaquina + `</p>
                      <p>Marca: `+ vmarca + `</p>
                      <p>CO2: `+ vco2 + `</p>
                      <p>Voltagem: `+ vvoltagem + `</p>
                      <p>Tempo de Funcionamento: `+ vtempfunc + ` Horas</p>
                      <p>Comentário: `+ vcoment + `</p>
                  </div>
                  <div class="card-action">
                      <a href="#"><i class="material-icons teste" data-id="`+ id + `" id="delete_forever">delete_forever</i></a>
                      <a href="#"><i class="material-icons teste" data-id="`+ id + `" id="edit">edit</i></a>
                  </div>
              </div>
            </div>
          </div>`);
      }
    });
  });
};
function Machine(desc, radio) {
  var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);
  var mSQl = `SELECT *  FROM machine mar `;

  if (radio === 'nome') {
    mSQl = mSQl + ' where mar.maquina like "' + desc + '"';
  } else if (radio === 'co2') {
    mSQl = mSQl + ' where mar.co2 = ' + desc;
  };

  db.transaction(function (tx) {
    tx.executeSql(mSQl, [], function (tx, results) {
      var total = results.rows.length;
      var i;
      var cor;
      for (i = 0; i < total; i++) {
        //var id = results.rows.item(i).car_id;
        var vmaquina = results.rows.item(i).maquina;
        var vmarca = results.rows.item(i).marca;
        var vco2 = results.rows.item(i).co2;
        var vvoltagem = results.rows.item(i).voltagem;
        var vtempfunc = results.rows.item(i).tempfunc;
        var vcoment = results.rows.item(i).coment;

        if (vco2 <= 10) {
          cor = 'green';
        } else if (vco2 <= 20) {
          cor = 'orange';
        } else {
          cor = 'red';
        };
        $('#card-maquinas').append(`<div class="row maquinas">
          <div class="col s12 m6"">
              <div class="card `+ cor + ` darken-1">
                  <div class="card-content white-text">
                      <span class="card-title">`+ vmaquina + `</span>
                      <p>Nome: `+ vmaquina + `</p>
                      <p>Marca: `+ vmarca + `</p>
                      <p>CO2: `+ vco2 + `</p>
                      <p>Voltagem: `+ vvoltagem + `</p>
                      <p>Tempo de Funcionamento: `+ vtempfunc + ` Horas</p>
                      <p>Comentário: `+ vcoment + `</p>
                  </div>
                  <div class="card-action">
                      <a href="#"><i class="material-icons teste">delete_forever</i></a>
                      <a href="#"><i class="material-icons teste">edit</i></a>
                  </div>
              </div>
            </div>
          </div>`);
      }
    });
  });
};

function LimpaAll() {
  $('.maquinas').remove();
};