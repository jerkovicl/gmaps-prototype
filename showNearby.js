
var browserSupportFlag = new Boolean();
var predefinedLocations = [{
  "name": "Salon",
  "lat": 43.508998,
  "lng": 16.4369106
}, {
  "name": "Club",
  "lat": 43.5079664,
  "lng": 16.4370352
}, {
  "name": "Klinički Bolnički Centar Split - Firule",
  "lat": 43.5037286,
  "lng": 16.4557887
}];

/* GET CURRENT LOCATION */
// Try W3C Geolocation (Preferred)
if (navigator.geolocation) {
  browserSupportFlag = true;
  navigator.geolocation.getCurrentPosition(function(position) {
    initialLocation = position.coords.latitude + ',' + position.coords.longitude;
    localStorage.setItem("currentLoc", initialLocation);
  }, function() {
    handleNoGeolocation(browserSupportFlag);
  });
}
// Browser doesn't support Geolocation
else {
  browserSupportFlag = false;
  handleNoGeolocation(browserSupportFlag);
}


$("form#zipcodeSearch").on("submit", function(event) {
  event.preventDefault();
  var kord = 43.5081323 + ',' + 16.4401935
  var currentLoc = localStorage.getItem("currentLoc");
  var jsonUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLoc;

  $.ajax({
    type: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/plain'
    },
    dataType: "json",
    url: jsonUrl,
    success: function(data) {

      var lat = (data.results[0].geometry.viewport.northeast.lat + data.results[0].geometry.viewport.southwest.lat) / 2;
      var lng = (data.results[0].geometry.viewport.northeast.lng + data.results[0].geometry.viewport.southwest.lng) / 2;

      predefinedLocations.forEach(function(obj) {
        var p1 = new google.maps.LatLng(obj.lat, obj.lng);
        var p2 = new google.maps.LatLng(lat, lng);

        obj.distance = calcDistance(p1, p2);
      });

      // sort by distance
      var locationInfo = predefinedLocations.sort(compare);

      //console.log('locationInfo', locationInfo);

      initializeGoogleMap(locationInfo, lat, lng);

    }
  });

});

var map;

function initializeGoogleMap(locationInfo, lat, lng) {
  var mapOptions = {
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // zoom to only the input zipcode and closest location
  var latlngbounds = new google.maps.LatLngBounds();
  latlngbounds.extend(new google.maps.LatLng(locationInfo[0].lat, locationInfo[0].lng));
  latlngbounds.extend(new google.maps.LatLng(lat, lng));
  map.fitBounds(latlngbounds);

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  // set marker for input location
  setMarker(lat, lng, map, 'http://www.lsac.org/images/default-source/mainportalimages/icon-h-grey-bg.jpg?sfvrsn=2', "You are here!", i, infowindow);

  // set marker for closest location
  setMarker(locationInfo[0].lat, locationInfo[0].lng, map, 'http://alert.mta.info/sites/all/themes/mta/images/subway_bullets/c.png', locationInfo[0].name, i, infowindow);

  for (var j = 1; j < locationInfo.length; j++) {
    // set marker for other location
    setMarker(locationInfo[j].lat, locationInfo[j].lng, map, '', locationInfo[j].name, i, infowindow);
  }

}

function calcDistance(p1, p2) {
  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}

function compare(a, b) {
  if (parseFloat(a.distance) < parseFloat(b.distance))
    return -1;
  if (parseFloat(a.distance) > parseFloat(b.distance))
    return 1;
  return 0;
}

function setMarker(lat, lng, map, icon, content, i, infowindow) {

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    icon: icon
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent(content);
      infowindow.open(map, marker);
    }
  })(marker, i));

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}
