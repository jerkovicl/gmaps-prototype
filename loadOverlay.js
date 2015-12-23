$('document').ready(function() {
  // This example creates a simple polygon representing the Bermuda Triangle.
  /*global google */

  "use strict";


  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {
        lat: 44.217659,
        lng: 15.719840
      }
    });

    var ctaLayer = new google.maps.KmlLayer({
      url: 'kml/regionsShortened.kml',
      map: map
    });
    // var layer = new google.maps.FusionTablesLayer({
    //   query: {
    //     select: 'col2',
    //     from: '12r8gKqTrEd-X6hHILbtTVstsILjAKN9u3WbPdzgt'
    //   }
    // });
    // layer.setMap(map);
  }

  google.maps.event.addDomListener(window, 'load', initMap);
});
