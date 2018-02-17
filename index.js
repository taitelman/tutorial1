

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


    fillLeftPaneIntentTable();

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

function fillLeftPaneIntentTable() {
    $("#leftPaneTable").empty()
    let tableBody =$("#leftPaneTable");
    for (key in intentContnet) {
        let row = intentContnet[key];
        let functionString = "fill2ndModalTable(\""+key+"\")";
        tableBody.append('<tr data-toggle="modal" data-target="#modal2" onclick='+ functionString +'><td>'+key+'</td><td>'+row["title"]+
            '</td><td>'+row["totalScore"]+'</td></tr>');
    }
}


function circleClicked(d, i) {
    console.log("circle clicked d=" + d + " i=" + i);
    //inject rows to the table.
    let tableBody = $("#modal1body");
    if (tableBody) {
        let circleId = +$(this).attr("circleId");
        let circleIntents = intentsPerCircleId[circleId];
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
            let intentId = $(this).children().closest('td').html();
            console.log("intent=" + intentId + " clicked");
            fill2ndModalTable(intentId);
        });
    }
}

function fill2ndModalTable(intentId) {
    let content = intentContnet[intentId];
    $("#model2title").empty();
    $("#model2title").append('<h3>' + intentId + ':' + content["title"] + '</h3>');
    $("#model2title").append('<h5> Dominancy:' + content["dominancy"] + '% | Conversations:' + content["conversations"] + '</h5>');
    $("#modal2body").empty();
    let tableBody = $("#modal2body");

    let rows = content["sections"]; // this will return an array
    if (rows) {
        for (let i =0 ; i < rows.length ; i++) {
            let row = rows[i];
            let subContent = row["content"];
            let extrahtmlContent = '';
            for (featureId in subContent) {
                let feature = subContent[featureId];
                extrahtmlContent += '<p>'+featureId + ':' + feature["name"]+ ' : ' +feature["value"]+ '</p>'
            }
            console.log(extrahtmlContent);

            tableBody.append('<tr><td><h6>' + row["title"]
                + '</h6><p>Dominancy:' + row["dominancy"] + '% Conversations:' + row["conversations"]+'</p>'
                + extrahtmlContent
                + '<p>Hint:' + row["hint"]+ '</p></td></tr>');

        }

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



