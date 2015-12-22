$('document').ready(function() {
  // This example creates a simple polygon representing the Bermuda Triangle.
  /*global google */

  "use strict";


  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {
        lat: 44.217659,
        lng: 15.719840
      },
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    var ctaLayer = new google.maps.KmlLayer({
      url: 'HRV_adm1.kml',
      map: map
    });
    // Define the LatLng coordinates for the polygon's path.
    //   var region1Coords = [
    //     {
    //       lat: 43.684937,
    //       lng: 15.485973
    //     },
    //     {
    //       lat: 43.684029,
    //       lng: 15.485973
    //     },
    //     {
    //       lat: 43.684029,
    //       lng: 15.486251
    //     },
    //     {
    //       lat: 43.682362,
    //       lng: 15.486251
    //     }
    //   ];
    //
    //   // Construct the polygon.
    //   var region1Polygon = new google.maps.Polygon({
    //     paths: region1Coords,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: '#FF0000',
    //     fillOpacity: 0.35
    //   });
    //   region1Polygon.setMap(map);
  }
  google.maps.event.addDomListener(window, 'load', initMap);
});
