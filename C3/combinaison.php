<!DOCTYPE html>
<html lang="fr">

<head>

<link href="c3/c3.css" rel="stylesheet">

<!-- Load d3.js and c3.js -->
<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="c3/c3.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css">
 <?php include( "json_fetch_pour_dataviz"); ?>
<?php include( "json_fetch_def"); ?>
</head>
<body>

<div class="debut" id="debut">
	<?php include( "connexionbdd.php"); ?>

<div class="chart" id="chart"></div>

<script type="text/javascript">

var chart = c3.generate({
    data: {
  
        columns: [
            ['dent creuse', 2],
            ['division parcellaire', 10],
            ['friche urbaine', 40],
            ['délaisser urbain', 80],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); },


     
      

        //colors: {
          //  data1: '#ff0000',
           // data2: '#00ff00',
            //data3: '#0000ff'
        //},


    }
    });



</script>

</body>
</html>

