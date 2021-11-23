const ctx = document.getElementById('myChart').getContext('2d');
let labels = JSON.parse(localStorage.getItem("histname")); //Eje horizontal
let data = JSON.parse(localStorage.getItem("histvalue")); //Eje vertical

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Flujo de efectivo',
            
            data: data,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',  
            ],
            borderWidth: 4
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
    button.addEventListener('click',downloadPDF);

    function regresar(){
        location.href= "pokeint.html"
      }