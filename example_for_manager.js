
//<![CDATA[

var IMAGES = [ 'sun', 'rain', 'snow', 'storm' ];
var ICONS = [];
var map = null;
var mgr = null;


function setupMap() {
    var myOptions = {
        zoom: 4,
        center: new google.maps.LatLng(48.25, 11.00),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), myOptions);

    var listener = google.maps.event.addListener(map, 'bounds_changed', function(){
        setupWeatherMarkers();
        google.maps.event.removeListener(listener);
    });
}

function getWeatherIcon() {
    var i = Math.floor(IMAGES.length*Math.random());
    if (!ICONS[i]) {
        var iconImage = new google.maps.MarkerImage('images/' + IMAGES[i] + '.png',
                                                    new google.maps.Size(32, 32),
                                                    new google.maps.Point(0,0),
                                                    new google.maps.Point(0, 32)
                                                   );

        var iconShadow = new google.maps.MarkerImage('images/' + IMAGES[i] + '.png',
                                                     new google.maps.Size(32, 59),
                                                     new google.maps.Point(0,0),
                                                     new google.maps.Point(0, 32)
                                                    );

        var iconShape = {
            coord: [1, 1, 1, 32, 32, 32, 32, 1],
            type: 'poly'
        };

        ICONS[i] = {
            icon : iconImage,
            shadow: iconShadow,
            shape : iconShape
        };

    }
    return ICONS[i];
}

function getRandomPoint() {
    var lat = 48.25 + (Math.random() - 0.5) * 14.5;
    var lng = 11.00 + (Math.random() - 0.5) * 36.0;
    return new google.maps.LatLng(Math.round(lat * 10) / 10, Math.round(lng * 10) / 10);
}

function getWeatherMarkers(n) {
    var batch = [];
    for (var i = 0; i < n; ++i) {
        var tmpIcon = getWeatherIcon();

        batch.push(new google.maps.Marker({
            position: getRandomPoint(),
            shadow: tmpIcon.shadow,
            icon: tmpIcon.icon,
            shape: tmpIcon.shape,
            title: 'Weather marker'
        })
                  );
    }
    return batch;
}

function setupWeatherMarkers() {
    mgr = new MarkerManager(map);

    google.maps.event.addListener(mgr, 'loaded', function(){
        mgr.addMarkers(getWeatherMarkers(20), 3);
        mgr.addMarkers(getWeatherMarkers(200), 6);
        mgr.addMarkers(getWeatherMarkers(1000), 8);

        mgr.refresh();
    });
}
//]]>


$.ajax({
    url: "/Home/GetUser",
    context: document.body,
    success: function (data) {
        for (var i = 0; i < data.user.length; i++) {
            var label = data.user[i].name;
            var lat = data.user[i].posn[0];
            var long = data.user[i].posn[1];

            var latlng = new google.maps.LatLng(lat, long);
            bounds.extend(latlng);
            var marker = new google.maps.Marker({
                position: latlng,
                title: label
            });

            mgr.addMarker(marker, 0);

        }
    }
});

mgr.refresh();

map.fitBounds(bounds);
});
}
$(document).ready(function () {
    initialize();
});


