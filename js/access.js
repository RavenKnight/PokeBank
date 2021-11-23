let pin = 1234;
function acceder() {
    let pinfield = document.getElementById("pinfield").value;
    if (pinfield == pin) {
        location.href = "pokeint.html";
      }else if (pinfield != pin){
        swal({
          icon: "error",
          title: "PIN incorrecto, intente de nuevo."
        });
      }
      sessionStorage.setItem("pin", pin);
    } 