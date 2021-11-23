//El objeto hecho cadena (para no usar variables sensibles)
let usuario = '{"Nombre": "Ash Ketchum", "Cuenta": "987654321"}' 

//Aplicacion del json para mostrar info de usuario...
var uinfo = JSON.parse(usuario);

//Validación de número de cuenta
var constraints = {
  creditCardNumber: {
    presence: true,
    format: {
      pattern: /^(34|37|1|5[1-5]).*$/,
      message: function (
        value,
        attribute,
        validatorOptions,
        attributes,
        globalOptions
      ) {
        return validate.format(`${value} No es un número de cuenta válido`, {
          num: value,
        });
      },
    },
    length: function (value, attributes, attributeName, options, constraints) {
      if (value) {
        if (/^(34|37).*$/.test(value)) return { is: 15 };

        if (/^(1|5[1-5]).*$/.test(value)) return { is: 16 };
      }
      // Unknown card, don't validate length
      return false;
    },
  },
};


document.getElementById("name").innerHTML="Nombre: " + uinfo.Nombre;
document.getElementById("acct").innerHTML= "Nº de cuenta: " + uinfo.Cuenta;

//Balance inicial de cuenta
let dinero = {balance: 500,}; 

//Para guardar y actualizar historial.
if (
  localStorage.getItem("histname") === null &&
  localStorage.getItem("histvalue") === null
) {
  let history = ["inicial"];
  let histvalue = [dinero.balance];
  
  localStorage.setItem("histname", JSON.stringify(history));
  localStorage.setItem("histvalue", JSON.stringify(histvalue));
} else {

  let balance = JSON.parse(localStorage.getItem("histvalue"));
  dinero.balance = balance[balance.length - 1];

}
function refresh(name, amount) {

  let history = JSON.parse(localStorage.getItem("histname"));
  let histvalue = JSON.parse(localStorage.getItem("histvalue"));
  history.push(name);
  histvalue.push(amount);

  localStorage.setItem("histname", JSON.stringify(history));
  localStorage.setItem("histvalue", JSON.stringify(histvalue));
}

//Para cerrar sesión...
function logout(){
  location.href= "pokelogin.html"
}

//Funcion para depósito...
function enter(){
  swal({
    title:"Ingrese el monto a depositar",
    content:{
      element: "input", 
    },
  }).then(function(value){
      let dep=parseInt(value);
      if(validate.isNumber(dep)){
        switch(validate.isNumber(dep)){
          case(dep<5.00):
            swal({
              icon: "error",
              text: "El monto mínimo para depositar es de US$5. Intente de nuevo",
            })
            break;
          
          case(dep>600):
            swal({
              icon:"error",
              text:"El monto excede el máximo permitido de US$600. Intente otra cantidad",
            });
            break;
    
          case(dep>=5.00):
            dinero.balance += dep;
            swal({
              icon: "success",
              text: "Su depósito ha sido efectuado exitosamente. Nuevo balance: US$" + dinero.balance,
            });
            refresh("depósito", dinero.balance);
            break;
        }
      }else{
        swal({
          icon: "error",
          text: "El valor no es un número o no ha sido ingresado. Intente de nuevo",
        })
      }
    })
}

//Función para retiro...
function withdraw(){
  swal({
    title:"Ingrese el monto a retirar",
    content:{
      element: "input",
    },
  }).then(function(value){
    let moneyout = parseInt(value);
    if(validate.isNumber(moneyout)){
      switch(validate.isNumber(moneyout)){
        case(moneyout<dinero.balance || moneyout<=600 || moneyout >=5):
          dinero.balance -= moneyout;
          swal({
            icon: "success",
            text: "Retire su efectivo. Nuevo saldo: US$"+ dinero.balance,
          })
          refresh("retiro", dinero.balance);
        break;
        case(moneyout >= 600):
          swal({
            icon: "error",
            text: "El monto excede el máximo permitido de US$600. Intente de nuevo.",
          })
          break;
        case(moneyout<5):
          swal({
            icon: "error", 
            text: "El mínimo de retiro es de US$5. Intente de nuevo."
          })
          break;
      }
    }else{
      swal({
        icon: "error",
        text: "El valor no es un número o no ha sido ingresado. Intente de nuevo",
      })
    }
  })
};


//Función para transferir...
function movefund(){
  swal({
    title:"Ingrese el número de cuenta",
    content:{
      element: "input",
    },
  }).then(function(value){
    let card = value;
    let val = validate({ creditCardNumber: card }, constraints);
    if(val === undefined){
      swal({
        title: "Ingrese el monto a enviar",
        content:{
          element: "input",
        }
      }).then(function(value){
        let move =value;
        if(move>dinero.balance){
          swal({
            icon: "error",
            text: "El monto es mayor a su balance. Intente de nuevo"
          });
        }else if(move<=dinero.balance){
          dinero.balance -= move;
          swal({
            icon: "success",
            text: "Su transferencia fue exitosa. Nuevo saldo: US$"+ dinero.balance,
          });
          refresh("transferencia", dinero.balance);
        };
      })
    }else{
      swal({
        icon: "error", 
        text: "Ningún valor ha sido ingresado o es inválido. Intente nuevamente.",
      });
    }
  })
};

//Función para pago de servicios...
function paybill(){
  swal({
    title:"Ingrese el monto a pagar",
    content:{
      element: "input",
    },
  }).then(function(value){
    let payment = parseInt(value);
    if(validate.isNumber(payment)){
      switch(validate.isNumber(payment)){
        case(payment>dinero.balance):
          swal({
            icon: "error",
            text: "El monto a pagar excede su balance. Intente de nuevo",
          });
          break;
          case(payment<dinero.balance):
          dinero.balance -= payment;
          swal({
            icon: "success",
            text: "Su pago se ha efectuado exitosamente. Nuevo saldo: US$" + dinero.balance,
          });
          refresh("Pago de servicios", dinero.balance);
            break;
      }
    }else{
      swal({
        icon: "error",
        text: "Ningún valor ha sido ingresado o es inválido. Intente de nuevo",
      })
    }
  })
};

//Llevará a los gráficos de transacciones...
function historial(){
  location.href= "graphist.html"
}

//Mostrar balance actual
function showbalance(){
  swal({
    icon: "info",
    title: "Su balance actual: US$" + dinero.balance,
  })
};