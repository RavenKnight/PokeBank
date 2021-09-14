let pin = 1234;
function acceder() {
    let pinfield = document.getElementById("pinfield").value;
    if (pinfield == pin) {
        location.href = "pokeint.html";
      };
      sessionStorage.setItem("pin", pin);
    } 