
function openConnection(url, method, data) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, url, false);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send(JSON.stringify(data));
}

export function deleteItem(itemData) {
    var url = 'http://localhost:8080/api/delete';
    openConnection(url, "POST", itemData);
}

export function createItem(itemData) {
    var url = 'http://localhost:8080/api/add';
    openConnection(url, "POST", itemData);
}

export function updateItem(itemData) {
    var url = 'http://localhost:8080/api/update';
    openConnection(url, "POST", itemData);
}