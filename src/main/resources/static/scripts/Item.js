import templateEngine from './templateEngine.js'
import {deleteItem, updateItem} from './dataBaseEngine.js';

/**
 * @param itemData
 * @constructor
 */
export default function ItemConstructor(itemData) {
    let templateResult = templateEngine(itemData);

    this.root = templateResult.root;
    this.date = templateResult.date;
    this.expenses = templateResult.expenses;
    this.comment = templateResult.comment;
    this.delete = templateResult.deleteBut;
    this.change = templateResult.changeBut;
    this.save = templateResult.saveBut;
    this.form = templateResult.form;

    this.model = {
        id : itemData.id,
        itemId : itemData.itemId,
        date: itemData.date,
        expenses: itemData.expenses,
        comment: itemData.comment
    };

    this.delete.addEventListener('click', this);
    this.change.addEventListener('click', this);
    this.form.addEventListener('submit', this);
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
        case 'click':
            if(e.target === this.delete) {
                this.remove();
                deleteItem(this.model.id);
                break;
            }
            if(e.target === this.change) {
                this.delete.classList.remove('hide');
                this.save.classList.remove('hide');
                this.change.classList.add('hide');
                this.date.readOnly = this.expenses.readOnly = this.comment.readOnly = false;
                break;
            }
            break;
        case 'submit':
            e.preventDefault();

            this.delete.classList.add('hide');
            this.save.classList.add('hide');
            this.change.classList.remove('hide');
            this.date.readOnly = this.expenses.readOnly = this.comment.readOnly = true;

            this.model.date = this.date.value;
            this.model.comment = this.comment.value;
            this.model.expenses = this.expenses.value;
            updateItem(Object.assign(this.model, {
                    userId: getCookie('userId')
                }
            ));
            break;
    }
};

/**
 * @return {ItemConstructor}
 */
itemConstructorPrototype.remove = function () {
    this.root.parentNode.removeChild(this.root);
    let event = new CustomEvent('remove',
        {
            detail: {itemId: this.model.itemId}
        });
    this.root.dispatchEvent(event);  //пробрасывается по умолчанию наверх
    return this;
};
