function drawKML() {
    
     var kmlLayer = new google.maps.KmlLayer();
    var src = 'https://data.cityofnewyork.us/api/geospatial/ekax-ky3z?method=export&format=KML';
    var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
     map: map
    });
    
    
        var kmlLayer = new google.maps.KmlLayer();
    var src = 'https://data.cityofnewyork.us/api/geospatial/tgyc-r5jh?method=export&format=KML';
    var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
     map: map
    });
}