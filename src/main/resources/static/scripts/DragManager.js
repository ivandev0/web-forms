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
     *   next/prev - соседний элемент
     * }
     */
    this.dragObject = {};

}

var dragManagerPrototype = DragManagerConstructor.prototype;

/**
 *
 * @param {MouseEvent} e
 */
dragManagerPrototype.onMouseDown = function (e) {
    if (e.which !== 1) { // если клик правой кнопкой мыши
        return; // то он не запускает перенос
    }

    let elem = e.target.closest('.item');

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
 * @param {MouseEvent} e
 */
dragManagerPrototype.onMouseMove = function (e) {
    if (!this.dragObject.elem) return; // элемент не зажат

    if (!this.dragObject.avatar) { // если перенос не начат...
        let moveX = e.pageX - this.dragObject.downX;
        let moveY = e.pageY - this.dragObject.downY;

        // если мышь передвинулась в нажатом состоянии недостаточно далеко
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
            return;
        }

        // начинаем перенос
        this.dragObject.avatar = this.createAvatar(); // создать аватар
        if (!this.dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
            this.dragObject = {};
            return;
        }

        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        let coords = this.getCoords(this.dragObject.elem);
        this.dragObject.shiftX = this.dragObject.downX - coords.left;
        this.dragObject.shiftY = this.dragObject.downY - coords.top;

        this.startDrag(); // отобразить начало переноса
    }

    //отключаем выделение при перемещении
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = true;
    // отобразить перенос объекта при каждом движении мыши
    this.dragObject.avatar.style.left = e.pageX - this.dragObject.shiftX + 'px';
    this.dragObject.avatar.style.top = e.pageY - this.dragObject.shiftY + 'px';

    //переместить исходный обуект если он поднялся выше/ниже соседа
    let avatarCoords = this.getCoords(this.dragObject.avatar);
    if(this.dragObject.prev && this.dragObject.prev.nodeType === 1){
        let prevCoords = this.getCoords(this.dragObject.prev);
        if(avatarCoords.top < prevCoords.top) {
            //swap
            document.querySelector('.list').insertBefore(this.dragObject.elem, this.dragObject.prev);
            this.dragObject.next = this.dragObject.elem.nextSibling;
            this.dragObject.prev = this.dragObject.elem.previousSibling;
        }
    }

    if(this.dragObject.next && this.dragObject.next.nodeType === 1){
        let nextCoords = this.getCoords(this.dragObject.next);
        if(avatarCoords.bottom > nextCoords.bottom) {
            //swap
            document.querySelector('.list').insertBefore(this.dragObject.elem, this.dragObject.next.nextSibling);
            this.dragObject.next = this.dragObject.elem.nextSibling;
            this.dragObject.prev = this.dragObject.elem.previousSibling;
        }
    }

    return false;
};

/**
 *
 * @param {MouseEvent} e
 */
dragManagerPrototype.onMouseUp = function (e) {
    if (this.dragObject.avatar) { // если перенос идет
        this.finishDrag();
    }

    // перенос либо не начинался, либо завершился
    // в любом случае очистим "состояние переноса" dragObject
    this.dragObject = {};
};

dragManagerPrototype.createAvatar = function () {
    // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    return this.dragObject.elem.cloneNode(true);
};

/**
 *
 * @param elem
 * @returns {{top: number, bottom: number, left: number}}
 */
dragManagerPrototype.getCoords = function (elem) {
    let box = elem.getBoundingClientRect();

    //pageXOffset, pageYOffset - возвращает велечину прокрутки страницы
    return {
        top: box.top + pageYOffset,
        bottom: box.bottom + pageYOffset,
        left: box.left + pageXOffset
    };

};

dragManagerPrototype.startDrag = function() {
    this.dragObject.elem.classList.add('transparent');
    let avatar = this.dragObject.avatar;

    // инициировать начало переноса
    document.body.appendChild(avatar);
    avatar.style.zIndex = '999';
    avatar.style.position = 'absolute';
};

dragManagerPrototype.finishDrag = function() {
    document.body.removeChild(this.dragObject.avatar);
    this.dragObject.elem.classList.remove('transparent');

    /*if (!dropElem) {
        this.onDragCancel(this.dragObject);
    } else {
        this.onDragEnd(this.dragObject, dropElem);
    }*/
};
