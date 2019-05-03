
var margin = {top: 20, right: 20, bottom: 20, left: 50},
    width = 400,
    height = 250;
    var barPadding = 1;       
            
                          
            var dataset = [ 5, 10, 13, 19,55,51,22,5,40];
            


    // Create scale
   var xScale = d3.scaleBand()
          
          .range([0, width])
          .padding(0.1);
var yScale = d3.scaleLinear()
           .domain([0,40])
          .range([height, 0]);
            
            

    //Define X axis
            var xAxis = d3.axisBottom(xScale).tickFormat(function(d){ return d.x;});


var yAxis = d3.axisLeft(yScale);



    // Add scales to axis
   
  

            
            //Définition du SVG avec sa hauteur et largeur précédement défini
            var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

            //Création des barres 
            svg.selectAll("rect")
               .data(dataset)
               .enter()
               .append("rect")
               .attr("x", function(d, i) {
    return i * 70;  
})
               .attr("y", function(d) {
                     return yScale(d);
               
               })
               .attr("width", width / dataset.length - barPadding)
                .attr("height", function(d) {
                     return height- yScale(d);
               })

               //Fonction qui défini la couleur en fonction de la donnée
               .attr("fill", function(d) {
                    return "rgb("+(d * 10)+", 0 ,0 )";
               });


            

svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));

                svg.append("g")
                .attr("class", "axis")
                .style("color","#000000")
                .call(d3.axisLeft(yScale));
       
    
