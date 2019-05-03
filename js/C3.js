import c3 from '../C3/c3';

var chart = c3.generate({
  data: {
    columns: [
      ['dent creuse', 30],
      ['division parcellaire', 10],
      ['friche urbaine', 40],
      ['délaisser urbain', 80],
    ],
    type: 'donut',
    onmouseover: function (d, i) { console.log("onmouseover", d, i); },
    onmouseout: function (d, i) { console.log("onmouseout", d, i); },
  }
});

  var chartp = c3.generate({
    bindto: '#chartp',
    data: {
      columns: [
        ['Moissy-Cramayel', 100, 200, 320, 380, 320, 330],
        ['Marne-la-Vallée', 100, 150, 300, 200, 210, 252],
        ['Evry', 150, 201, 300, 280, 330, 340],
        ['Montevrain', 200, 206, 280, 325, 390, 400],
      ],
      type: 'line',
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); },
    }
  });

  var chartos = c3.generate({
    bindto : '#chartos',
    data: {
      columns: [
            ['parcelle bâtie', 30, 200, 100, 400, 150, 250],
            ['Zone à urbaniser', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
    },
 colors: {
  data1: '#80d6ff',
 data2: '#00ff00',

},
});
  var chartps = c3.generate({
    bindto: '#chartps',
    data: {
      columns: [
          ['Moissy-Cramayel', 30, 20, 50, 40, 60, 50],
          ['Marne-la-Vallée', 200, 130, 90, 240, 130, 220],
          ['Evry', 300, 150, 160, 400, 250, 250],
          ['Montevrain', 200, 130, 90, 240, 130, 220],
          ['Marseille', 130, 120, 150, 140, 160, 150],
          ['Bordeaux', 90, 70, 20, 50, 60, 120],
      ],
      type: 'bar',
      types: {
        Evry: 'spline',
        Montevrain: 'line',
        Bordeaux: 'area',
      },
      groups: [
          ['Moissy-Cramayel','Marne-la-Vallée']
      ]
  }
});
  var chartoss = c3.generate({
    bindto : '#chartoss',
    data: {
      columns: [
          ['parcelle bâtie', 300, 350, 260, 170, 200, 120],
          ['parcelle non bâtie', 130, 100, 140, 200, 150, 50]
      ],
      types: {
          'parcelle bâtie': 'area-spline',
          'parcelle non bâtie': 'area-spline'
          // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
      },
      groups: [['data1', 'data2']]
  }
});
var charts  = c3.generate({  // ici on défini le nom du graph puis on le génére à l'aide de c3.generate
  bindto: '#charts', // On cible l'élément HTML où on va insérer notre graph avec comme id "charts" 
  data: { 
    columns: [
      // On spécifie le nom des colonnes ainsi que leurs valeurs
      ['Code INSEE 1', 64], 
      ['Code INSEE 2', 50],
      ['Code INSEE 3', 40],
      ['Code INSEE 4', 80],
    ],
    type: 'pie', // on défini le type de graph qui peut être pie, donut, line, step etc...
  }
});