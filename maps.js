
const BOOUGHT_NY_URL= ("https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD");
const DISTRICTS_SHAPES=("https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson");
const  AFFORDABLE =("https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD");


var map;

var directionsDisplay;
var directionsService;


var BOROUGHT_NY=[];
var BOROUGHT_NY_NAME=[];
var AFFORDABLE_NY=[];


function splitValue(value, index) {
    return value.substring(0, index) ;
}

function splitValue2(value, index) {
    return value.substring(index) ;
}

function getRandomColor() {
    var letters = '024683571CBAGHFI';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



function getDataFromURL(URL) {
    var data = $.get(BOOUGHT_NY_URL, function () {
        var posLen = data.responseJSON.data.length;
        for (i=0; i<posLen;i++) {
            var posicion = data.responseJSON.data[i][9];
            var vecindario = data.responseJSON.data[i][10]+ ","+data.responseJSON.data[i][16];
            //console.log(posicion);
            BOROUGHT_NY.push(posicion);
            BOROUGHT_NY_NAME.push(vecindario);
        }

        console.log(BOROUGHT_NY_NAME);
    })

    var data2 = $.get(AFFORDABLE, function () {

        for(i=0; i<data2.responseJSON.data.length;i++){
            AFFORDABLE_NY.push([data2.responseJSON.data[i][31],data2.responseJSON.data[i][15]]);

        }

        console.log(AFFORDABLE_NY);


    })
}

window.onload=getDataFromURL();

var FINAL_POS=[];

function beginData() {

    var direc=[];

    for(j = 0; j<BOROUGHT_NY.length;j++){
        direc.push(BOROUGHT_NY[j].split(/[POINT()\s]+/)) ;
        var prueba = direc[j][2] + "," + direc[j][1];

        var str = prueba.split(",");

        var latlang = {lat: parseFloat(str[0]), lng: parseFloat(str[1])};

        FINAL_POS[j]=latlang;
    }

    console.log(FINAL_POS);

}


function getTable(borought) {
    var tableRef = document.getElementById('posTable').getElementsByTagName('tbody')[0];
    for (j=0; j<BOROUGHT_NY.length;j++){
        if(borought=="Bronx" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);
        }

        else if(borought=="Brooklyn" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

        else if(borought=="Manhattan" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

        else if(borought=="Queens" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

        else if(borought=="Staten Island" && BOROUGHT_NY_NAME[j].includes(borought)){
            // Insert a row in the table at the last row
            var newRow   = tableRef.insertRow(tableRef.rows.length);

            // Insert a cell in the row at index 0
            var newCell  = newRow.insertCell(0);

            // Append a text node to the cell

            var newText  = document.createTextNode(BOROUGHT_NY_NAME[j]);

            newCell.appendChild(newText);

        }

    }
}

function deleteTable() {
    var tableHeaderRowCount = 1;
    var table = document.getElementById('posTable');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}

var myLatLng = {lat: 40.7290549, lng: -73.9965233};


function initMap() {

    

   
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
        center : myLatLng,
        zoom: 10
        
        
    });
    

    
    
var image = 'http://subirimagen.me/uploads/20180530010014.png';
  var beachMarker = new google.maps.Marker({
    position: {lat:40.7293874, lng:-73.998038},
    map: map,
    icon: image
  });
        
    
    map.data.loadGeoJson(
        'http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
        map.data.loadGeoJson(
        'https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD');

    map.data.setStyle(function(feature) {


        var color = getRandomColor();
        return {
            fillColor: color,
            strokeWeight: 1
        };
    });
    
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

}

NYU_POS={lat: 40.7293874, lng:-73.998038}
BRX_POS={lat: 40.8572777, lng: -73.8738843}

function getroute(){
    
    
    var request={
        origin: BRX_POS,
        destination: NYU_POS,
        travelMode: 'DRIVING'
    };
    directionsDisplay.setMap(map);
    directionsService.route(request,function(result,status){
    
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    })
    
    
    
}

BRK_POS={lat: 40.647048, lng: -73.9405017}
function getroute2(){
    
    
    var request={
        origin: BRK_POS,
        destination: NYU_POS,
        travelMode: 'DRIVING'
    };
    directionsDisplay.setMap(map);
    directionsService.route(request,function(result,status){
    
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    })
    
    
    
}

MNH_POS={lat: 40.782074, lng: -73.9687157}
function getroute3(){
    
    
    var request={
        origin: MNH_POS,
        destination: NYU_POS,
        travelMode: 'DRIVING'
    };
    directionsDisplay.setMap(map);
    directionsService.route(request,function(result,status){
    
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    })
    
    
    
}

QUN_POS={lat: 40.716225, lng: -73.8287257}
function getroute4(){
    
    
    var request={
        origin: QUN_POS,
        destination: NYU_POS,
        travelMode: 'DRIVING'
    };
    directionsDisplay.setMap(map);
    directionsService.route(request,function(result,status){
    
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    })
    
    
    
}

STI_POS={lat: 40.580627, lng: -74.1531917}
function getroute5(){
    
    
    var request={
        origin: STI_POS,
        destination: NYU_POS,
        travelMode: 'DRIVING'
    };
    directionsDisplay.setMap(map);
    directionsService.route(request,function(result,status){
    
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    })
    
    
    
}



var markers=[];

function markerts(borought) {

    for(var k=0; k<BOROUGHT_NY.length;k++) {

        if(borought=="Bronx" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Brooklyn" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Manhattan" && BOROUGHT_NY_NAME[k].includes(borought) && BOROUGHT_NY_NAME[k] !="Marble Hill,Manhattan" && !BOROUGHT_NY_NAME[k].includes("Terrace") && !BOROUGHT_NY_NAME[k].includes("Beach")){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Queens" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }

        else if (borought=="Staten Island" && BOROUGHT_NY_NAME[k].includes(borought)){
            var marker = new google.maps.Marker({
                position: FINAL_POS[k],
                map: map,
                title: BOROUGHT_NY_NAME[k]
            });

            markers.push(marker);
        }


    }
}

var markerCenterBorough = [];



function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function drawBoro1() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "1" && splitValue2(prueba2,1)<19 ? 'pink' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Manhattan");

    clearMarkers();

    markerts("Manhattan");

}

function drawBoro2() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "2" && splitValue2(prueba2,1)<19? 'green' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Bronx");

    clearMarkers();

    markerts("Bronx");

}

function drawBoro3() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "3" && splitValue2(prueba2,1)<19 ?  'yellow' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 2,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Brooklyn");

    clearMarkers();

    markerts("Brooklyn");
}

function drawBoro4() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "4" && splitValue2(prueba2,1)<19 ? 'blue' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Queens");

    clearMarkers();

    markerts("Queens");

}


function drawBoro5() {

    map.data.setStyle(function(feature) {
        var codigo = feature.getProperty('BoroCD');

        var prueba2= codigo.toString();

        var color = splitValue(prueba2,1) == "5" && splitValue2(prueba2,1)<19 ?  'purple' : 'transparent';
        return {
            fillColor: color,
            strokeWeight: 4,
            strokeColor: color
        };
    });

    deleteTable();

    getTable("Staten Island");

    clearMarkers();

    markerts("Staten Island");

}

function drawByName(name){
   switch(name) {
       
        case  "Bronx" :
            
            getroute()
           
            break;
            
        case "Brooklyn":
             getroute2()
         
            break;
        case  "Manhattan":
            getroute3()
           
            break;
            
        case "Queens":
             getroute4()
            break;
        
            
        case "Staten Island":
             getroute5()
         
            break;  
            
        default:
          
    }
}


$("document").ready(function(){
    setTimeout(function(){beginData()}, 1000);
})