import templateEngine from './templateEngine.js'
import {deleteItem, updateItem} from './dataBaseEngine.js';

/**
 * @param itemData
 * @constructor
 */
export default function ItemConstructor(itemData) {
    var templateResult = templateEngine(itemData);

    this.root = templateResult.root;
    this.date = templateResult.date;
    this.expenses = templateResult.expenses;
    this.comment = templateResult.comment;
    this.delete = templateResult.deleteBut;
    this.change = templateResult.changeBut;
    this.save = templateResult.saveBut;

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
    this.change.addEventListener('click', this);
    this.save.addEventListener('click', this);
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
                } else {
                    this.comment.reportValidity();
                }
                break;
            }
            if(e.target === this.expenses){
                if(this.expenses.checkValidity()){
                    this.model.expenses = this.expenses.value;
                } else {
                    this.expenses.reportValidity();
                }
                break;
            }
            if(e.target === this.date){
                if(this.date.checkValidity()){
                    this.model.date = this.date.value;
                } else {

                    this.date.reportValidity();
                }
            }

            break;
        case 'click':
            if(e.target === this.delete) {
                this.remove();
                deleteItem(this.model);
                break;
            }
            if(e.target === this.change) {
                this.delete.classList.remove('hide');
                this.save.classList.remove('hide');
                this.change.classList.add('hide');
                this.date.readOnly = this.expenses.readOnly = this.comment.readOnly = false;
                break;
            }
            if(e.target === this.save) {
                this.delete.classList.add('hide');
                this.save.classList.add('hide');
                this.change.classList.remove('hide');
                this.date.readOnly = this.expenses.readOnly = this.comment.readOnly = true;
                updateItem(this.model);
                break;
            }
    }
}

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
