document.title = "OnViolet - Ayudanos";
var compartir = document.getElementById("compartir");

compartir.addEventListener('click',function(){
    if(navigator.share){
        navigator.share({
            title:"OnViolet Te Protege",
            text : "Descarga ya la app y protegete de los rayos Uv",
            url : "https://radiacionuv-8196c.web.app/"
        })
    }else{
        alert("Solo disponible en mobile");
    }
});