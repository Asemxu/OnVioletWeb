document.title = "OnViolet - Te Respondemos";

var ir_contactanos = document.getElementById("ir_contactanos");

ir_contactanos.addEventListener('click',function(){
    let myScript = document.createElement("script");
    myScript.setAttribute("src", "scripts/contactanos.js");
    myScript.setAttribute("class","injected");
    document.body.appendChild(myScript);
    span_follow.item(1).style.display = "none";
    span_follow.item(2).style.display = "block";
    CargarVista(CarpetaViews+Contact);
});