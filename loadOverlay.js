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
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {
        lat: 44.217659,
        lng: 15.719840
      }
    });

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
    var layer = new google.maps.FusionTablesLayer({
      map: map,
      heatmap: {
        enabled: false
      },
      query: {
        select: "col2",
        from: "12r8gKqTrEd-X6hHILbtTVstsILjAKN9u3WbPdzgt",
        where: ""
      },
      options: {
        styleId: 2,
        templateId: 2
      }
    });

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

  if ($('.googft-info-window') != null) {
    var infoText = $("div.googft-info-window").text();
    //console.log(infoText);
    var infoValue = "";

    /* MUTATION OBSERVER */

    // check if supported

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    // create an observer instance
    var observer = new MutationObserver(function() {
      var target = $("div.googft-info-window");
      if (target) {
        //console.log(target.text());
        localStorage.setItem("infoValue", target.text());
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    // later, you can stop observing
    //observer.disconnect();
  }
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


    // //remove old polyline first
    // if (!(routePath == undefined)) {
    //   routePath.setMap(null);
    // }
    routePath = getRoutePath();
    //routePath.setMap(map);

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
  }

  function updateDisplay() {
    var total_distance_m = 1000 * routePath.inKm();
    var dist = unit_handler.f(total_distance_m);
    console.log("DISTANCE", dist.toFixed(3));
  }

  function placeMarker(location, number) {
    var image = new google.maps.MarkerImage('https://www.daftlogic.com/images/gmmarkersv3/stripes.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(20, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(9, 33));

    var text = "(" + (number) + ")" + location;

    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: image,
      title: text,
      draggable: true
    });

    // google.maps.event.addListener(marker, 'dragend', function(event) {
    //
    //   marker.setTitle('(' + number + ')' + event.latLng);
    //   routePoints[number - 1] = event.latLng;
    //   //remove polyline
    //   routePath.setMap(null);
    //   //add new polyline
    //   routePath = getRoutePath();
    //   routePath.setMap(map);
    //   SaveCookieRoute();
    //   updateDisplay();
    // });

    return marker;
  }

  google.maps.event.addDomListener(window, 'load', initMap);
});
