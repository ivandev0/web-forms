/**
 * @constructor
 */
export default function DragManagerConstructor() {
    /*
     * составной объект для хранения информации о переносе:
     * {
     *   elem - элемент, на котором была зажата мышь
     *   avatar - аватар
     *   downX/downY - координаты, на которых был mousedown
     *   shiftX/shiftY - относительный сдвиг курсора от угла элемента
     * }
     */
    this.dragObject = {
        elem: null,
        avatar: null,
        downX: 0,
        downY: 0,
        shiftX: 0,
        shiftY: 0,
        next: null,
        prev: null
    };

}

var dragManagerPrototype = DragManagerConstructor.prototype;

/**
 *
 * @param e
 */
dragManagerPrototype.onMouseDown = function (e) {
    if (e.which !== 1) { // если клик правой кнопкой мыши
        return; // то он не запускает перенос
    }

    var elem = e.target.closest('.item');

    if (!elem) return; // не нашли, клик вне draggable-объекта

    // запомнить переносимый объект
    this.dragObject.elem = elem;
    this.dragObject.next = elem.nextSibling;
    this.dragObject.prev = elem.previousSibling;

    // запомнить координаты, с которых начат перенос объекта
    this.dragObject.downX = e.pageX;
    this.dragObject.downY = e.pageY;
};

/**
 *
 * @param e
 */
dragManagerPrototype.onMouseMove = function (e) {
    if (!this.dragObject.elem) return; // элемент не зажат

    if (!this.dragObject.avatar) { // если перенос не начат...
        var moveX = e.pageX - this.dragObject.downX;
        var moveY = e.pageY - this.dragObject.downY;

        // если мышь передвинулась в нажатом состоянии недостаточно далеко
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return;
        }

        // начинаем перенос
        this.dragObject.avatar = this.createAvatar(e); // создать аватар
        if (!this.dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
            this.dragObject = {};
            return;
        }

        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        var coords = this.getCoords(this.dragObject.elem);
        this.dragObject.shiftX = this.dragObject.downX - coords.left;
        this.dragObject.shiftY = this.dragObject.downY - coords.top;

        this.startDrag(e); // отобразить начало переноса
    }

    //отключаем выделение при перемещении
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = true;
    // отобразить перенос объекта при каждом движении мыши
    this.dragObject.avatar.style.left = e.pageX - this.dragObject.shiftX + 'px';
    this.dragObject.avatar.style.top = e.pageY - this.dragObject.shiftY + 'px';


    if(this.dragObject.prev.nodeType === 1
        && this.dragObject.avatar.getBoundingClientRect().top < this.dragObject.prev.getBoundingClientRect().top){
        //swap
        document.querySelector('.list').insertBefore(this.dragObject.elem, this.dragObject.prev);
        this.dragObject.next = this.dragObject.elem.nextSibling;
        this.dragObject.prev = this.dragObject.elem.previousSibling;

    }

    if(this.dragObject.next && this.dragObject.next.nodeType === 1
        && this.dragObject.avatar.getBoundingClientRect().bottom > this.dragObject.next.getBoundingClientRect().bottom){
        //swap
        document.querySelector('.list').insertBefore(this.dragObject.elem, this.dragObject.next.nextSibling);
        this.dragObject.next = this.dragObject.elem.nextSibling;
        this.dragObject.prev = this.dragObject.elem.previousSibling;

    }

    return false;
};

/**
 *
 * @param e
 */
dragManagerPrototype.onMouseUp = function (e) {
    if (this.dragObject.avatar) { // если перенос идет
        this.finishDrag(e);
    }

    // перенос либо не начинался, либо завершился
    // в любом случае очистим "состояние переноса" dragObject
    this.dragObject = {};
};

/**
 *
 * @param e
 */
dragManagerPrototype.createAvatar = function (e) {
    // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    var avatar = this.dragObject.elem.cloneNode(true);
    /*var old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: avatar.position || '',
        left: avatar.left || '',
        top: avatar.top || '',
        zIndex: avatar.zIndex || ''
    };*/

    // функция для отмены переноса
    /*avatar.rollback = function() {
        old.parent.insertBefore(avatar, old.nextSibling);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex
    };*/

    return avatar;
};

dragManagerPrototype.getCoords = function (elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

};

/**
 *
 * @param e
 */
dragManagerPrototype.startDrag = function(e) {
    this.dragObject.elem.classList.add('transparent');
    var avatar = this.dragObject.avatar;

    // инициировать начало переноса
    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
};

/**
 *
 * @param e
 */
dragManagerPrototype.finishDrag = function(e) {
    document.body.removeChild(this.dragObject.avatar);
    this.dragObject.elem.classList.remove('transparent');
    //var dropElem = findDroppable(e);

    /*if (!dropElem) {
        this.onDragCancel(this.dragObject);
    } else {
        this.onDragEnd(this.dragObject, dropElem);
    }*/
};