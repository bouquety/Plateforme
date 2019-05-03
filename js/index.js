import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Draw, Modify, Snap} from 'ol/interaction.js';
import {Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource, Stamen} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style,Icon,Text} from 'ol/style.js';
import Select from 'ol/interaction/Select.js';
import { fromLonLat, get as getProjection } from 'ol/proj.js';
import TileWMS from 'ol/source/TileWMS.js';
import XYZ from 'ol/source/XYZ';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function test(datas) {
var couleur = function (p) {
if (p == "Parcelle bâtie") {
return [200, 102, 102, 1]
} else if (p == "Parcelle non bâtie") {
return [255, 173, 102, 1]
} else {
return [128, 128, 128, 1]
}
}
// var raster =new TileLayer({
// source: new OSM({
// layer: 'terrain'
// })
// });
///////////////////////////////////////////////////////////////// Déclaration Layers //////////////////////////////////////////////////////////////////////////////
var baseLayer = new TileLayer({
  source: new OSM({
      layer: 'terrain'
  }),
  name: 'baseLayer',
  visible : true
});
var Terrain = new TileLayer({
  source: new Stamen({
      layer: 'terrain'
  }),
  name: 'Terrain',
  visible : false,
});
var satellite =  new TileLayer({
  source: new XYZ({
    url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJvdXF1ZXR5IiwiYSI6ImNqdGE5bTRuaDA4a3Y0M2w4OGRxZDdoajQifQ.ddEVnvpYjmAEQbfCw43p1Q'
  }),
  name: 'mapbox',
  visible : false,
});

var IGN = new TileLayer({
  source: new TileWMS({
    url: 'https://inspire.cadastre.gouv.fr/scpc/76758.wms',
    params: {'LAYERS': 'CP.CadastralParcel,BU.Building',
    'FORMAT': 'image/png',
  'STYLES' : 'DEFAULT'},
  }),
  visible:false,
  name : 'Cadastre'
});

var GPU = new TileLayer({
  source: new TileWMS({
    url: 'https://wxs-gpu.mongeoportail.ign.fr/externe/39wtxmgtn23okfbbs1al2lz3/wfs',
    params: {'LAYERS': 'wfs_du:zone_urba',
    'FORMAT': 'image/png'},
  }),
  visible:false,
  name : 'GPU'
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var source = new VectorSource({
format: new GeoJSON(),
features: [],
// source : source
});
var foncier2 = new VectorLayer({
source:source,
style: function (feature, res) {
  var property = feature.get("nature")
return new Style({
stroke: new Stroke({
color: [40, 40, 40, 1],
width: 0.3
}),
fill: new Fill({
color: couleur(property)
})
})
},
// source: source,
});
// déclaration de la carte
var map = new Map({
  layers: [baseLayer,Terrain,foncier2,satellite,IGN,GPU],
  target: 'map',
  // container: 'map',
  renderer:'canvas',
view: new View({
center: fromLonLat([2, 48]),
zoom: 6
}),
});


///////////////////////////////////////////////////////////////// Fonction Carte ///////////////////////////////////////////////////////////////////
/////////////////////////////// fond de carte /////////////
$('.fonddecarte').change(function() {
  var layer = $(this).val();
  console.log("layer",layer)
  map.getLayers().getArray().forEach(function(e) {
    if($('#Foncier').prop('checked') == true){
      foncier2.setVisible(true)
      console.log("marche")
      }
      else {
        foncier2.setVisible(false)
        console.log("nop")
      }

      if($('#Cadastre').prop('checked') == true){
        IGN.setVisible(true)
        console.log("marche")
        }
        else {
          IGN.setVisible(false)
          console.log("nop")
        }
    var name = e.get('name');
    e.setVisible(name == layer); 
  });
});

/////////////////////////////// Foncier //////////////////////////////////////////////////

$('input#Foncier').click(function(){
  if($(this).is(':checked'))
  {
    foncier2.setVisible(true)
  }
  else {
    foncier2.setVisible(false)
  }
})


$('input#Cadastre').click(function(){
  if($(this).is(':checked'))
  {
    IGN.setVisible(true)
  }
  else {
    IGN.setVisible(false)
  }
})

///////////////////////////////////////////////////////////////// Affichage Nature ///////////////////////////////////////////////////////////////////
//Interaction avec la carte
map.on("click", function (evt) {
  map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    var etat = document.getElementById('card').style.display;
    if(etat!="none"){

    document.getElementById('card').style.display="inline";
 
    }
    
    // Création de la liste de nature des parcelles 
    var Nature = ['Zone AU', 'Parcelle bâtie','Parcelle non bâtie'];
// On initialise notre compteur à 0
    // On assigne la nature de la parcelle cliqué par l'utilisateur dans la variable temp_Nature
   var temp_Nature =  feature.get("nature");
   if (temp_Nature === undefined){
    var l = 0
    Nature.forEach(function(item, index, array) {
      document.getElementsByTagName('select')[2].options[l].innerHTML = (item);
      l= l+1
    })
   }
   else {
   document.getElementsByTagName('select')[2].options[0].selected = temp_Nature;
    // On ajoute cette nature en première position de la liste Nature
    Nature.splice(0, 0, temp_Nature);
    // On parcours notre liste
    var i = 0;
    Nature.forEach(function(item, index, array) {
       // Pour chaque item de la liste nature on se demande si l'item est différent de la parcelle cliqué par l'utilisateur
        if (item == temp_Nature){
          document.getElementsByTagName('select')[2].options[0].innerHTML = temp_Nature;
        }     
       else{
        // On augmente notre compteur qui va nous servir à quelle position on affiche les autres natures de la parcelle
        i = i +1 
        // On affiche la nature parcellaire différent  de la parcelle cliqué par l'utilisateur
        document.getElementsByTagName('select')[2].options[i].innerHTML = (item);
      }
    });
    document.getElementById("logement").value = feature.get("nbr_lgmt");
    document.getElementById("ces").innerHTML = feature.get("ces");
    document.getElementById("id_parc").innerHTML = feature.get("id");

    var geom = feature.getGeometry().getCoordinates();
    var wkt = new ol.format.WKT().writeGeometry(new ol.geom.MultiPolygon(geom));
    console.log(wkt)
    //////////////////////////////Modification/////////////////////////////////////////////////////
$("#envoi").click(function(e){
  e.preventDefault();
  
        $.post(
            'http://192.168.0.169:8080/json/modif', 
            {
                natureparcelle : $("#natureparcelle").val(),
                logement : $("#logement").val(),  
                id_parc : $("#id_parc").val(),
                geom : wkt
            },
            function(data){
                if(data == 'Success'){
                  loadJSON(loadFeaturedos);
                }
                else if(data == 'error'){
                  console.error("error ");
                }
                else {
                  console.error(data); 
                  console.error("inconnu");
                }
            },
            'text'
         );
    });









  }
  })
});


///////////////////////////////////////////////////////////////// Affichage JSON ///////////////////////////////////////////////////////////////////
function loadFeatures(datas) {
 var myGeoJSON = JSON.parse(datas);
myGeoJSON.features.forEach( function(feature) { 
  feature.geometry = JSON.parse(feature.geometry) 
});
foncier2.getSource().clear();
foncier2.getSource().addFeatures(foncier2.getSource().getFormat().readFeatures(myGeoJSON, {
dataProjection: 'EPSG:4326',
featureProjection: 'EPSG:3857'
}));
foncier2.getSource().refresh();
foncier2.getSource().changed();
map.getView().fit(foncier2.getSource().getExtent());
}
function toggle_text() {
$('[#tab2]').tooltip('show')
}
window.onload = loadJSON(loadFeatures);
///////////////////////////////////////////////////////////////// Edition ///////////////////////////////////////////////////////////////////
var typeSelect = document.getElementById('type')
    var modify = new Modify({source: source});
    var draw, snap;
    function addInteractions() {
      var value = typeSelect.value;
      if (value !== 'Non') 
      {
        map.addInteraction(modify);
    draw = new Draw({
    source: source,
    type: "MultiPolygon"
    });
    map.addInteraction(draw);
    snap = new Snap({source: source});
    map.addInteraction(snap);
    draw.on('drawend', function(evt){
    var feature = evt.feature;
    var geom = feature.getGeometry().getCoordinates();
    var wkt = new ol.format.WKT().writeGeometry(new ol.geom.MultiPolygon(geom));
    console.log(wkt)
    $("#ajout").click(function(e){
      e.preventDefault();
    if (confirm("Êtes-vous sûr de vouloir ajouter cette parcelle ?")) 
    {
      $.post(
        'http://192.168.0.169:8080/json/ajout', 
        {
          id_parc : $("#id_parc").val(),
          nature : $("#natureparcelle").val(),
          logement : $("#logement").val(),
          localisation : $("#localisation").val(),
          geom : wkt
          },
        function(data){
            if(data == 'Success'){
              alert("La parcelle à bien été ajouter !")
              loadJSON(loadFeaturedos);
            }
            else if(data == 'error'){
              console.error("error ");
            }
            else {
              console.error(data);
              console.error("inconnu");
            }
        },
        'text'
     );
    } 
    });
    });
  }
    console.log('checked')
}
addInteractions();
  typeSelect.onchange = function() {
    map.removeInteraction(draw);
    map.removeInteraction(modify);
    addInteractions();
} 
///////////////////////////////////////////////////////////////// EXPORT ///////////////////////////////////////////////////////////////////
document.getElementById('export').addEventListener('click', function() {
  map.once('rendercomplete', function(event) {
    var canvas = event.context.canvas;
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
    } else {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'map.png');
      });
    }
  });
  map.renderSync();
});
///////////////////////////////////////////////////////////////// Select Parcelle ///////////////////////////////////////////////////////////////////
var select = null; 
      var selectSingleClick = new Select();
        select = selectSingleClick;
        map.addInteraction(select);    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////ZOOM////////////////////////////////////////////////////////////////
$("#rechercher").click(function(e){
  e.preventDefault();
  loadJSON(loadFeatures);
}); 
//////////////////////////////////////////////Suppresion/////////////////////////////////////////////////////////////////////////
  $("#suppr").click(function(e){
    e.preventDefault();
  if (confirm("Êtes-vous sûr de vouloir supprimer cette parcelle ?")) 
  {
    $.post(
      'http://192.168.0.169:8080/json/suppr', 
      {
          id_parc : $("#id_parc").val(),
      },
      function(data){
          if(data == 'Success'){
            alert ("La parcelle à bien été Supprimer")
            loadJSON(loadFeaturedos);
          }
          else if(data == 'error'){
            console.error("error ");
          }
          else {
            console.error(data); 
          }
      },
      'text'
   );
  } 
  });
function loadFeaturedos(datas) {
  var myGeoJSON = JSON.parse(datas);
  myGeoJSON.features.forEach( function(feature) { 
    feature.geometry = JSON.parse(feature.geometry) 
  });
  foncier2.getSource().clear();
  foncier2.getSource().addFeatures(foncier2.getSource().getFormat().readFeatures(myGeoJSON, {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857'
  }));
  foncier2.getSource().refresh();
  foncier2.getSource().changed();
}

}
function loadJSON(callback) {
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
callback(this.responseText);
}
};
xhr.open("GET", "http://192.168.0.169:8080/json/nature", true);
// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(null);
}
window.onload = loadJSON(test);
