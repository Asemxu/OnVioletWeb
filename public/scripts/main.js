//development
//const CarpetaViews = "/public/views/";
//production

const CarpetaViews = "views/";
var intro_content = document.querySelector(".intro__content");
var span_follow = document.getElementsByClassName("follow");
var btn_hamburger = document.querySelector(".btn_hamburger_menu");
const link_views = document.getElementsByClassName("link__views");
var container_views = document.getElementById("container_data_views");
var span_hambuerger = document.getElementsByClassName("hamburger");
var fecha_element = document.getElementById("fecha");
var fecha = new Date().getFullYear();
var overlay = document.querySelector(".overlay");
const btn_inicio = document.querySelector(".btn_inicio");
var id_input = document.getElementById("email");
var pass_input = document.getElementById("pass");
var email_error = document.getElementById("error_email");
var pass_error = document.getElementById("error_pass");
var form_login = document.getElementById("form_inicio_sesion");
var container_inputs = document.getElementById("container_inputs");
var btn_registro_login = document.querySelector(".btn_registro_login");
var btn_registro = document.querySelector(".btn_registro");
var btn_loguearse = document.querySelector(".btn_loguearse");
var btn_registro_user = document.querySelector(".btn_registro_user");
var nombres_input = document.getElementById("nombres");
var correo_input_registro = document.getElementById("email_registro");
var pass_input_registro = document.getElementById("pass_registro");
var container_inputs_registro = document.getElementById("container_inputs_registro");
var email_error_registro = document.getElementById("error_email_registro");
var pass_error_registro = document.getElementById("error_pass_registro");
var form_registro = document.getElementById("form_registro");
var type = "";
var fecha_footer = "© All Rights Reserved";


const Home = "home.html";
const Home_user = "home_user.html";
const About = "about.html";
const Contact = "contactanos.html";
const Faq = "faq.html";
const Help = "ayudanos.html";
const home_user_style = "home_user.css";
const home_style = "home.css";

const email_bad_format = "auth/invalid-email";
const email_not_found = "auth/user-not-found";
const wrong_password = "auth/wrong-password";
const email_in_use = "auth/email-already-in-use";
const weak_pass = "auth/weak-password";
const email_bad_format_error = "El formato de ese correo es invalido";
const email_not_found_error = "Ese correo no esta registado";
const wrong_password_error = "La contraseña no es igual"
const email_in_use_error = "EL Correo ingresado ya esta en uso";
const pass_weak_error = "La Contraseña es muy débil";

var current_view_number = 4;
const Home_number = 4;
const About_number = 0;
const Contact_number = 1;
const Faq_number = 2;
const Help_number = 3;
const Home_user_number = 5;
const Views_html = [About,Faq,Contact,Help,Home,Home_user];

const firebaseConfig={apiKey:"AIzaSyBeRXgPHpwxDOqAC8ww5KcL65vhl3_HU_U",authDomain:"radiacionuv-8196c.firebaseapp.com",databaseURL:"https://radiacionuv-8196c.firebaseio.com",projectId:"radiacionuv-8196c",storageBucket:"radiacionuv-8196c.appspot.com",messagingSenderId:"478377739382",appId:"1:478377739382:web:10da4d5a894c5a37e7cb57",measurementId:"G-4K1SEQ7JX4"};
firebase.initializeApp(firebaseConfig);

fecha_element.innerText = fecha_footer +" " +fecha;

Object.entries(link_views).forEach(([key,element])=>{
    element.addEventListener('click',function(){    
        number_view = element.getAttribute("value");
        current_view_number = number_view;
        CleanLinkViews(number_view);
    });
});

btn_registro_user.addEventListener('click',function(){
    if(IsAllRegistro()){
        type = "registro";
        event.preventDefault();
        container_inputs_registro.style.display = "none";
        this.innerText = "Registrando......"
        var spinner = document.getElementById("spinner_registro");
        spinner.style.display = "block";
        Autentificacion("registro",spinner,this,pass_input_registro.value,correo_input_registro.value);
    }
});

function IsAllRegistro(){
    if(nombres_input.value.length>0&&correo_input_registro.value.length>0&&
        pass_input_registro.value.length>0)
        return true;
    return false;
}

btn_loguearse.addEventListener('click',()=>{
    $("#modal_registro").modal("hide");
});

btn_registro.addEventListener('click',function(){
    $("#modal_login").modal("hide");
});

function CleanLinkViews(number_view){
    Object.entries(span_follow).forEach(([key,element])=>{
        element.style.display = "none";
    }); 
    if(number_view<4)
        span_follow.item(parseInt(number_view)).style.display = "block";
    if(number_view<4)
        CargarVista(CarpetaViews+Views_html[number_view]);
    else
        location.reload();
}

btn_hamburger.addEventListener('click',function(){
    if(btn_hamburger.classList.contains('open')){
        overlay.style.opacity = 0;
        overlay.style.zIndex = -1;
        btn_hamburger.classList.remove('open');
        Object.entries(span_hambuerger).forEach(([key,element])=>{
            element.style.removeProperty("margin-left");
        }); 
    }else{
        btn_hamburger.classList.add('open');
        overlay.style.opacity = 0.5;
        overlay.style.zIndex = 1;
        Object.entries(span_hambuerger).forEach(([key,element])=>{
            element.style.marginLeft = "5px";
        }); 
    }
});
window.onload = function(){
    sleep(1000).then(() => {
        $(".load_page_initial").fadeOut('slow'); 
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function CargarVista(file){
    let archivo  = new XMLHttpRequest();
        archivo.open("Get",file,false);
        archivo.onreadystatechange = function ()
        {
            if(archivo.readyState === 4)
            {
                if(archivo.status === 200 || archivo.status == 0)
                {
                    var content = archivo.responseText;
                    container_views.innerHTML=content;
                }
            }
        }
    AddScript()
    archivo.send(null);
}

btn_inicio.addEventListener('click', function (){
    if(IsAll()){
        type = "login";
        container_inputs.style.display = "none";
        this.innerText = "Iniciando Sesión......"
        event.preventDefault();
        var spinner = document.getElementById("spinner_login_registro");
        spinner.style.display = "block";
        Autentificacion("login",spinner,this,pass_input.value,email.value);
    }
});

function IsAll(){
    if(pass_input.value.length>0&&email.value.length>0)
        return true;
    return false;
}

function Autentificacion(type,spinner,btn,pass,email){
    const auth = firebase.auth();
    if(type === "login"){
        auth.signInWithEmailAndPassword(email, pass).then(function(value) {
            container_inputs.style.display = "block";
            spinner.style.display = "none";
            email_error.innerText = "";
            pass_error.innerText = "";
            form_login.reset();
            type = "login";
            $("#modal_login").modal("hide");
        }).catch(function(error) {
            container_inputs.style.display = "block";
            spinner.style.display = "none";
            btn.innerText = "INICIAR SESIÓN";
            SetErrors(error.code);
        });       
    }else{
        auth.createUserWithEmailAndPassword(email, pass).then(function(value) {
            container_inputs_registro.style.display = "block";
            spinner.style.display = "none";
            email_error_registro.innerText = "";
            pass_error_registro.innerText = "";
            $("#modal_registro").modal("hide");
          }).catch(function(error) {
            container_inputs_registro.style.display = "block";
            spinner.style.display = "none";
            btn.innerText = "Registrarse";
            SetErrors(error.code);
          });       
    }
}
function GetDataNombres(value){
    firebase.database()
    .ref(`users/`+value)
    .once('value')
    .then((snapshot) => { 
        localStorage.setItem("Nombres",snapshot.val().nombres);
        LoadHomeUser(home_user_style,Home_user);
    });
}
function LoadHomeUser(style,view){
    var style_home_user = document.getElementById("style_home");
    style_home_user.href = "styles/"+style;
    CargarVista(CarpetaViews+view);
}
function SetErrors(error_code){
    switch(error_code){
        case email_bad_format:
            email_error.innerText = email_bad_format_error;
            pass_error.innerText = "";
            break;
        case email_not_found:
            email_error.innerText = email_not_found_error;
            pass_error.innerText = "";
            break;
        case wrong_password:
            pass_error.innerText = wrong_password_error; 
            email_error.innerText = "";
            break;
        case email_in_use:
            email_error_registro.innerText = email_in_use_error;
            pass_error_registro.innerText = "";
            break; 
        case weak_pass:
            email_error_registro.innerText = "";
            pass_error_registro.innerText = pass_weak_error;
            break;
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user){
        current_view_number = Home_user_number;
        btn_registro_login.style.display = "none";
        link_views[current_view_number-1].setAttribute("value","5");
        if(type === "login") 
            GetDataNombres(user.uid)
        else {
            var data = localStorage.getItem("Nombres");
            if(data===null)
                SetDataUser(user.uid);  
            LoadHomeUser(home_user_style,Home_user);      
        }
    }else{
        current_view_number = Home_number;
        sleep(500).then(() => {
            LoadHomeUser(home_style,Home);
            btn_registro_login.style.display = "flex";
        });
    }
});

function SetDataUser(uid){
    user = {"contraseña":pass_input_registro.value,"correo":correo_input_registro.value,
            "nombres":nombres_input.value};
    firebase.database().ref('users/' + uid).set(user);
    localStorage.setItem("Nombres",nombres_input.value);
}

function AddScript(){
    let myScript = document.createElement("script");
    myScript.setAttribute("src", "scripts/"+Views_html[current_view_number].substring(0,Views_html[current_view_number].length-4)+"js");
    myScript.setAttribute("class","injected");
    document.body.appendChild(myScript);
}


