let username = "Ash ketchum";
let account = 987654321;

window.onload = function () {
    show();
  };

function show(){
    document.getElementById("name").innerHTML="Nombre: "+username;
    document.getElementById("acct").innerHTML="Número de cuenta: "+account;
}
