/**
 * dd - date down
 * du - date up
 * ed - expenses down
 * eu - expenses up
 * @type {string}
 */
var currentSort = 'dd';

export function changeDateSort() {
    if(currentSort === 'dd'){
        currentSort = 'du';
    } else {
        currentSort = 'dd';
    }
    sort();
}

export function paste(item) {
    var list = document.querySelector('.list');
    if(list.children.length === 0){
        list.appendChild(item.root);
        return;
    }

    var node = list.firstChild;

    if(currentSort === 'dd') {
        while ((node = node.nextSibling)) {
            var date = node.getElementsByClassName('item_date')[0];
            var itemDate = item.root.querySelector('.item_date');
            if (new Date(itemDate.value).getTime() >= new Date(date.value).getTime()) {
                document.querySelector('.list').insertBefore(item.root, node);
                return;
            }
            document.querySelector('.list').appendChild(item.root);
        }
    } else if(currentSort === 'du'){
        while ((node = node.nextSibling)) {
            var date = node.getElementsByClassName('item_date')[0];
            var itemDate = item.root.querySelector('.item_date');
            if (new Date(itemDate.value).getTime() <= new Date(date.value).getTime()) {
                document.querySelector('.list').insertBefore(item.root, node);
                return;
            }
            document.querySelector('.list').appendChild(item.root);
        }
    }
}

export function sort() {

    var list = document.querySelector('.list');
    var nodes = list.children;

    var itemsArr = [];
    for (var i in nodes) {
        if (nodes[i].nodeType === 1) { // get rid of the whitespace text nodes
            itemsArr.push(nodes[i]);
        }
    }

    if(currentSort === 'dd') {
        itemsArr.sort(function(a, b) {
            var dateA = new Date(a.getElementsByClassName('item_date')[0].value).getTime();
            var dateB = new Date(b.getElementsByClassName('item_date')[0].value).getTime();
            return (dateA < dateB ? 1 : -1);
        });
    } else if(currentSort === 'du'){
        itemsArr.sort(function(a, b) {
            var dateA = new Date(a.getElementsByClassName('item_date')[0].value).getTime();
            var dateB = new Date(b.getElementsByClassName('item_date')[0].value).getTime();
            return (dateA > dateB ? 1 : -1);
        });
    }

    for (i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }
}