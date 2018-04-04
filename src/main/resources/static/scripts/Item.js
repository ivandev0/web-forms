import templateEngine from './TemplateEngine.js'
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
    this.dateError = templateResult.errors[0];
    this.expensesError = templateResult.errors[1];
    this.commentError = templateResult.errors[2];


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
                if(this.commentChange() !== null){
                    updateItem(this.model);
                }
                break;
            }
            if(e.target === this.expenses){
                if(this.expensesChange() !== null){
                    updateItem(this.model);
                }
                break;
            }
            if(e.target === this.date){
                if(this.dateChange() !== null){
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
/**
 * @return {ItemConstructor}
 */
itemConstructorPrototype.commentChange = function () {
    if(this.comment.innerText.trim() === ''){
        this.comment.classList.add('error');
        this.commentError.classList.remove('_hide');
        this.commentError.innerHTML = 'Error!';
        return null;
    } else if(this.comment.classList.contains('error')){
        this.comment.classList.remove('error');
        this.commentError.classList.add('_hide');
    }

    this.model.comment = this.comment.innerHTML;

    return this;
};
/**
 * @return {ItemConstructor}
 */
itemConstructorPrototype.expensesChange = function () {
    if(this.expenses.innerText.trim() === '' || isNaN(this.expenses.innerText.trim())){
        this.expenses.classList.add('error');
        this.expensesError.classList.remove('_hide');
        this.expensesError.innerHTML = 'Error!';
        return null;
    } else if(this.expenses.classList.contains('error')){
        this.expenses.classList.remove('error');
        this.expensesError.classList.add('_hide');
    }

    this.model.expenses = this.expenses.innerHTML;

    return this;
};
/**
 * @return {ItemConstructor}
 */
itemConstructorPrototype.dateChange = function () {
    if(this.date.value.trim() === ''){
        this.date.classList.add('error');
        this.dateError.classList.remove('_hide');
        this.dateError.innerHTML = 'Error!';
        return null;
    } else if(this.date.classList.contains('error')){
        this.date.classList.remove('error');
        this.dateError.classList.add('_hide');
    }

    this.model.date = this.date.value;

    return this;
};
