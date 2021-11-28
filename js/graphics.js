var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
let labels = JSON.parse(localStorage.getItem("HistorialNombre")); // datos horizantales
let data = JSON.parse(localStorage.getItem("HistorialValor")); // datos verticales
let button = document.getElementById("printhistory");


    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
         
                label: 'Historial de transaciones',
             
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    });


    function downloadPDF() {
          var canvasImg = canvas.toDataURL("image/jpeg", 1.0);        
          var doc = new jsPDF();
          //creates PDF from img
          doc.addImage(canvasImg, 'JPEG', 10, 10, 195, 120 );
          doc.save('Graficas.pdf');
    }
    

      