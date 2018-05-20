import ItemConstructor from './Item.js'
import {paste} from './sorting.js'
const LIST_SELECTOR = '.list';
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
    let itemId;
    if (typeof itemData.itemId !== 'undefined') {
        itemId = itemData.itemId;
        if (itemId > itemsIdIterator) {
            itemsIdIterator = itemId;
        }
    } else {
        itemId = ++itemsIdIterator;
    }

    let item = new ItemConstructor(Object.assign(
        {
            itemId: itemId,
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
 * @return {ItemConstructor | null}
 * @private
 */
listConstructorPrototype.getItemById = function (itemId) {
    let items = this.items;

    for (let i = items.length; i-- ;) {
        if (items[i].model.itemId === itemId) {
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

/**
 * @param {CustomEvent} e
 */
listConstructorPrototype.onItemRemove = function (e) {
    let item = this.getItemById(e.detail.itemId);

    if (item) {
        let itemIndex = this.items.indexOf(item);
        this.items.splice(itemIndex, 1);
    }

    return this;
};
