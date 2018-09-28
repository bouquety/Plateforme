function loadJSON(callback){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 || this.status == 200){
                console.log(this.responseText);
                callback(this.responseText);
            }
        };
        xhr.open("POST","json_fetch2.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("insee=" + document.getElementById("insee").value +
        "&champ=" + document.getElementById("champ").value
        );
}

function exemple(data){
    var myData = JSON.parse(data);
    //Inserez ici votre code de traitement de la donnee
    //Elle se traite comme pour n'importe quel objet json
}

//pour executer le tout, il vous faudra employer la fonction exemple en callback
//par ex : loadJSON(exemple)
