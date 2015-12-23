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

  }

  $('.googft-info-window').on('click', function() {
    console.log("FK YOU");
  });

  $(document).on('change', '.gm-style-iw', function(e) {
    console.log(e);
  });

  // google.maps.InfoWindow.prototype.isOpen = function() {
  //   var map = infoWindow.getMap();
  //   return (map !== null && typeof map !== 'undefined');
  // };

  google.maps.event.addDomListener(window, 'load', initMap);
});
