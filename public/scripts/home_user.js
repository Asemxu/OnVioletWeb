var titulo_bienvenido = document.querySelector(".titulo_bienvenida");
var btn_logout = document.getElementById("btn_logout");
var loag_page_initial = document.querySelector(".load_page_initial");
options.style.display = "block";
const bajo = "Bajo";
const moderado = "Moderado";
const alto = "Alto";
const muy_alto = "Muy_Alto";
const extremo = "Extremo";
InsertName();

function InsertName(){
    titulo_bienvenido.innerText = "Bienvenido "+localStorage.getItem("Nombres");
}
btn_logout.addEventListener('click',function(){
    var scripts = document.getElementsByClassName("injected");
    sleep(500).then(() => {
        firebase.auth().signOut().then(function() {
            location.reload();
            localStorage.removeItem("Nombres");
            localStorage.clear();
        }).catch(function(error) {
            alert("Algo Paso ",error.message);
        });    
    });
});
$('.demo').circleProgress({
    value: 0,
    size: 300,
    startAngle: -95.8,
    animation: {
        duration: 3000,
        easing: 'circleProgressEasing'
        },
    fill: {
        gradient: ['#C74EFF', '#F61818', '#F6BD18','#EFF618','#a4c639'],
      //gradientDirection: ['#C74EFF','#F61818','#F6BD18','#EFF618','#a4c639'],
      // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
    },
    thickness: 'auto',

})
CargarNiveles();
function CargarNiveles(){
    var spinner_indice_uv = document.querySelector(".spinner_indice_uv");
    var contenido_indice_uv = document.getElementById("contenido_indice");
    var titulo_nivel = document.querySelector(".nivel");
    firebase.database()
    .ref('Niveles_Arduino/Nivel')
    .on('value',snap=>{
        var nivel = GetNivel(snap.val());
        titulo_nivel.innerText = nivel;
        spinner_indice_uv.style.display = "none";
        contenido_indice_uv.style.display = "block";
        $('.demo').circleProgress({
            value: snap.val()/11
        }).on('circle-animation-progress', function(event, progress) {
            $(this).find('strong').html(Math.round(snap.val() * progress) + '<h6>Nivel de Radiación</h6> <h1 style="font-weight:1000">'
            +nivel+'</h1>');
          });
        CargarRecomendaciones(nivel);
    });
}

function CargarRecomendaciones(nivel){
    var spinner_recomendaciones_indice = document.getElementById("spinner_recomendaciones_indice");
    var card_recomendaciones_indice = document.querySelector(".card_recomendaciones_indice");
    firebase.database()
        .ref(`Recomendaciones/`+nivel)
        .once('value')
        .then((snapshot) => { 
            var element_body = document.getElementById("card_body_recomendaciones");
            spinner_recomendaciones_indice.style.display = "none";
            card_recomendaciones_indice.style.display = "block";
            var elemDiv = document.createElement('ul');
            elemDiv.style.cssText= "padding-left: 20px;padding-right: 20px;list-style: circle;text-align:left";
            Object.entries(snapshot.val()).forEach(([key,element])=>{
                var row = document.createElement('li');
                var img =document.createElement('img');
                img.style.width = "100px";
                img.style.height = "100px";
                img.src=element.imagen;
                row.innerText = element.descripcion;
                elemDiv.append(row);
                element_body.append(img);
            });
            element_body.append(elemDiv);
        });
}

function GetNivel(nivel){
    var header_recomendaciones = document.getElementById("header_recomendaciones");
    if(nivel>=11){
        header_recomendaciones.style.backgroundColor = "#D35FFB";
        return extremo;
    }else if(nivel>=8){
        header_recomendaciones.style.backgroundColor = "#FB5F5F";
        return muy_alto;
    }else if(nivel >=6){
        header_recomendaciones.style.backgroundColor = "#FBBE5F";
        return alto;
    }else if(nivel >=3){
        header_recomendaciones.style.backgroundColor = "#FBED5F";
        return moderado;
    }else{
        header_recomendaciones.style.backgroundColor = "#83FB5F";
        return bajo;
    }
}

