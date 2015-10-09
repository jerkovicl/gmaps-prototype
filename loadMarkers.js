//AIzaSyCv-nfwJ8oKrsSmNurbM7nbyjPZylPQAMw
/*
SecType = SECTORS/SEC.Type
SecColor = SECTORS/SEC.Color
SecAngle1 = SECTORS/SEC.Angle1
SecAngle2 = SECTORS/SEC.Angle2
SecDelta = SECTORS/SEC.Delta
Tooltip = TOOLTIP
COLOR="C" ANGLE1="40" ANGLE2="180" DELTA="140"
<SECTORS>
<SEC TYPE="Sektor vidljivosti" COLOR="B" ANGLE1="28" ANGLE2="252" DELTA="224"/>
<SEC TYPE="Sektor vidljivosti" COLOR="C" ANGLE1="252" ANGLE2="258" DELTA="6"/>
<SEC TYPE="Sektor vidljivosti" COLOR="B" ANGLE1="258" ANGLE2="298" DELTA="40"/>
</SECTORS>
*/

/// <reference path="tsd/google.maps.d.ts" />
/// <reference path="tsd/jquery.d.ts" />

var map;
var bounds = new google.maps.LatLngBounds();
// Marker manager
var mgr;
//var icon = "http://path/to/icon.png";
//var json = "http://path/to/test.json";
var infowindow = new google.maps.InfoWindow();

function initialize() {

  var mapProp = {
    center: new google.maps.LatLng(52.4550, -3.3833), //LLANDRINDOD WELLS
    zoom: 7,
    //disableDefaultUI: true
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), mapProp);
  // Marker manager
  mgr = new MarkerManager(map);

  //  $.getJSON(json, function(json1) {
  //get JSON from folder / external link
  $.getJSON("test.json", function(data) {
    //inline json
    /*var json1 = {
        "objekti": [
            {
                "title": "Aberystwyth University",
                "website": "www.aber.ac.uk",
                "phone": "+44 (0)1970 623 111",
                "lat": 52.415524,
                "lng": -4.063066},
            {
                "title": "Bangor University",
                "website": "www.bangor.ac.uk",
                "phone": "+44 (0)1248 351 151",
                "lat": 53.229520,
                "lng": -4.129987},
            {
                "title": "Cardiff Metropolitan University",
                "website": "www.cardiffmet.ac.uk",
                "phone": "+44 (0)2920 416 138",
                "lat": 51.482708,
                "lng": -3.165881}
        ]
    };*/
    $.each(data.objekti, function(key, data) {
      //$.each(json1.objekti, function (key, data) {
      //$.each(data.sectors, function (key, data) {

      /* CREATE CANVAS ARC FOR MARKERS */
      if (data.sectors != undefined) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var radius = 25;
        console.log(data.sectors);
        var startAngle = 0 * Math.PI;
        var endAngle = 2 * Math.PI;
        var counterClockwise = false;
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.stroke();
        context.closePath();

        for (var i = 0; i < data.sectors.length; i++) {



          var startAngle = ((data.sectors[i].ANGLE1 / 180) + 0.5) * Math.PI;
          var endAngle = ((data.sectors[i].ANGLE2 / 180) + 0.5) * Math.PI;
          context.beginPath();
          context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
          context.strokeStyle = data.sectors[i].COLOR;
          context.lineWidth = 5;
          context.stroke();
          context.closePath();
          console.log("startAngle", startAngle);
          console.log("endAngle", endAngle);
          console.warn("COLOR", data.sectors[i].COLOR);

          context.beginPath();
          var startAngle2 = ((data.sectors[i].ANGLE1 / 180) + 0.5) * Math.PI;
          var endAngle2 = ((data.sectors[i].ANGLE2 / 180) + 0.5) * Math.PI;
          context.arc(x, y, radius, startAngle2, endAngle2, counterClockwise);
          context.strokeStyle = data.sectors[i].COLOR;
          context.lineWidth = 5;
          context.stroke();
          context.closePath();
          console.log("startAngle2", startAngle2);
          console.log("endAngle2", endAngle2);

          context.beginPath();
          var startAngle3 = ((data.sectors[i].ANGLE1 / 180) + 0.5) * Math.PI;
          var endAngle3 = ((data.sectors[i].ANGLE2 / 180) + 0.5) * Math.PI;
          context.arc(x, y, radius, startAngle3, endAngle3, counterClockwise);
          context.strokeStyle = data.sectors[i].COLOR;
          context.lineWidth = 5;
          context.stroke();
          context.closePath();
          console.log("startAngle3", startAngle3);
          console.log("endAngle3", endAngle3);

          // save canvas image as data url (png format by default)
          // canvas.toDataURL(type, encoderOptions);
          var dataURL = canvas.toDataURL();
          console.log(dataURL);
          var elem = document.createElement("img");
          elem.src = dataURL;
          elem.setAttribute("height", "100");
          elem.setAttribute("width", "100");
          elem.setAttribute("id", "kruznica-label");







          // var markers = [];
          var latLng = new google.maps.LatLng(data.lat, data.lng);
          // Marker manager
          //bounds.extend(latLng);
          var marker = new MarkerWithLabel({
            position: latLng,
            map: map,
            icon: data.icon,
            draggable: true,
            raiseOnDrag: true,
            labelContent: elem,
            labelAnchor: new google.maps.Point(50, 71),
            labelClass: "labels" // the CSS class for the label

          });

          // var mapLabel = new MapLabel({
          //   text: dataURL,
          //   position: latLng,
          //   map: map,
          //   fontSize: 35,
          //   align: 'right'
          // });
          // mapLabel.set('position', latLng);
          //
          // var marker = new google.maps.Marker;
          // marker.bindTo('map', mapLabel);
          // marker.bindTo('position', mapLabel);
          // marker.setDraggable(true);

          var details = data.url + ", " + data.phone + "." + "<img src=" + data.imgsvj + "></img>";
          google.maps.event.addListener(marker, "mouseover", function(e) {
            elem.style.visibility = 'visible';
          });
          google.maps.event.addListener(marker, "mouseout", function(e) {
            elem.style.visibility = 'hidden';
          });

          bindInfoWindow(marker, map, infowindow, details);
          // console.log(Object.keys(marker).length);
          //markers.push(marker);
          //console.log("MARKERS", markers);
          // mgr.addMarkers(markers, 0, 3);
          console.log(Object.size("test.json"));
          //setupMarkers(marker);
          //console.log("MARKER COUNT", mgr.getMarkerCount(map.getZoom()));
        }
        google.maps.event.addListener(mgr, 'loaded', function() {
          getAllMarkers(marker, map);
          console.info("MGR", "LOADED");
          google.maps.event.addListener(map, 'zoom_changed', function() {
            console.info(mgr.getMarkerCount(map.getZoom()));
          });
        });
      }
    });

    //mgr.refresh();
  });


  //});
  /* var listener = google.maps.event.addListener(map, 'bounds_changed', function(){
       setupMarkers();
       google.maps.event.removeListener(listener);
   });*/
  function getAllMarkers(marker, map) {
    var markers = [];
    //var elem = document.getElementById("kruznica-label");
    $.getJSON("test.json", function(data) {
      for (var i = 0; i < data.objekti.length; i++) {

        // var latLng = new google.maps.LatLng(data.objekti[i].lat, data.objekti[i].lng);
        //bounds.extend(latLng);
        /* var marker = new MarkerWithLabel({
            position: latLng,
            map: map,
            icon: data.objekti[i].icon,
            draggable: true,
            raiseOnDrag: true,
            labelContent:dataURL,
            labelAnchor: new google.maps.Point(50, 71),
            labelClass: "labels" // the CSS class for the label

        });
*/
        markers.push(marker);

        console.log("MARKERS", markers);

      }

      //mgr.addMarkers(markers, 0, 3);
      var mcOptions = {
        gridSize: 50,
        maxZoom: 7
      };
      var markerCluster = new MarkerClusterer(map, markers, mcOptions);
    });

    //console.log("MARKER COUNT", mgr.getMarkerCount(7));
    //map.fitBounds(bounds);

  }
  //  mgr.refresh();
  //updateStatus(mgr.getMarkerCount(map.getZoom()));

}





function bindInfoWindow(marker, map, infowindow, strDescription) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(strDescription);
    infowindow.open(map, marker);
  });
}

function setupMarkers(marker) {
  // Marker manager
  var markers = [];
  markers.push(marker);
  mgr.addMarkers(markers, 0, 3);
  //mgr.addMarker(marker, 0, 5);
  // Marker manager
  mgr.refresh();
  map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, 'load', initialize);
//document.addEventListener('DOMContentLoaded', init, false);


/*function setupMarkers() {
mgr = new MarkerManager(map);
google.maps.event.addListener(mgr, 'loaded', function(){
   // mgr.addMarkers(initialize());
    mgr.refresh();
    google.maps.event.addListener(map, 'zoom_changed', function() {
        updateStatus(mgr.getMarkerCount(map.getZoom()));
    });

});
}*/
function updateStatus(html) {
  document.getElementById("status").innerHTML = html;
}

/* HELPER FUNCTIONS */
Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
