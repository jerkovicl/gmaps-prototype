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
      url: 'HRV_adm1.kml',
      map: map
    });
  }

  google.maps.event.addDomListener(window, 'load', initMap);
});
