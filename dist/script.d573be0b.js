// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/script.js":[function(require,module,exports) {
var couleur = function couleur(p) {
  if (p == "Parcelle bÃ¢tie") {
    return [200, 102, 102, 1];
  } else if (p == "Parcelle non bÃ¢tie") {
    return [255, 173, 102, 1];
  } else {
    return [128, 128, 128, 1];
  }
};

var foncier2 = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    features: []
  }),
  style: function style(feature, res) {
    property = feature.get("nature");
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [40, 40, 40, 1],
        width: 0.3
      }),
      fill: new ol.style.Fill({
        color: couleur(property)
      })
    });
  }
}); // déclaration de la carte

var map = new ol.Map({
  target: 'map',
  layers: [new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: 'terrain'
    }),
    title: 'terrain'
  }), foncier2],
  view: new ol.View({
    //  dataProjection: 'EPSG:4326',
    //  featureProjection: 'EPSG:3457',
    // center: [0, 0],
    // zoom: 2
    center: ol.proj.fromLonLat([2, 48]),
    zoom: 6,
    minZoom: 5,
    maxZoom: 22
  }),
  controls: ol.control.defaults().extend([new ol.control.ScaleLine({
    className: 'ol-scale-line',
    target: document.getElementById('scale-line')
  })])
}); //Interaction avec la carte

map.addEventListener("click", function (evt) {
  map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    // Création de la liste de nature des parcelles 
    var Nature = ['Zone AU', 'Parcelle bÃ¢tie', 'Parcelle non bÃ¢tie']; // On initialise notre compteur à 0

    var i = 0; // On assigne la nature de la parcelle cliqué par l'utilisateur dans la variable temp_Nature

    var temp_Nature = document.getElementsByTagName('option')[0].selected = feature.get("nature");
    document.getElementsByTagName('select')[0].options[i].innerHTML = temp_Nature; // On ajoute cette nature en première position de la liste Nature

    Nature.splice(0, 0, temp_Nature); // On parcours notre liste

    Nature.forEach(function (item, index, array) {
      // Pour chaque item de la liste nature on se demande si l'item est différent de la parcelle cliqué par l'utilisateur
      if (item != temp_Nature) {
        // On augmente notre compteur qui va nous servir à quelle position on affiche les autres natures de la parcelle
        i = i + 1; // On affiche la nature parcellaire différent  de la parcelle cliqué par l'utilisateur

        document.getElementsByTagName('select')[0].options[i].innerHTML = item;
      }
    }); // Récupération des champs et affichages des champs au niveau de leur ID défini dans le fichier HTML

    document.getElementsByTagName("placeholder").innerHTML = feature.get("nbr_lgmt");
    document.getElementById("logement").innerHTML = feature.get("nbr_lgmt");
    document.getElementById("localisation").innerHTML = feature.get("libgeo");
    document.getElementById("id_parc").innerHTML = feature.get("id");
  });
});

function Suppr() {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette parcelle ?")) {
    $.ajax({
      url: 'Suppresion.php',
      type: 'POST',
      data: 'id = ' + x
    });
  } else {}
} // A optimiser /////////////////////////////////////////////////////////////////
// function loadFeaturedos(data) {
//   var myData = JSON.parse(data);
//   //Inserez ici votre code de traitement de la donnee
//   //Elle se traite comme pour n'importe quel objet json
//   foncier2.getSource().clear();
//   foncier2.getSource().addFeatures(foncier2.getSource().getFormat().readFeatures(myData, {
//     dataProjection: 'EPSG:4326',
//     featureProjection: 'EPSG:3857'
//   }));
//   foncier2.getSource().refresh();
//   // map.getView().fit(foncier2.getSource().getExtent());
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$("#envoi").click(function (e) {
  $.ajax({
    url: 'visualiser.html',
    // La ressource ciblée
    type: 'GET',
    // Le type de la requête HTTP
    dataType: 'html',
    data: 'data=' + data,
    success: function success(code_html, statut) {
      window.onload = loadJSON(loadFeaturedos);
    },
    error: function error(resultat, statut, erreur) {
      alert("echec");
    } // Le type de données à recevoir, ici, du HTML.

  });
}); // window.onload = loadJSON(toggle_text), loadJSON(loadFeatures);
//pour executer le tout, il vous faudra employer la fonction exemple en callback
//par ex : loadJSON(exemple)
// The features are not added to a regular vector layer/source,
// but to a feature overlay which holds a collection of features.
// This collection is passed to the modify and also the draw
// interaction, so that both can add or modify features.

/**
 * Let user change the geometry type.
 * @param {Event} e Change event.
 */

typeSelect.onchange = function (e) {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65473" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.map