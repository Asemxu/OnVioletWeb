//development
const CarpetaViews = "/public/views/";
//production
//const CarpetaViews = "views/";
var intro_content = document.querySelector(".intro__content");

var span_follow = document.getElementsByClassName("follow");
var btn_hamburger = document.querySelector(".btn_hamburger_menu");
const link_views = document.getElementsByClassName("link__views");
var container_views = document.getElementById("container_data_views");
var span_hambuerger = document.getElementsByClassName("hamburger");
var injected_script = document.getElementById("injected_script");

const Home = "home.html";
const About = "about.html";
const Contact = "contactanos.html";
const Faq = "faq.html";
const Help = "ayudanos.html";

var current_view_number = 4;
const Home_number = 4;
const About_number = 0;
const Contact_number = 1;
const Faq_number = 2;
const Help_number = 3;
const Views_html = [About,Faq,Contact,Help,Home];


Object.entries(link_views).forEach(([key,element])=>{
    element.addEventListener('click',function(){    
        number_view = element.getAttribute("value");
        current_view_number = number_view;
        CleanLinkViews(number_view);
    });
});
function CleanLinkViews(number_view){
    Object.entries(span_follow).forEach(([key,element])=>{
        element.style.display = "none";
    }); 
    if(number_view!=4)
        span_follow.item(parseInt(number_view)).style.display = "block";
    CargarVista(CarpetaViews+Views_html[number_view]);
}

btn_hamburger.addEventListener('click',function(){
    if(btn_hamburger.classList.contains('open')){
        btn_hamburger.classList.remove('open');
        Object.entries(span_hambuerger).forEach(([key,element])=>{
            element.style.removeProperty("margin-left");
        }); 
    }else{
        btn_hamburger.classList.add('open');
        Object.entries(span_hambuerger).forEach(([key,element])=>{
            element.style.marginLeft = "5px";
        }); 
    }
});
window.onload = function(){
    CargarVista(CarpetaViews+Home);
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
    injected_script.setAttribute("src","scripts/"+Views_html[current_view_number].substring(0,Views_html[current_view_number].length-4)+"js");
    archivo.send(null);
}
