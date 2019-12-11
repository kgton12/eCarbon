$(document).ready(function () {

  var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);

  $('#cad-maq').click(function () {
    window.location.href = "cadastrarMaq.html";
  });
  $('#rel-maq').click(function () {
    window.location.href = "relMaq.html";
  });
  $('#grafico').click(function () {
    window.location.href = "grafico.html";
  });
});