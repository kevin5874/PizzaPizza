"use strict"
var meats = 0.00;
var size = "Pizza Size:";
var cheese ="Cheese: ";
var crust = "Crust: ";
var sauce = "Sauce: ";
var veggies = 0.00;
var toppings = "Toppings: "
function totalCost() {
    if ($("#meatsModal input:checkbox:checked").length > 0) {
        meats = -1.00
    }
    if ($("#veggiesModal input:checkbox:checked").length > 0) {
        veggies = -1.00
    }
   $("input:checkbox:checked").each(function (i) {
       meats += parseInt(($(this).val())); 
       toppings = toppings + ", " + ($(this).data('name'));
       
            })
    $("input:radio:checked").each(function (i) {
        meats += parseInt(($(this).val()));

    })
    $("#sizeModal input:radio:checked").each(function (i) {
        size = size + " " + ($(this).data('name'));
    })
    $("#cheeseModal input:radio:checked").each(function (i) {
        cheese = cheese + " " + ($(this).data('name'));
    })
    $("#sauceModal input:radio:checked").each(function (i) {
        sauce = sauce + " " + ($(this).data('name'));
    })
    $("#crustModal input:radio:checked").each(function (i) {
        crust = crust + " " + ($(this).data('name'));
    })
    
    meats += veggies
    let total = "$" + meats + ".00";
    //Considered getting a sales tax api to calculate local sales tax, but couldnt find a free one.
    document.getElementById("total").innerHTML = total;
    alert(size+ "\n" +cheese+"\n"+sauce+"\n"+crust+ "\n" + toppings);

   

}



