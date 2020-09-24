document.title = "OnViolet - Contáctanos"

var btn_send_contact  = document.querySelector(".btn_send_contact");
var email_contact = document.getElementById("email_contact");
var nombres_contact = document.getElementById("nombres_contact");
var mensaje_contact = document.getElementById("mensaje");
var error_email_contact = document.getElementById("error_email_contact");
var form_contact = document.getElementById("form_contact");
var spinner_contact = document.getElementById("spinner_contact");
var check = document.getElementById("check");

btn_send_contact.addEventListener('click',function(){
    if(ValidarInputs()){
        spinner_contact.style.display = "block";
        form_contact.style.display = "none";
        event.preventDefault();
        if(validarEmail(email_contact.value)){
            error_email_contact.innerText = "";
            SendEmail();
        }else{
            error_email_contact.innerText = email_bad_format_error;
            form_contact.style.display = "block";
            spinner_contact.style.display = "none"
        }
    }
});

function SendEmail(){
    Email.send({
        SecureToken:"2895114e-28d8-4f0c-83e6-420cf0b5a2c8",
        To : 'Elkisoft.s3@gmail.com',
        From : email_contact.value,
        Subject : "Contacto OnViolet",
        Body : mensaje_contact.value + "</br></br>" + "Att "+nombres_contact.value
    }).then(
        message => {
            if(message === "OK"){
                //form_contact.style.display = "block";
                check.style.display = "block";
                spinner_contact.style.display = "none"
            }else{
                form_contact.style.display = "block";
                spinner_contact.style.display = "none"
                alert("Algo Fallo Porfavor Intentelo mas Tarde");
            }
        }
    );
}


function ValidarInputs(){
    if(email_contact.value.length>0&&nombres_contact.value.length>0&&
        mensaje_contact.value.length)
        return true;
    return false;
}

function validarEmail(valor) {
    const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email_regex.test(valor))
        return true;
    return false;
  }