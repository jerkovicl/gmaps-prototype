

//<![CDATA[
var map;
var mgr;
var icons = {};
var allmarkers = [];

function load() {
    var myOptions = {
        zoom: 3,
        center: new google.maps.LatLng(50.62504, -100.10742),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map'), myOptions);

    mgr = new MarkerManager(map);

    google.maps.event.addListener(mgr, 'loaded', function(){
        setupOfficeMarkers();
        google.maps.event.addListener(map, 'zoom_changed', function() {
            updateStatus(mgr.getMarkerCount(map.getZoom()));
        });
    });
}

function getIcon(images) {
    var icon = false;
    if (images) {
        if (icons[images[0]]) {
            icon = icons[images[0]];
        } else {
            var iconImage = new google.maps.MarkerImage('images/' + images[0] + '.png',
                                                        new google.maps.Size(iconData[images[0]].width, iconData[images[0]].height),
                                                        new google.maps.Point(0,0),
                                                        new google.maps.Point(0, 32));

            var iconShadow = new google.maps.MarkerImage('images/' + images[1] + '.png',
                                                         new google.maps.Size(iconData[images[1]].width, iconData[images[1]].height),
                                                         new google.maps.Point(0,0),
                                                         new google.maps.Point(0, 32));

            var iconShape = {
                coord: [1, 1, 1, 32, 32, 32, 32, 1],
                type: 'poly'
            };

            icons[images[0]] = {
                icon : iconImage,
                shadow: iconShadow,
                shape : iconShape
            };
        }
    }
    return icon;
}

function setupOfficeMarkers() {
    allmarkers.length = 0;
    for (var i in officeLayer) {
        if (officeLayer.hasOwnProperty(i)) {
            var layer = officeLayer[i];

            var markers = [];
            for (var j in layer["places"]) {
                if (layer["places"].hasOwnProperty(j)) {
                    var place = layer["places"][j];
                    var icon = getIcon(place["icon"]);

                    var title = place["name"];
                    var posn = new google.maps.LatLng(place["posn"][0], place["posn"][1]);
                    var marker = createMarker(posn, title, getIcon(place["icon"]));
                    markers.push(marker);
                    allmarkers.push(marker);
                }
            }
            mgr.addMarkers(markers, layer["zoom"][0], layer["zoom"][1]);
        }

    }
    mgr.refresh();
    updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function createMarker(posn, title, icon) {
    var markerOptions = {
        position: posn,
        title: title
    };
    if(icon !== false){
        markerOptions.shadow = icon.shadow;
        markerOptions.icon   = icon.icon;
        markerOptions.shape  = icon.shape;
    }

    var marker = new google.maps.Marker(markerOptions);

    google.maps.event.addListener(marker, 'dblclick', function() {
        mgr.removeMarker(marker)
        updateStatus(mgr.getMarkerCount(map.getZoom()));
    });
    return marker;
}

function showMarkers() {
    mgr.show();
    updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function hideMarkers() {
    mgr.hide();
    updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function deleteMarker() {
    var markerNum = parseInt(document.getElementById("markerNum").value);
    mgr.removeMarker(allmarkers[markerNum]);
    updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function clearMarkers() {
    mgr.clearMarkers();
    updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function reloadMarkers() {
    setupOfficeMarkers();
}

function updateStatus(html) {
    document.getElementById("status").innerHTML = html;
}

//]]>
