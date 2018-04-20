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
export function changeExpensesSort() {
    if(currentSort === 'ed'){
        currentSort = 'eu';
    } else {
        currentSort = 'ed';
    }
    sort();
}

export function paste(item) {
    let list = document.querySelector('.list');
    if(list.children.length === 0){
        list.appendChild(item.root);
        return;
    }

    let node = list.firstChild;

    if(currentSort === 'dd') {
        while ((node = node.nextSibling)) {
            let date = node.querySelector('.item_date');
            let itemDate = item.root.querySelector('.item_date');
            if (new Date(itemDate.value).getTime() >= new Date(date.value).getTime()) {
                document.querySelector('.list').insertBefore(item.root, node);
                return;
            }
            document.querySelector('.list').appendChild(item.root);
        }
    } else if(currentSort === 'du'){
        while ((node = node.nextSibling)) {
            let date = node.querySelector('.item_date');
            let itemDate = item.root.querySelector('.item_date');
            if (new Date(itemDate.value).getTime() <= new Date(date.value).getTime()) {
                document.querySelector('.list').insertBefore(item.root, node);
                return;
            }
            document.querySelector('.list').appendChild(item.root);
        }
    } else if(currentSort === 'ed'){
        while ((node = node.nextSibling)) {
            let expenses = node.querySelector('.item_expenses');
            let itemExpenses = item.root.querySelector('.item_expenses');
            if (Number.parseFloat(itemExpenses.value) >= Number.parseFloat(expenses.value)) {
                document.querySelector('.list').insertBefore(item.root, node);
                return;
            }
            document.querySelector('.list').appendChild(item.root);
        }
    } else if(currentSort === 'eu'){
        while ((node = node.nextSibling)) {
            let expenses = node.querySelector('.item_expenses');
            let itemExpenses = item.root.querySelector('.item_expenses');
            if (Number.parseFloat(itemExpenses.value) <= Number.parseFloat(expenses.value)) {
                document.querySelector('.list').insertBefore(item.root, node);
                return;
            }
            document.querySelector('.list').appendChild(item.root);
        }
    }
}

export function sort() {

    let list = document.querySelector('.list');
    let nodes = list.children;

    let itemsArr = [];
    for (let i in nodes) {
        if (nodes[i].nodeType === 1) { // get rid of the whitespace text nodes
            itemsArr.push(nodes[i]);
        }
    }

    if(currentSort === 'dd') {
        itemsArr.sort(function(a, b) {
            let dateA = new Date(a.querySelector('.item_date').value).getTime();
            let dateB = new Date(b.querySelector('.item_date').value).getTime();
            return (dateA < dateB ? 1 : -1);
        });
    } else if(currentSort === 'du'){
        itemsArr.sort(function(a, b) {
            let dateA = new Date(a.querySelector('.item_date').value).getTime();
            let dateB = new Date(b.querySelector('.item_date').value).getTime();
            return (dateA > dateB ? 1 : -1);
        });
    } else if(currentSort === 'ed'){
        itemsArr.sort(function(a, b) {
            let expA = Number.parseFloat(a.querySelector('.item_expenses').value);
            let expB = Number.parseFloat(b.querySelector('.item_expenses').value);
            return (expA < expB ? 1 : -1);
        });
    } else if(currentSort === 'eu'){
        itemsArr.sort(function(a, b) {
            let expA = Number.parseFloat(a.querySelector('.item_expenses').value);
            let expB = Number.parseFloat(b.querySelector('.item_expenses').value);
            return (expA > expB ? 1 : -1);
        });
    }

    for (let i = 0; i < itemsArr.length; ++i) {
        list.appendChild(itemsArr[i]);
    }
}