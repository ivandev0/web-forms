let HttpStatus = {
    success : 200,
    found : 302,
    notFound: 404,
    created: 201
};


function openConnection(url, method, data, handler) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === XMLHttpRequest.DONE){
            if(handler){
                handler.call(this, xmlHttp.status, xmlHttp.responseText);
            } else {
                if(xmlHttp.status !== HttpStatus.success){
                    alert("Ошибка на сервере. Пожалуйста попробуйте позже.");
                }
            }
        }
    };
    xmlHttp.send(JSON.stringify(data));


}

export function deleteItem(itemData) {
    //let url = 'http://localhost:8080/api/delete';
    let url = 'api/delete';
    openConnection(url, "POST", itemData);
}

export function createItem(itemData) {
    //let url = 'http://localhost:8080/api/add';
    let url = 'api/add';
    openConnection(url, "POST", itemData);
}

export function updateItem(itemData) {
    //let url = 'http://localhost:8080/api/update';
    let url = 'api/update';
    openConnection(url, "POST", itemData);
}

export function signIn(userData, successHandler, failHandler) {
    let url = 'signIn';
    openConnection(url, "POST", userData, function (statusCode, response) {
        switch (statusCode){
            case HttpStatus.found:
                successHandler.call(this, response);
                break;
            case HttpStatus.notFound:
                failHandler.call(this, response);
                break;
            default:
                alert("Ошибка на сервере. Пожалуйста попробуйте позже.");
        }
    });
}

export function signUp(userData, successHandler, failHandler) {
    let url = 'signUp';
    openConnection(url, "POST", userData, function (statusCode, response) {
        switch (statusCode){
            case HttpStatus.found:
                failHandler.call(this, response);
                break;
            case HttpStatus.created:
                successHandler.call(null);
                break;
            default:
                alert("Ошибка на сервере. Пожалуйста попробуйте позже.");
        }
    });
}

export function checkSession() {
    let url = 'check';
    openConnection(url, "POST", null, function (statusCode) {
        switch (statusCode){
            case HttpStatus.found:
                document.location.href = 'index.html';
                break;
            case HttpStatus.notFound:
                break;
        }
    });
}

export function logOut() {
    let url = 'logOut';
    openConnection(url, 'POST', null, function (statusCode) {
       if(statusCode === HttpStatus.success){
           document.location.href = 'identification.html';
       }
    });
}