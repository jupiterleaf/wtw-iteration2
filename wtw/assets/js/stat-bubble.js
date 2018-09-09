var dataset =
    [
        {
            "name": "All", "description": "Annual number of deaths by cause, World, 2016", "factors":
                [
                    { "name": "Cardiovascular", "value": "0.353", "address": "https://ourworldindata.org/causes-of-death", "note": "Cardiovascular diseasese: 17.65 million" },
                    { "name": "Cancers", "value": "0.1786", "address": "https://ourworldindata.org/causes-of-death", "note": "Canncers: 8.93 million" },
                    { "name": "Respiratory", "value": "0.0708", "address": "https://ourworldindata.org/causes-of-death", "note": "Respiratory disease: 3.54 million" },
                    { "name": "blood", "value": "0.0638", "address": "https://ourworldindata.org/causes-of-death", "note": "Diabetes, blood and endocrine disease: 3.19 million" },
                    { "name": "Dementia", "value": "0.0476", "address": "https://ourworldindata.org/causes-of-death", "note": "Dementia: 2.38 million" },
                    { "name": "Neonatal", "value": "0.0346", "address": "https://ourworldindata.org/causes-of-death", "note": "Neonatal deaths: 1.73 million" },
                    { "name": "Diarrheal", "value": "0.0332", "address": "https://ourworldindata.org/causes-of-death", "note": "Diarrheal diseases: 1.66 million" },
                    { "name": "Road incidents", "value": "0.0268", "address": "https://ourworldindata.org/causes-of-death", "note": "Road incidents: 1.34 million" }
                ]
        },
        {
            "name": "Age: 5-14", "description": "Causes of death in 5-14 year olds, World, 2016", "factors":
                [
                    { "name": "Malaria", "value": "0.3345", "address": "https://ourworldindata.org/causes-of-death", "note": "Malaria: 66,901" },
                    { "name": "Road accidents", "value": "0.31054", "address": "https://ourworldindata.org/causes-of-death", "note": "Road accidents: 62,108" },
                    { "name": "HIV/AIDS", "value": "0.261425", "address": "https://ourworldindata.org/causes-of-death", "note": "HIV/AIDS: 52,285" },
                    { "name": "Cancers", "value": "0.2601", "address": "https://ourworldindata.org/causes-of-death", "note": "Cancers: 52,020" },
                    { "name": "respiratory ", "value": "0.258695", "address": "https://ourworldindata.org/causes-of-death", "note": "Lower respiratory infections: 51,739" },
                    { "name": "Diarrheal ", "value": "0.257615", "address": "https://ourworldindata.org/causes-of-death", "note": "Diarrheal diseases: 51,523" },
                    { "name": "Drowning", "value": "0.245615", "address": "https://ourworldindata.org/causes-of-death", "note": "Drowning: 49,123" },
                    { "name": "blood", "value": "0.129095", "address": "https://ourworldindata.org/causes-of-death", "note": "Diabetes, blood and endocrine disease:" }
                ]
        }
    ];

var databar =
    [
        { "name": "safety", "value": "0.439337253" },
        { "name": "persons", "value": "0.341706752" },
        { "name": "buying", "value": "0.282750404" },
        { "name": "maint", "value": "0.232421531" },
        { "name": "lug_boot", "value": "0.157931692" },
        { "name": "doors", "value": "0.059841696" }
    ];

var w = window.innerWidth * 0.88;
var h = Math.ceil(w / nTop * 0.8);
var oR = 0;
var nTop = 0;
var haha;

var svgContainer = d3.select("#mainBubble")
    .style("height", h + "px");

var svg = d3.select('#mainBubble').append('svg')
    .attr("width", w)
    .attr('height',h)
    .on("mouseout", function () { return resetBubbles(dataset) });

var mainNote = svg.append("text")
    .attr("id", "bubbleItemNote")
    .attr("x", 20)
    .attr("y", w / 2 - 15)
    .attr("font-size", 20)
    .attr("font-family", "fantasy")
    .attr("dominant-baseline", "middle")
    .attr("alignment-baseline", "middle")
    .style("fill", "#0dddd")
    .text("Info");

var bubbleObj = svg.selectAll(".topBubble")
    .data(dataset)
    .enter().append("g")
    .attr("id", function (d, i) { return "topBubbleAndText_" + i });

nTop = dataset.length;
oR = w / (1 + 6 * nTop);
h = Math.ceil(w / nTop * 0.75);
svgContainer.style("height", h + "px");
mainNote.attr("y", h - 45);
var colVals = d3.scaleOrdinal(d3.schemeCategory10 + 1);

bubbleObj.append("circle")
    .attr("class", "topBubble")
    .attr("id", function (d, i) { return "topBubble" + i; })
    .attr("r", function (d) { return oR; })
    .attr("cx", function (d, i) { return oR * (3 * (1 + i) - 1); })
    .attr("cy", (h + oR) / 3)
    .style("fill", function (d, i) { return colVals(i); }) // #1f77b4
    .style("opacity", 0.5)
    .on("mouseover", function (d, i) { return activateBubble(d, i); });


bubbleObj.append("text")
    .attr("class", "topBubbleText")
    .attr("x", function (d, i) { return oR * (3 * (1 + i) - 1); })
    .attr("y", (h + oR) / 3)
    .style("fill", function (d, i) { return colVals(i); }) // #1f77b4
    .attr("font-size", 30)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-family", "fantasy")
    .text(function (d) { return d.name })
    .on("mouseover", function (d, i) { return activateBubble(d, i); });
bubbleObj.append("title")
    .text(function (d) {
        return d.description;
    });

for (var iB = 0; iB < nTop; iB++) {
    var childBubbles = svg.selectAll(".childBubble" + iB)
        //.data(data.children[iB].children)
        .data(dataset[iB].factors)
        .enter().append("g");

    childBubbles.append("circle")
        //childBubbles.data(a).enter().append("circle")
        .attr("class", "childBubble" + iB)
        .attr("id", function (d, i) { return "childBubble_" + iB + "sub_" + i; })
        .attr("r", function (d) { return d.value * 140; })
        .attr("cx", function (d, i) { return (oR * (3 * (iB + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI)); })
        .attr("cy", function (d, i) { return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI)); })
        .attr("cursor", "pointer")
        .style("opacity", 0.5)
        .style("fill", "#c0c0c0")
        .on("click", function (d, i) {
            window.open(d.address);
        })
        .on("mouseover", function (d, i) {
            //window.alert("say something");
            var noteText = "TechBees";
            if (d.note == null || d.note == "") {
                noteText = d.address;
            } else {
                noteText = d.note;
            }
            d3.select("#bubbleItemNote").text(noteText);
        });

    childBubbles.append("text")
        .attr("class", "childBubbleText" + iB)
        .attr("x", function (d, i) { return (oR * (3 * (iB + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI)); })
        .attr("y", function (d, i) { return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI)); })
        .style("opacity", 0.5)
        .attr("text-anchor", "middle")
        .style("fill", function (d, i) { return colVals(iB); })
        .attr("font-size", 16)
        .attr("cursor", "pointer")
        .attr("dominant-baseline", "middle")
        .attr("alignment-baseline", "middle")
        .text(function (d) { return d.name })
        .on("click", function (d, i) {
            window.open(d.address);
        });
}

resetBubbles = function (d) {
    w = window.innerWidth * 0.88;
    oR = w / (1 + 6 * nTop);

    h = Math.ceil(w / nTop * 0.75);
    svgContainer.style("height", h + "px");
    //svgContainer.style("weight",w+"px");

    mainNote.attr("y", h - 45);

    svg.attr("width", w);
    svg.attr("height", h);

    d3.select("#bubbleItemNote").text("Info");

    var t = svg.transition()
        .duration(650);

    t.selectAll(".topBubble")
        .attr("r", function (d) { return oR; })
        .attr("cx", function (d, i) { return oR * (3 * (1 + i) - 1); })
        .attr("cy", (h + oR) / 3)
        .style("opacity", 0.5);

    t.selectAll(".topBubbleText")
        .attr("font-size", 20)
        .attr("x", function (d, i) { return oR * (3 * (1 + i) - 1); })
        .attr("y", (h + oR) / 3);
    //.atrr("opacity",1);

    for (var k = 0; k < nTop; k++) {
        t.selectAll(".childBubbleText" + k)
            .attr("x", function (d, i) { return (oR * (3 * (k + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI)); })
            .attr("y", function (d, i) { return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI)); })
            .attr("font-size", 16)
            .style("opacity", 0.5);

        t.selectAll(".childBubble" + k)
            .attr("r", function (d) { return oR / 2.8; })
            .style("opacity", 0.5)
            .attr("cx", function (d, i) { return (oR * (3 * (k + 1) - 1) + oR * 1.5 * Math.cos((i - 1) * 45 / 180 * Math.PI)); })
            .attr("cy", function (d, i) { return ((h + oR) / 3 + oR * 1.5 * Math.sin((i - 1) * 45 / 180 * Math.PI)); });
    }
}


function activateBubble(d, i) {
    // increase this bubble and decrease others
    var t = svg.transition().duration(d3.event.altKey ? 600 : 500);

    t.selectAll(".topBubble")
        .attr("cx", function (d, ii) {
            if (i == ii) {
                // Nothing to change
                return oR * (3 * (1 + ii) - 1) - 0.6 * oR * (ii - 1);
            } else {
                // Push away a little bit
                if (ii < i) {
                    // left side
                    return oR * 0.6 * (3 * (1 + ii) - 1);
                } else {
                    // right side
                    return oR * (nTop * 3 + 1) - oR * 0.6 * (3 * (nTop - ii) - 1);
                }
            }
        })
        .attr("r", function (d, ii) {
            if (i == ii)
                return oR * 1.8;
            else
                return oR * 0.8;
        }).style("opacity", 0.2);

    t.selectAll(".topBubbleText")
        .attr("x", function (d, ii) {
            if (i == ii) {
                // Nothing to change
                return oR * (3 * (1 + ii) - 1) - 0.6 * oR * (ii - 1);
            } else {
                // Push away a little bit
                if (ii < i) {
                    // left side
                    return oR * 0.6 * (3 * (1 + ii) - 1);
                } else {
                    // right side
                    return oR * (nTop * 3 + 1) - oR * 0.6 * (3 * (nTop - ii) - 1);
                }
            }
        })
        .attr("font-size", function (d, ii) {
            if (i == ii)
                return 30 * 1.5;
            else
                return 30 * 0.6;
        });

    var signSide = -1;
    for (var k = 0; k < nTop; k++) {
        signSide = 0.7;
        if (k < nTop / 2) signSide = 0.7;
        t.selectAll(".childBubbleText" + k)
            .attr("x", function (d, i) { return (oR * (3 * (k + 1) - 1) - 0.6 * oR * (k - 1) + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * Math.PI)); })
            .attr("y", function (d, i) { return ((h + oR) / 3 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * Math.PI)); })
            .attr("font-size", function () {
                return (k == i) ? 20 : 12;
            })
            .style("opacity", function () {
                return (k == i) ? 1 : 0;
            });

        t.selectAll(".childBubble" + k)
            .attr("cx", function (d, i) { return (oR * (3 * (k + 1) - 1) - 0.6 * oR * (k - 1) + signSide * oR * 2.5 * Math.cos((i - 1) * 45 / 180 * Math.PI)); })
            .attr("cy", function (d, i) { return ((h + oR) / 3 + signSide * oR * 2.5 * Math.sin((i - 1) * 45 / 180 * Math.PI)); })
            .attr("r", function (d) {
                //return (k==i)?(oR*0.55):(oR/3.0);	
                return d.value * 140;
            })
            .style("opacity", function () {
                return (k == i) ? 1 : 0;
            });
    }
}

window.onresize = resetBubbles;