"use strict"
var geocoder;
var map;
var deliveryAddress;
var storeAddress;
var pizzaTime;
var wheresItAt;
function initialize() {
    geocoder = new google.maps.Geocoder();
    storeAddress = new google.maps.LatLng(44.8549, -93.2422);//Sets the initial address on the map to the Mall of America in bloomington MN
    var mapOptions = {
        zoom: 15,
        center: storeAddress
    }
    
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var marker = new google.maps.Marker({
        map: map, position: storeAddress
    });
    
}

function codeAddress() { //address's aren't supported by themselves as a google maps location, need to get the latlng
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            deliveryAddress = results[0].geometry.location;
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({ //set a new marker on the map for where we're delivering
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

var timeToDelivery;
function deliveryTime() {
    timeToDelivery;
    var times = new google.maps.DistanceMatrixService();
    times.getDistanceMatrix(
        {
            origins: ["Mall of America"], //origin of our store
            destinations: [document.getElementById('address').value],//where we're delivering to, eventually I'd like to force certain parameters on the address to make sure its a valid address
            travelMode: 'DRIVING', 
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, function (response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                alert('Error was: ' + status);
            } else {
                //alert(response.originAddresses[0] + ' --> ' + response.destinationAddresses[0] + ' ==> ' + response.rows[0].elements[0].duration.text);
                var distant = response.rows[0].elements[0].distance.text;
                if (parseInt(response.rows[0].elements[0].distance.text) > 15 || distant.indexOf(1) == " ") {//check to see if we're within delivery zone, the second condition is because of how the matrixresponse is coded
                    // for distances above 999 miles. ParseInt only reads the first number meaning that anywhere above 999mils but below 16000 is valid without it.
                    alert("Sorry, You are outside our delivery zone! Bummer!");
                }
                else {
                    var Time = new Date();
                    timeToDelivery = 15 + parseInt(response.rows[0].elements[0].duration.text);//creates an estimated time of delivery of 15min + travel time according to google maps api.
                    addTime(Time, timeToDelivery);
                    //alert(Time);
                    var hours = Time.getHours(); 
                    var minutes;
                    if (Time.getMinutes() < 10) { //making minutes look right in the time for delivery when delivery is expected in the first 10 minutes of the hour
                        minutes = "0" + Time.getMinutes();
                    }
                    else {
                        minutes = Time.getMinutes();
                    }
                    alert("Order Successful, your Pizza will arrive at " + hours + ":" +  minutes );
                    wheresItAt = Time.getHours() + ":" + Time.getMinutes();
                    //alert(timeToDelivery + " Minutes");
                   
                    
                    
                    if (Modernizr.localstorage) { //Checking for local storage on a browser using a modernizr script
                        localStorage.clear(); //clearing local storage
                        localStorage.setItem("pizzaTime", wheresItAt); //saving a new time to local storage with key of pizzaTime
                   } else {
                        // browser has no local storage do nothing in this case. Just learned this can be down without 
                        // Modernizr, but it was a cool tool to learn about so I'm leaving it in there.
                    }
                }
            }
        });
    
    
}
function addTime(date, minutes) {
    date.setMinutes(date.getMinutes() + minutes);//adding time to a date.
}
function whenPizza() {
    var name = localStorage.getItem("pizzaTime")
    alert('Delivery Time: ' + localStorage.getItem("pizzaTime"));
}

