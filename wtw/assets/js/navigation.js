/*
 * Google API Key
 * 
 * 
 */

//var countryRestrict = { 'country': 'au' };

var map;
var autocomplete;

function initMap() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        //panel: document.getElementById('right-panel')
    });
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: - 37.876857, lng: 145.044230 },
        zoom: 12
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('txtStart').addEventListener('change', onChangeHandler);
    document.getElementById('txtEnd').addEventListener('change', onChangeHandler);


    var countryRestrict = { 'country': 'au' };

    new google.maps.places.Autocomplete(document.getElementById('txtStart'), { componentRestrictions: countryRestrict }).addListener('place_changed', onPlaceChanged);
    new google.maps.places.Autocomplete(document.getElementById('txtEnd'), { componentRestrictions: countryRestrict }).addListener('place_changed', onPlaceChanged);
    //autocomplete.addListener('place_changed', onPlaceChanged);
    
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    if (document.getElementById('txtStart').value &&  document.getElementById('txtEnd').value) {
        directionsService.route({
            origin: document.getElementById('txtStart').value,
            destination: document.getElementById('txtEnd').value,

            travelMode: 'WALKING'
            //travelMode: 'DRIVING',
            //travelMode: 'TRANSIT'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        //search();
    } else {
        document.getElementById('txtStart').placeholder = 'Enter an address';
    }
}