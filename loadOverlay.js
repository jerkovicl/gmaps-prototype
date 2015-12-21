// This example creates a simple polygon representing the Bermuda Triangle.
/*global google */

"use strict";


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {
      lat: 44.217659,
      lng: 15.719840
    },
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // Define the LatLng coordinates for the polygon's path.
  var region1Coords = [
    {
      lat: 45.000,
      lng: 14.000
    },
    {
      lat: 44.9,
      lng: -13.95
    },
    {
      lat: 32.321,
      lng: -64.757
    },
    {
      lat: 25.774,
      lng: -80.190
    }
  ];

  // Construct the polygon.
  var region1Polygon = new google.maps.Polygon({
    paths: region1Coords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  region1Polygon.setMap(map);
}
