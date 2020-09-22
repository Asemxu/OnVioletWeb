
//window.history.pushState(null,"","home");
const btn_indice = document.querySelector(".btn_indice");
const duration = 750;
var cards_header = document.getElementsByClassName("card-header");
const object  = firebase.database().ref().child('/Recomendaciones');
var show_bajo = false;
var show_moderado = false;
var show_alto = false;
var show_muy_alto = false;
var show_extremo = false;

btn_indice.addEventListener('click',function(){
    $('html, body').animate({
        scrollTop: $(".indice_uv").offset().top
      },
      duration);
});
Object.entries(cards_header).forEach(([key,element])=>{
    
    element.addEventListener('click',function(){
        element.style.pointerEvents = "none";
        const type = element.getAttribute("value");
        var arrow = element.children[0].children[0].children[0].children[3].children[0];
        if(arrow.classList.contains('up'))
            arrow.classList.remove("up");
        else
            arrow.classList.add("up");
        
        GetDataRecomendaciones(type,element);  
    
    });
});


function GetDataRecomendaciones(type,element){
    var element_body = document.getElementById("recomendaciones_"+type.toLowerCase()).children[0];
    if(element_body.children.length<=2){
        var loading_element = element_body.children[1];
        firebase.database()
        .ref(`Recomendaciones/`+type)
        .once('value')
        .then((snapshot) => { 
            var elemDiv = document.createElement('ul');
            elemDiv.style.cssText= "padding-left: 20px;padding-right: 20px;list-style: circle";
            Object.entries(snapshot.val()).forEach(([key,element])=>{
                var row = document.createElement('li');
                row.innerText = element.descripcion;
                elemDiv.append(row);
            });
            element_body.append(elemDiv);
            element.style.pointerEvents = "auto";
            loading_element.classList.add("hidden");
            loading_element.remove();
        });
    }else
        element.style.pointerEvents = "auto";
    
}