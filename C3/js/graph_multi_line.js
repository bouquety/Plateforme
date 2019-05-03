
var margin = {top: 20, right: 50, bottom: 20, left: 50},
    width = 500
    height = 250

        
       var data = [{
    "sale": "150",
    "date": "2000"
}, {
    "sale": "180",
    "date": "2001"
}, {
    "sale": "210",
    "date": "2002"
}, {
    "sale": "205",
    "date": "2003"
}, {
    "sale": "190",
    "date": "2006"
}, {
    "sale": "180",
    "date": "2010"
}];

var data2 = [{
    "sale": "80",
    "date": "2000"
}, {
    "sale": "170",
    "date": "2002"
}, {
    "sale": "155",
    "date": "2004"
}, {
    "sale": "140",
    "date": "2006"
}, {
    "sale": "135",
    "date": "2008"
}, {
    "sale": "130",
    "date": "2010"
}];


var data3 = [{
    "sale": "12",
    "date": "2000"
}, {
    "sale": "47",
    "date": "2003"
}, {
    "sale": "89",
    "date": "2006"
}, {
    "sale": "158",
    "date": "2007"
}, {
    "sale": "134",
    "date": "2009"
}, {
    "sale": "110",
    "date": "2010"
}];


var data4 = [{
    "sale": "25",
    "date": "2000"
}, {
    "sale": "35",
    "date": "2002"
}, {
    "sale": "78",
    "date": "2004"
}, {
    "sale": "155",
    "date": "2005"
}, {
    "sale": "175",
    "date": "2008"
}, {
    "sale": "180",
    "date": "2009"
}];


var data5 = [{
    "sale": "55",
    "date": "2000"
}, {
    "sale": "78",
    "date": "2002"
}, {
    "sale": "156",
    "date": "2006"
}, {
    "sale": "185",
    "date": "2007"
}, {
    "sale": "205",
    "date": "2009"
}, {
    "sale": "220",
    "date": "2010"
}];



var x = d3.scaleTime()
          
          
          .range([0, width]);
          
 
var y = d3.scaleLinear()
           
          .range([height,0]);

 

var line = d3.line()
    .x(function(d) { return x(d.date); }) // set the x values for the line generator
    .y(function(d) { return y(d.sale); })

          //Création SVG

svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


x.domain(d3.extent(data,function(d){return d.date}))
y.domain([0,d3.max(data,function(d){return d.sale})])


svg.append('svg:path')  
  .attr('d', line(data))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

  svg.append('svg:path')
  .attr('d', line(data2))
  .attr('stroke', 'orange')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

   svg.append('svg:path')
  .attr('d', line(data3))
  .attr('stroke', 'red')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

   svg.append('svg:path')
  .attr('d', line(data4))
  .attr('stroke', 'purple')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

   svg.append('svg:path')
  .attr('d', line(data5))
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');


svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

                svg.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y));