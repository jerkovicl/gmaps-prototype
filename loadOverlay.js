$('document').ready(function() {
  // This example creates a simple polygon representing the Bermuda Triangle.
  /*global google */

  "use strict";

  var KMS = {
    label: "km",
    f: function(distance) {
      return distance / 1000;
    }
  };

  var NMILES = {
    label: "nautical",
    f: function(distance) {
      return ((distance / 1609.344) * (1 / 1.150779));
    }
  };

  var METRES = {
    label: "metres",
    f: function(distance) {
      return (distance);
    }
  };

  var unit_handler = KMS;

  var map;
  var autopan;
  var routePoints = new Array(0);
  var routeMarkers = new Array(0);
  var lines = [];
  var lineWidth = 1;
  var lineColor = '#ff0066';
  var routePath;
  var total_distance = 0;
  var togglemarkers = 1;
  var toggleGoogleBar = 0;
  var markerclickmode = 0;
  var geocoder;

  function initMap() {
    var latlng = new google.maps.LatLng(44.217659, 15.719840);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      // center: {
      //   lat: 44.217659,
      //   lng: 15.719840
      // },
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //var routefromurl = "0";
    //loadroutefromurl(routefromurl);
    // var ctaLayer = new google.maps.KmlLayer({
    //   url: 'http://jerkovicl.github.io/gmaps-prototype/kml/regionsShortened.kml',
    //   map: map
    // });
    // var layer = new google.maps.FusionTablesLayer({
    //   query: {
    //     select: 'col2',
    //     from: '12r8gKqTrEd-X6hHILbtTVstsILjAKN9u3WbPdzgt'
    //   }
    // });
    // layer.setMap(map);
    // var layer = new google.maps.FusionTablesLayer({
    //   map: map,
    //   heatmap: {
    //     enabled: false
    //   },
    //   query: {
    //     select: "col2",
    //     from: "12r8gKqTrEd-X6hHILbtTVstsILjAKN9u3WbPdzgt",
    //     where: ""
    //   },
    //   options: {
    //     styleId: 2,
    //     templateId: 2
    //   }
    // });

    google.maps.event.addListener(map, 'click', function(event) {
      clickatpoint(event.latLng);
    });

  }

  ;

  // $('.gm-style-iw').on('change', function(e) {
  //   console.log(e);
  //   var infoText = $("div.googft-info-window").text();
  //   console.log(infoText);
  // });

  // if ($('.googft-info-window') != null) {
  //   var infoText = $("div.googft-info-window").text();
  //   //console.log(infoText);
  //   var infoValue = "";
  //
  //   /* MUTATION OBSERVER */
  //
  //   // check if supported
  //
  //   var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  //
  //   // create an observer instance
  //   var observer = new MutationObserver(function() {
  //     var target = $("div.googft-info-window");
  //     if (target) {
  //       //console.log(target.text());
  //       localStorage.setItem("infoValue", target.text());
  //     }
  //   });
  //   observer.observe(document, {
  //     childList: true,
  //     subtree: true,
  //     attributes: false,
  //     characterData: false,
  //   });
  //
  //   // later, you can stop observing
  //   //observer.disconnect();
  // }
  // if ($('.googft-info-window') !== null) {
  //   document.querySelector('div#map').addEventListener('click', function(event) {
  //     //  if (event.target.tagName.toLowerCase() === 'div') {
  //
  //     var infoText = $("div.googft-info-window").text();
  //     console.log(infoText);
  //
  //     //  #map > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(4) > div > div.gm-style-iw > div > div > div > div
  //     //  }
  //   });
  // }

  // google.maps.InfoWindow.prototype.isOpen = function() {
  //   var map = infoWindow.getMap();
  //   return (map !== null && typeof map !== 'undefined');
  // };

  function clickatpoint(point) {
    routePoints.push(point);
    var marker = placeMarker(point, routePoints.length);
    routeMarkers.push(marker);


    //remove old polyline first
    if (!(routePath == undefined)) {
      routePath.setMap(null);
    }
    routePath = getRoutePath();
    routePath.setMap(map);

    updateDisplay();

    if (autopan == true) {
      map.setCenter(point);
    }

    //SaveCookieRoute();
  }

  function getRoutePath() {
    var routePath = new google.maps.Polyline({
      path: routePoints,
      strokeColor: lineColor,
      strokeOpacity: 1.0,
      strokeWeight: lineWidth,
      geodesic: true,
      editable: true
    });

    var routePath_path = routePath.getPath();

    //polygonChanged Event
    google.maps.event.addListener(routePath_path, 'set_at', routePathpolygonChanged);
    google.maps.event.addListener(routePath_path, 'insert_at', routePathpolygonChanged);
    //polygonChanged Event

    return routePath;
  }

  function routePathpolygonChanged() {

    //rewrite routePoints
    routePoints = new Array(0);

    //remove markers...
    if (routeMarkers) {
      for (i in routeMarkers) {
        routeMarkers[i].setMap(null);
      }
    }
    routeMarkers = new Array(0);

    var vertices = routePath.getPath();
    // Iterate over the vertices.
    for (var i = 0; i < vertices.getLength(); i++) {
      var xy = vertices.getAt(i);
      //console.log('Coordinate ' + i + ':' + xy.lat() + ',' + xy.lng());
      var point = new google.maps.LatLng(xy.lat(), xy.lng());
      routePoints.push(point);

      //add markers...
      var marker = placeMarker(point, routePoints.length);
      routeMarkers.push(marker);
      if (togglemarkers != 1) {
        //now remove it!
        marker.setMap(null);
      }
    }

    //remove old polyline first
    if (!(routePath == undefined)) {
      routePath.setMap(null);
    }
    routePath = getRoutePath();
    routePath.setMap(map);

    updateDisplay();

    //SaveCookieRoute();
  }

  function loadroutefromurl(routefromurl) {
    var arr_points = routefromurl.split("|");
    for (var i = 0; i < arr_points.length; i++) {
      var lat = arr_points[i].split(",")[0];
      var lng = arr_points[i].split(",")[1];
      var point = new google.maps.LatLng(lat, lng);

      routePoints.push(point);
      var marker = placeMarker(point, routePoints.length);
      routeMarkers.push(marker);
    }
    //add polyline
    routePath = getRoutePath();
    routePath.setMap(map);

    updateDisplay();

    //ZoomOut();

    //SaveCookieRoute();
  }

  function updateDisplay() {
    var total_distance_m = 1000 * routePath.inKm();
    var dist = unit_handler.f(total_distance_m);
    console.log("DISTANCE", dist.toFixed(3));
  }

  function placeMarker(location, number) {
    var image = new google.maps.MarkerImage('http://jerkovicl.github.io/gmaps-prototype/images/flag.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(20, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(9, 33));

    var text = "location" + location;

    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: image,
      title: text,
      draggable: true,
      visible: true
    });

    google.maps.event.addListener(marker, 'click', function() {
      //normal, insert new point at that point
      if (markerclickmode == 0) {
        clickatpoint(location);
      }
      //delete the marker at that point
      if (markerclickmode == 1) {


        //remove marker
        routeMarkers[number - 1].setMap(null);

        //update arrays...
        routePoints.splice((number - 1), 1);


        routeMarkers = new Array(0);
        //recreate routeMarkers
        if (routePoints) {
          var count = 1;
          for (i in routePoints) {
            var marker = placeMarker(i, count);
            routeMarkers.push(marker);
            count++;
          }
        }

        //remove old polyline first
        if (!(routePath == undefined)) {
          routePath.setMap(null);
        }

        //add new polyline
        routePath = null;
        routePath = getRoutePath();
        routePath.setMap(map);

        updateDisplay();
        //  SaveCookieRoute();

        //deletepoint_post();
      }
    });

    return marker;
  }

  google.maps.LatLng.prototype.kmTo = function(a) {
    var e = Math,
      ra = e.PI / 180;
    var b = this.lat() * ra,
      c = a.lat() * ra,
      d = b - c;
    var g = this.lng() * ra - a.lng() * ra;
    var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d / 2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g / 2), 2)));
    return f * 6378.137;
  };

  google.maps.Polyline.prototype.inKm = function(n) {
    var a = this.getPath(n),
      len = a.getLength(),
      dist = 0;
    for (var i = 0; i < len - 1; i++) {
      dist += a.getAt(i).kmTo(a.getAt(i + 1));
    }
    return dist;
  };

  google.maps.event.addDomListener(window, 'load', initMap);
});
