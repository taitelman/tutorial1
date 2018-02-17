

$(document).ready(function() {


    // here I can take array of circles and automatically place it in the space.
    view.selectAll("circle")
        .data(circles)
        .enter().append("circle")
        .attr("transform", function (d, i) {
            return "translate(" + d[1] + "," + d[2] + ")";
        })
        .attr("r", function (d, i) {
            return d[3]
        })
        .attr("circleId", function (d, i) {
            return d[0];
        })
        .attr("data-toggle", "modal")
        .attr("data-target", "#modal1")
        .on("click", circleClicked)
        .style("fill", function (d, i) {
            return colors[i];
        });

    // // here I take the labels and try to place them in middle of circle by reading array
    view.selectAll("text").data(labels).enter().append("text")
        .attr("x", function (d, i) {
            return (d[0]);
        })
        .attr("y", function (d, i) {
            return (d[1]);
        })
        .attr("style", function (d, i) {
            return "font-family:Times;font-size:" + (d[2]/3) + "px;fill:white";
        })
        .attr("r",function (d,i) { return d[2]; })
        .html(function (d, i) {
            return d[3];
        });




});

var width = self.frameElement ? 960 : innerWidth,
    height = self.frameElement ? 500 : innerHeight;


// a method to show/hide circles in the main graph according to their radius property
function numOfConvChanged(value) {
    $("circle").each(function () {
        var r = +$(this).attr("r");
        var sliderVal = +value;
        if (r && r < sliderVal) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
    $("text").each(function () {
        var r = +$(this).attr("r");
        var sliderVal = +value;
        if (r && r < sliderVal) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });
}

function zoomed() {
    view.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
}

function nozoom() {
    d3.event.preventDefault();
}

function circleClicked(d, i) {
    console.log("circle clicked d=" + d + " i=" + i);
    //inject rows to the table.
    let tableBody = $("#modal1body");
    if (tableBody) {
        let circleId = +$(this).attr("circleId");
        let circleIntents = intents[circleId];
        let tableTitle = topics[circleId];
        console.log('intents for circle:'+circleIntents);
        $("#modal1body").empty(); //cleans old table data
        // here we also need to re-write the title
        $("#model1title").empty();
        $("#model1title").append('<h5>'+tableTitle+'</h5>')

        if (circleId && circleIntents) {
            for (let i=0; i < circleIntents.length; i++) {
                let row = circleIntents[i];
                tableBody.append(
                    '<tr data-toggle="modal" data-target="#modal2"><td>'+row[0]+'</td><td>'+row[1]+
                    '</td><td>'+row[2]+'</td></tr>'
                );
            }
        };
        $('#modal1body tr').click(function() {
            //when user clicks on modal1 row this event will be called.
            var intentId = $(this).children().closest('td').html();
            console.log("intent="+intentId + " clicked");
            // fill here modal2 data...
        });
    }
}

var zoom = d3.behavior.zoom()
    .on("zoom", zoomed);


var svg = d3.select("#mainBody")
    .on("touchstart", nozoom)
    .on("touchmove", nozoom)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g").call(zoom);

g.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "fill:blue;stroke-width:4;stroke:rgb(0,0,0);fill-opacity:0.1;stroke-opacity:0.9")
;

var view = g.append("g")
    .attr("class", "view");



