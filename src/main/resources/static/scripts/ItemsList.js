import ItemConstructor from './Item.js'
import {paste} from './sorting.js'
var LIST_SELECTOR = '.list';
var itemsIdIterator = 0;

/**
 * @constructor
 */
export default function ListConstructor() {
    /**
     * @type {Array.<ItemConstructor>}
     * @private
     */
    this.items = [];
    this.list = document.querySelector(LIST_SELECTOR);
}

var listConstructorPrototype = ListConstructor.prototype;

/**
 * @param {Object} itemData
 * @param {Boolean} needSort
 * @return {Object}
 */
listConstructorPrototype.createItem = function (itemData, needSort) {
    var id;
    if (typeof itemData.id !== 'undefined') {
        id = itemData.id;
        if (id > itemsIdIterator) {
            itemsIdIterator = id;
        }
    } else {
        id = ++itemsIdIterator;
    }

    var item = new ItemConstructor(Object.assign(
        {
            id: id,
        },
        itemData
    ));
    this.items.push(item);
    if(!needSort){
        item.render(this.list);
    } else {
        paste(item);
    }

    this.list.addEventListener('remove', this);

    return item.model;
};

/**
 * @param {Number} itemId
 * @return {Item|null}
 * @private
 */
listConstructorPrototype.getItemById = function (itemId) {
    var items = this.items;

    for (var i = items.length; i-- ;) {
        if (items[i].model.id === itemId) {
            return items[i];
        }
    }

    return null;
};

/**
 * @param {CustomEvent} e
 */
listConstructorPrototype.handleEvent = function(e){
    if(e.type === 'remove'){
        this.onItemRemove(e);
    }
};

listConstructorPrototype.onItemRemove = function (event) {
    var itemComponent = this.getItemById(event.detail.id);

    if (itemComponent) {
        var itemComponentIndex = this.items.indexOf(itemComponent);
        this.items.splice(itemComponentIndex, 1);
    }

    return this;
};
