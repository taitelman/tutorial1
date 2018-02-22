

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
        .attr("data-target", function(d,i) {
            let intentAsStr = ''+d[0].toString();
            return intentAsStr.startsWith('i') ? "#modal2" : "#modal1";
        })
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
    for (key in intentContent) {
        let row = intentContent[key];
        let functionString = "fill2ndModalTable(\""+key+"\")";
        tableBody.append('<tr data-toggle="modal" data-target="#modal2" onclick='+ functionString +'><td>'+key+'</td><td>'+row["title"]+
            '</td><td>'+row["totalScore"]+'</td></tr>');
    }
}


function circleClicked(d, i) {
    //console.log("circle clicked d=" + d + " i=" + i);
    //inject rows to the table.
    let tableBody = $("#modal1body");
    if (tableBody) {
        let found = $(this).attr("circleId");
        if (found && !found.startsWith('i')) {
            let circleId = +$(this).attr("circleId");
            let circleIntents = intentsPerCircleId[circleId];
            let tableTitle = topics[circleId];
            console.log('intents for circleId:' + circleId + ' are ' + circleIntents);
            $("#modal1body").empty(); //cleans old table data
            // here we also need to re-write the title
            $("#model1title").empty();
            $("#model1title").append('<h5>' + tableTitle + '</h5>')

            if (circleId && circleIntents) {
                for (let i = 0; i < circleIntents.length; i++) {
                    let row = circleIntents[i];
                    let intentId = row["key"];
                    let intentName = intentContent[intentId]["title"];
                    let intentValue = row["value"];
                    tableBody.append(
                        '<tr data-toggle="modal" data-target="#modal2"><td>' + intentId + '</td><td>' + intentName +
                        '</td><td>' + intentValue + '</td></tr>'
                    );
                }


                $('#modal1body tr').click(function () {
                    //when user clicks on modal1 row this event will be called.
                    let intentId = $(this).children().closest('td').html();
                    console.log("intent=" + intentId + " clicked");
                    fill2ndModalTable(intentId);
                });
            }
        } else { //I assume its starts with i...
            let intentId = found;
            console.log("intent=" + intentId + " clicked");
            fill2ndModalTable(intentId);
        }
    }
}
function sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("modal1");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc"; 
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;      
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
}
function fill2ndModalTable(intentId) {
    let content = intentContent[intentId];
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
            for (let j = 0 ; j < subContent.length ; j++) {
                let feature = subContent[j];
                let featureId = feature["key"];
                if (featureId) {
                    let featureValue  = +feature["value"]  * 100;
                    let progressBar=  '<div class="progress"> <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:'+featureValue+'%"></div> </div>';
                    extrahtmlContent += '<p>'+featureId+ ':' + features[featureId]+ ' : ' +progressBar+ '</p>'
                }
            }
            //console.log(extrahtmlContent);

            tableBody.append('<tr><td><h6>' + row["title"]
                + '</h6><p>Dominancy:' + row["dominancy"] + '% Conversations:' + row["conversations"]+'</p>'
                + extrahtmlContent
                + '<p class="glyphicon glyphicon-flag">' + row["hint"]+ '</p></td></tr>');

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



