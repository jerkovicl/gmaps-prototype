//https://support.groundspeak.com/index.php?pg=kb.page&id=207
//http://www.gps-coordinates.net/gps-coordinates-converter

function dd2dms(lat, lng) {
  //44.6982
  //14.8414
  //  var lat;
  //  var lng;
  var latdeg;
  var latmin;
  var latsec;
  var lngdeg;
  var lngmin;
  var lngsec;
  //lat = parseFloat(document.getElementById("latitude").value) || 0;
  // lng = parseFloat(document.getElementById("longitude").value) || 0;

  // if (lat >= 0)
  //     document.getElementById("nord").checked = true;
  // if (lat < 0)
  //     document.getElementById("sud").checked = true;
  // if (lng >= 0)
  //     document.getElementById("est").checked = true;
  // if (lng < 0)
  //     document.getElementById("ouest").checked = true;
  lat = Math.abs(lat);
  lng = Math.abs(lng);
  latdeg = Math.floor(lat);
  //console.log(lat - latdeg);
  //latmin = Math.floor((lat - latdeg) * 60);
  latmin = ((lat - latdeg) * 60);
  //console.log("latmin", latmin);
  //latsec = (Math.round((lat - latdeg - latmin / 60) * 1e3 * 3600) / 1e3).toFixed(3);
  lngdeg = Math.floor(lng);
  //lngmin = Math.floor((lng - lngdeg) * 60);
  lngmin = ((lng - lngdeg) * 60);
  //lngsec = (Math.floor((lng - lngdeg - lngmin / 60) * 1e3 * 3600) / 1e3).toFixed(3);
  //document.getElementById("latitude_degres").value = latdeg;
  console.log("latitude_degres", latdeg);
  //document.getElementById("latitude_minutes").value = latmin;
  console.log("latitude_minutes", floorFigure(latmin, 3));
  //document.getElementById("latitude_secondes").value = latsec;
  //console.log("latitude_secondes", latsec);
  //document.getElementById("longitude_degres").value = lngdeg;
  console.log("longitude_degres", lngdeg);
  //document.getElementById("longitude_minutes").value = lngmin;
  console.log("longitude_minutes", floorFigure(lngmin, 3));
  //document.getElementById("longitude_secondes").value = lngsec;
  //console.log("longitude_secondes", lngsec);
  //setTimeout(codeLatLng(2), 1e3)
}


function floorFigure(figure, decimals) {
  if (!decimals)
    decimals = 2;
  var d = Math.pow(10, decimals);
  return (parseInt(figure * d) / d).toFixed(decimals);
}
