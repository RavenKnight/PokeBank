let username = "Ash ketchum";
let account = 987654321;

window.onload = function () {
    show();
  };

function show(){
    document.getElementById("name").innerHTML="Nombre: "+username;
    document.getElementById("acct").innerHTML="Número de cuenta: "+account;
}

function logout(){
  let cerrar = document.getElementById("logout").value
  location.href= "pokelogin.html"
}