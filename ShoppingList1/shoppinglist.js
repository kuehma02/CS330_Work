/* jshint esversion 6 */
"use strict";

function generateShoppingList(item,quantity,store,department,price, priority){
    let my_table = document.getElementById("shoppinglist");
    
    let row = document.createElement("tr");
    row.classList.add(priority);

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add('form-control');

    let checkCell = document.createElement('td');
    checkCell.appendChild(checkbox)

    let itemCell= document.createElement('td');
    itemCell.innerHTML = item;

    let quantityCell = document.createElement('td');
    quantityCell.innerHTML = quantity;

    let storeCell = document.createElement('td');
    storeCell.innerHTML = store;

    let sectionCell = document.createElement('td');
    sectionCell.innerHTML = department;

    let priceCell = document.createElement('td');
    priceCell.innerHTML = price;
 
    row.appendChild(checkCell);
    row.appendChild(itemCell);
    row.appendChild(quantityCell);
    row.appendChild(storeCell);
    row.appendChild(sectionCell);
    row.appendChild(priceCell);
    my_table.appendChild(row);
}

function clickedon() {
    let item = document.querySelector("#item").value;
    let quantity = document.querySelector("#quantity").value;
    let store = document.querySelector("#store").value;
    let department = document.querySelector("#department").value;
    let price = document.querySelector("#price").value;
    let priority = document.querySelector("#priority").value;
    generateShoppingList(item,quantity,store,department,price, priority);
}
