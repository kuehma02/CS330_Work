/* jshint esversion 6 */
"use strict";
document.addEventListener('click', purchased);

function saveList(){
    let table = document.getElementById("shoppinglist");
    let allRows = table.querySelectorAll('tr')

    let list = window.localStorage.getItem('shoppingList');
    list = list?JSON.parse(list): [];
    allRows.forEach(function(row){
        addItem(row, list);
    })
}

function addItem(row, list){
    let names = ['item', 'quantity', 'store', 'department', 'price'];
    let newShoppingListItem = {};
    
    let tdId = 1;
    let cols = row.querySelectorAll('td');
    for (tdId; tdId < 6; tdId++){
        let namesElement = names[tdId-1];   
        let tdElement = cols[tdId];
        newShoppingListItem[namesElement]= tdElement.textContent;
    }
    newShoppingListItem['priority']= row.className;
    list.push(newShoppingListItem);
    window.localStorage.setItem('shoppingList', JSON.stringify(list));
}

function loadList(){
    let vals = JSON.parse(window.localStorage.getItem('shoppingList'));
    if (vals){
        console.log(vals)
        vals.forEach(function(item){
            let itemValues = [item.item, item.quantity, item.store, item.department, item.price]
            generateShoppingList(itemValues, item.priority);
        });
    }
}

function clearList() {
    window.localStorage.clear();
    let table = document.getElementById("shoppinglist");
    table.innerHTML= "";
}

function populateSelect(selectId, selectValues){
    let dd = document.getElementById(selectId, selectValues);
    for (let optVal of selectValues){
        let optItem = document.createElement('option');
        optItem.value = optVal;
        optItem.innerHTML = optVal;
        dd.appendChild(optItem);
    }
}

function generateShoppingList(valueList,priority){
    let my_table = document.getElementById("shoppinglist");
    let row = document.createElement("tr");
    row.classList.add(priority);

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id="checkbox";
    checkbox.classList.add("checkboxStyle");
    checkbox.onclick = purchased.bind(checkbox);

    let checkCell = document.createElement('td');
    checkCell.appendChild(checkbox);
    row.appendChild(checkCell);

    let nonEmpty = false;
    let valIdx = 0;
    while (nonEmpty != true && valIdx != 5) {
        let val = valueList[valIdx]
        if (val== ""){
            alert("Please make sure all text fields are filled!")
            nonEmpty = true;
        }else{
            let td = document.createElement("td");
            td.innerHTML = val;
            row.appendChild(td);  
        }
        valIdx++
    }
    if (nonEmpty == false){
        my_table.appendChild(row);
    }
}

function purchased(){
    if (this.checked){
        (this.parentNode).parentNode.style.textDecoration = "line-through";
    } else {
        (this.parentNode).parentNode.style.textDecoration = "none";
    }
}

function removePurchased(){
    $('input[type="checkbox"]:checked').closest("tr").remove();
}




function clickedon() {
    let colIds = ['#item', '#quantity', '#store', '#department', '#price']
    let values = []
    for (let cid of colIds) {
        values.push(document.querySelector(cid).value)
    }
    let priority = document.querySelector("#priority").value;

    generateShoppingList(values, priority);
}

$(document).ready(function () {
    populateSelect("quantity", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    populateSelect("priority", ['low', 'medium', 'high']);
    populateSelect("store", ['Walmart', 'Co-op', 'Fareway', 'Quillins', "Casey's", 'Kwik Star']);
    populateSelect("department", ['Meat', 'Produce', 'Dairy', 'Frozen', 'Snacks', 'Alchohol', 'Clothing', 'Kitchen', 'Bathroom', 'Furniture', 'Electronics', 'Tools', 'Games']);
    loadList();
});
