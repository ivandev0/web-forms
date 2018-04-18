import templateEngine from './templateEngine.js'
import {deleteItem, updateItem} from './dataBaseEngine.js';

/**
 * @param itemData
 * @constructor
 * @return {null}
 */
export default function ItemConstructor(itemData) {
    var templateResult = templateEngine(itemData);

    this.root = templateResult.root;
    this.date = templateResult.date;
    this.expenses = templateResult.expenses;
    this.comment = templateResult.comment;
    this.delete = templateResult.deleteBut;

    this.model = {
        id : itemData.id,
        date: itemData.date,
        expenses: itemData.expenses,
        comment: itemData.comment
    };

    this.date.addEventListener('input', this);
    this.expenses.addEventListener('input', this);
    this.comment.addEventListener('input', this);
    this.delete.addEventListener('click', this);
}

var itemConstructorPrototype = ItemConstructor.prototype;

/**
 * @param {HTMLElement} parent
 * @return {ItemConstructor}
 */
itemConstructorPrototype.render = function (parent) {
    parent.appendChild(this.root);
    return this;
};

/**
 * @param {Event} e
 */
itemConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'input':
            if(e.target === this.comment){
                if(this.comment.checkValidity()){
                    this.model.comment = this.comment.value;
                    updateItem(this.model);
                }
                break;
            }
            if(e.target === this.expenses){
                if(this.expenses.checkValidity()){
                    this.model.expenses = this.expenses.value;
                    updateItem(this.model);
                }
                break;
            }
            if(e.target === this.date){
                if(this.date.checkValidity()){
                    this.model.date = this.date.value;
                    updateItem(this.model);
                }
            }

            break;
        case 'click':
            this.remove();
            deleteItem(this.model);
            break;
    }
};

/**
 * @return {ItemConstructor}
 */
itemConstructorPrototype.remove = function () {
    this.root.parentNode.removeChild(this.root);
    var event = new CustomEvent('remove',
        {
            detail: {id: this.model.id}
        });
    this.root.dispatchEvent(event);  //пробрасывается по умолчанию наверх
    return this;
};
