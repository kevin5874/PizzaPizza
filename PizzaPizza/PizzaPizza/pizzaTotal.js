"use strict"
var meats = 0.00;
var size;
var cheese;
var crust;
var sauce;
var veggies = 0.00;
function totalCost() {
    if ($("#meatsModal input:checkbox:checked").length > 0) {
        meats = -1.00
    }
    if ($("#veggiesModal input:checkbox:checked").length > 0) {
        veggies = -1.00
    }
   $("input:checkbox:checked").each(function (i) {
       meats += parseInt(($(this).val())); {
       }
            })
        
   

    document.getElementById("total").innerHTML = veggies + meats;

   

}



