var stores = ['Walmart', 'Co-op', 'Fareway', 'Quillins', "Casey's", 'Kwik Star']
var sections = ['Meat', 'Produce', 'Dairy', 'Frozen', 'Snacks', 'Alchohol', 'Clothing', 'Kitchen', 'Bathroom', 'Furniture', 'Electronics', 'Tools', 'Games']
var quantities = [1,2,3,4,5,6,7,8,9,10]
var priorities = ['low', 'medium', 'high']
 

var shoppingModel = new ShoppingList()
var myView = new ShoppingView(shoppingModel)

function clickedon() {
    let rowcolids = ['item', 'quantity', 'store', 'department', 'price', 'priority']
    let vals = {}
    for (let cid of rowcolids) {
        vals[cid] = document.getElementById(cid).value;
    }
    vals['department'] = document.getElementById('department').value;
    let it = new Item(vals.item, vals.quantity, vals.priority, vals.store, vals.department, vals.price)
    shoppingModel.addItem(it)
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

function saveList(){
    shoppingModel.saveList()
}

function loadList(){
    let vals = JSON.parse(window.localStorage.getItem('shoppingList'));
    if (vals){
        vals.forEach(function(item){
            let itemValues = new Item(item.name, item.quantity, item.priority, item.store, item.department, item.price)
            shoppingModel.addItem(itemValues);
        });
    }
}

function clearList(){
    shoppingModel.emptyList()
    myView.redrawList(shoppingModel);
}

function removePurchased(){
    shoppingModel.cleanList()
    myView.redrawList(shoppingModel);
}

$(document).ready(function () {
    populateSelect('quantity', quantities)
    populateSelect('priority', priorities)
    populateSelect('store', stores)
    populateSelect('department', sections)
    loadList();
});
