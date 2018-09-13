/*
 * Google API Key
 * 
 */

var map;
//var autocomplete;
var markers_acci = [];
var markers_cons = [];
var markers_all = [];
var precaustion_cons= "cons";
var precaustion_acci= "acci";
var infowindow;
var markerCluster_acci;
var openweatherid = "d9d8a8c6ee0b146654cff75acea36c2b";

function initMap() {
    var markerArray = [];
    infowindow = new google.maps.InfoWindow();

    var stepDisplay = new google.maps.InfoWindow;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('navipanel')
    });

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: - 37.876857, lng: 145.044230 },
        zoom: 7
    });
    directionsDisplay.setMap(map);

    //directionsDisplay.setPanel(document.getElementById('navipanel'));

    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
    });

    // Display the route between the initial start and end selections.
    calculateAndDisplayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map);
    // Listen to change events from the start and end lists.
    var onChangeHandler = function () {
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
    };
    /*
    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    */
    document.getElementById('txtStart').addEventListener('change', onChangeHandler);
    document.getElementById('txtEnd').addEventListener('change', onChangeHandler);

    // control panel on the top
    var control = document.getElementById('floating-panel');
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    // legend panel on the left bottom
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

    var countryRestrict = { 'country': 'au' };

    new google.maps.places.Autocomplete(document.getElementById('txtStart'), { componentRestrictions: countryRestrict }).addListener('place_changed', onPlaceChanged);
    new google.maps.places.Autocomplete(document.getElementById('txtEnd'), { componentRestrictions: countryRestrict }).addListener('place_changed', onPlaceChanged);
    //autocomplete.addListener('place_changed', onPlaceChanged);

    //bicyle layer
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);


    // fill dataset into map - draw markers
    $('[data-construction]').each(function () {
        var markerData = $(this).data('construction');
        addMarker(markerData.Lat, markerData.Long,
            markerData.status, precaustion_cons, map, '/assets/img/icon/marker/construction.png', markers_cons);
    });

    $('[data-accident]').each(function () {
        var markerData = $(this).data('accident');
        addMarker(markerData.Lat, markerData.Long,
            markerData.status, precaustion_acci, map, null, markers_acci);
    });

    markers_all = markers_acci.concat(markers_cons);
    // Add a marker clusterer to manage the markers.
    markerCluster_acci = new MarkerClusterer(map, markers_all,
        { ignoreHidden: true,imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    
}
// Declare addMarker function
function addMarker(latitude, longitude, title, description, map,icon,array_markers) {
    var latLng = new google.maps.LatLng(latitude, longitude);


    var contentString = '<h7>' + title + '</h7>' + '<p>'+ description + '</p>';
    
    
    
    var marker = new google.maps.Marker({
        position: latLng,
        title: title,
        map: map,
        //animation: google.maps.Animation.DROP,
        draggable: false,
        icon: icon
        //label:"11"
    });

    array_markers.push(marker);

    google.maps.event.addListener(marker, 'click', function () {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        //add contentString using this syntax
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
        
    });
}

function calculateAndDisplayRoute(directionsDisplay, directionsService,
    markerArray, stepDisplay, map) {
    if (document.getElementById('txtStart').value && document.getElementById('txtEnd').value) {
        // First, remove any existing markers from the map.
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
        }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
        directionsService.route({
            origin: document.getElementById('txtStart').value,
            destination: document.getElementById('txtEnd').value,
            travelMode: 'WALKING'
            //travelMode: 'DRIVING',
            //travelMode: 'TRANSIT'
        }, function (response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === 'OK') {
                //document.getElementById('warnings-panel').innerHTML ='<b>' + response.routes[0].warnings + '</b>';
                directionsDisplay.setDirections(response);
                //showSteps(response, markerArray, stepDisplay, map);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
            stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
}

function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function () {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}

function onPlaceChanged() {
    /*
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        //search();
    } else {
        document.getElementById('txtStart').placeholder = 'Enter an address';
    }*/
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
}

function setMapOnAll(map,markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers(markers) {
    setMapOnAll(null,markers);
}

// Shows any markers currently in the array.
function showMarkers(markers) {
    setMapOnAll(map,markers);
}

function checkbox_acci() {
    if (document.getElementById("switch-1").checked) {
        showMarkers(markers_acci); 
    }
    else {
        clearMarkers(markers_acci);
    }
}

function checkbox_cons() {
    if (document.getElementById("switch-2").checked) {
        showMarkers(markers_cons);
    }
    else {
        clearMarkers(markers_cons); 
    }
}

/*
 function checkbox_cluster() {
    if (document.getElementById("switch-3").checked) {
        for (var it in markers_all) {
            markers_all[it].setMap(null);
        }
        //markerCluster_acci.repaint();
        markerCluster_acci.clearMarkers();
    }
    else {

    }
}
 */

function getWeatherData(lat,long) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var javaobj = JSON.parse(xhttp.response);
            //document.getElementById("div1").innerHTML = javaobj.weather[0].main;
        }
    }
    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid="+openweatherid+"", true);
    //xhttp.send();
    return javaobj.weather[0].main;
}