class Item {
    constructor(name,quantity,price,store,section,priority){
        this._name = name;
        this._quantity = quantity;
        this._price = price;
        this._store = store;
        this._section = section;
        this._priority = priority;
        this._purchased = false;
    }

    get purchased() {
        return this._purchased
    }

    set purchased(newVal) {
        if (newVal != true || newVal != false){
            console.error("Must be a boolean")
        }
        else {
            this._purchased = newVal;
        }
    }
}

class ShoppingList {
    constructor(){
        this._items = [];
    }

    addItem(item){
        this._items.push(item);
    }
    
    cleanList(){
        let len = this._items.length
        count = 0
        for (item in this._items){
            if (item._purchased == true){
                this._items.splice(count,1)
            }
            count += 1;
        }
    }

    emptyList() {
        this.items = []
    }

}
