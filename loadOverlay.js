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
      lat: 43.677723,
      lng: 15.518473
    },
    {
      lat: 43.677639,
      lng: 15.518473
    },
    {
      lat: 43.677673,
      lng: 15.518676
    },
    {
      lat: 43.677631,
      lng: 15.518744
    },
    {
      lat: 43.677361,
      lng: 15.518751
    },
    {
      lat: 43.677361,
      lng: 15.519198
    },
    {
      lat: 43.677307,
      lng: 15.519287
    },
    {
      lat: 43.677082,
      lng: 15.519305
    },
    {
      lat: 43.677082,
      lng: 15.519513
    },
    {
      lat: 43.676807,
      lng: 15.519583
    },
    {
      lat: 43.676807,
      lng: 15.519731
    },
    {
      lat: 43.676807,
      lng: 15.519861
    },
    {
      lat: 43.676243,
      lng: 15.519861
    },
    {
      lat: 43.676086,
      lng: 15.519861
    },
    {
      lat: 43.675972,
      lng: 15.519861
    },
    {
      lat: 43.675972,
      lng: 15.518473
    },
    {
      lat: 43.67625,
      lng: 15.518471
    },
    {
      lat: 43.67625,
      lng: 15.518195
    },
    {
      lat: 43.676422,
      lng: 15.518195
    },
    {
      lat: 43.676529,
      lng: 15.518195
    },
    {
      lat: 43.676514,
      lng: 15.517883
    },
    {
      lat: 43.677124,
      lng: 15.517883
    },
    {
      lat: 43.677082,
      lng: 15.517639
    },
    {
      lat: 43.677917,
      lng: 15.517639
    },
    {
      lat: 43.677917,
      lng: 15.518473
    },
    {
      lat: 43.677723,
      lng: 15.518473
    },
    {
      lat: 43.686249,
      lng: 15.484842
    },
    {
      lat: 43.685974,
      lng: 15.484861
    },
    {
      lat: 43.685974,
      lng: 15.485139
    },
    {
      lat: 43.685696,
      lng: 15.485139
    },
    {
      lat: 43.68573,
      lng: 15.485474
    },
    {
      lat: 43.685417,
      lng: 15.485417
    },
    {
      lat: 43.685417,
      lng: 15.485692
    },
    {
      lat: 43.685139,
      lng: 15.485695
    },
    {
      lat: 43.685139,
      lng: 15.485888
    },
    {
      lat: 43.685139,
      lng: 15.485973
    },
    {
      lat: 43.684937,
      lng: 15.485973
    },
    {
      lat: 43.684029,
      lng: 15.485973
    },
    {
      lat: 43.684029,
      lng: 15.486251
    },
    {
      lat: 43.682362,
      lng: 15.486251
    },
    {
      lat: 43.682362,
      lng: 15.486511
    },
    {
      lat: 43.681885,
      lng: 15.486527
    },
    {
      lat: 43.681805,
      lng: 15.486527
    },
    {
      lat: 43.681805,
      lng: 15.486162
    },
    {
      lat: 43.681805,
      lng: 15.485695
    },
    {
      lat: 43.681702,
      lng: 15.485695
    },
    {
      lat: 43.681526,
      lng: 15.485695
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
