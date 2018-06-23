"use strict"
var geocoder;
var map;
var deliveryAddress;
var storeAddress;

function initialize() {
    geocoder = new google.maps.Geocoder();
    storeAddress = new google.maps.LatLng(44.7319, -93.2177);
    var mapOptions = {
        zoom: 15,
        center: storeAddress
    }
    
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        map: map, position: storeAddress
    });
    
}

function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            deliveryAddress = results[0].geometry.location;
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function deliveryTime() {
    var times = new google.maps.DistanceMatrixService();
    times.getDistanceMatrix(
        {
            origins: ['Bloomington'],
            destinations: [document.getElementById('address').value],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.Imperial,
        }, function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            } else {
                alert(response.originAddresses[0] + ' --> ' + response.destinationAddresses[0] + ' ==> ' + response.rows[0].elements[0].distance.text);
            }
        });
}
    
    

