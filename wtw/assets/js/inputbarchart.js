

// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
var y = d3.scaleLinear()
    .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg1 = d3.select('#inputbarchart').append('svg')
    .attr("id", "the_SVG_ID")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("/assets/data/header2_top5.csv", function (error, data) {
    if (error) throw error;

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.Suburb; }));
    y.domain([0, d3.max(data, function (d) { return d.Count; })]);

    // append the rectangles for the bar chart
    svg1.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.Suburb); })
        .attr("width", x.bandwidth() / 2)
        .attr("y", function (d) { return y(d.Count); })
        .attr("height", function (d) { return height - y(d.Count); })
        .append("title")
        .text(function (d) { return d.Suburb + "(" + d.Postcode + ")" + "[" + d.Count + "]"; });

    // add the x Axis
    svg1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg1.append("g")
        .call(d3.axisLeft(y).ticks(3));

});


function searchmysuburb() {
    var val_search;
    var tem_postcode;
    var tem_count;
    var tem_suburb;

    //svg1.selectAll('line').remove();

    val_search = document.getElementById("txtNumber").value;
    d3.csv("/assets/data/header2.csv", function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            if (d.Postcode == val_search) {

                tem_count = d.Count;
                tem_postcode = d.Postcode;
                tem_suburb = d.Suburb;

                document.getElementById("output").textContent = d.Count; 
                svg1.selectAll('line').remove();
                var line = svg1.append("line")
                    .attr("id", "line1")
                    .attr("x1", 0)
                    .attr("y1", (3100 - parseInt(document.getElementById("output").textContent)) / 6.9999999)
                    .attr("x2", 800)
                    .attr("y2", (3100 - parseInt(document.getElementById("output").textContent)) / 6.9999999)
                    .attr("stroke", "purple")
                    .attr("stroke-width", 10)
                    .attr("marker-end", "url(#arrow)");
            }
        });
    });
    //alert(document.getElementById("output").textContent.toString());
    //alert((3100 - tem_count) / 5.5);
    //alert(document.getElementById("output").textContent);

    // append the rectangles for the bar chart
    //d3.select("the_SVG_ID").remove();(3100 - tem_count)/5.5

    
}