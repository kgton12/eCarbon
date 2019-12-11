$(document).ready(function () {
  var maq=[];
  var co2=[];
  var smaq ='';
  var sco2 ='';
  var db = openDatabase('lowcarbon', '1.0', 'user', 1024 * 1024 * 2);
  var mSQl = `SELECT *  FROM machine mar`;
  db.transaction(function (tx) {
    tx.executeSql(mSQl, [], function (tx, results) {

      var total = results.rows.length;
      var i;

      for (i = 0; i < total; i++) {
        var id = results.rows.item(i).id;
        var vmaquina = results.rows.item(i).maquina;
        var vco2 = results.rows.item(i).co2;

        maq.push(id+'-'+vmaquina);
        co2.push(vco2);
      };      var i;


      for (i = 0; i < maq.length; i++) {

        smaq = smaq +'"'+ maq[i]+'"'+',';
        sco2 = sco2 +'"'+ co2[i]+'"'+',';
      };
      sco2 = (sco2.slice(0, -1));
      sco2 = '['+sco2+']'
      smaq = (smaq.slice(0, -1));
      smaq = '['+smaq+']';

      $('body').append(`<div>
      <canvas id="myChart" width="300" height="100"></canvas>
      <script>
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: `+smaq+`,
            datasets: [{
              label: 'Grafico de Carbono CO2',
              data: `+sco2+`,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      </script>
    </div>
    <a id="logar" class="waves-effect waves-light btn login-button" href="menu.html">Retornar </a>`);
    });
  });


});