import ListConstructor from './ItemsList.js'
import {createItem, logOut} from "./dataBaseEngine.js";
import {changeDateSort, changeExpensesSort} from "./sorting.js"
import DragManagerConstructor from './DragManager.js'

function init() {
    let userId = getCookie("userId");
    if(!userId) {
        document.location.href = "/";
    }

    let dragManager = new DragManagerConstructor();
    document.addEventListener("mousedown", function (e) {
        dragManager.onMouseDown(e);
    });
    document.addEventListener("mouseup", function (e) {
        dragManager.onMouseUp(e);
    });

    document.addEventListener("mousemove", function (e) {
        dragManager.onMouseMove(e);
    });


    let list = new ListConstructor();

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", "api/all", true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200){
            if(xmlHttp.responseText !== "[]"){
                for(let i = 0; i < JSON.parse(xmlHttp.responseText).length; i++){
                    //console.log(JSON.stringify(JSON.parse(xmlHttp.responseText)[i]));
                    list.createItem(JSON.parse(xmlHttp.responseText)[i], false);
                }
            }
        }
    };
    xmlHttp.send(JSON.stringify(userId));


    document.querySelector('.adder_form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        let formData = new FormData(this);

        let item = {};
        formData.forEach(function(value, key){
            item[key] = value;
        });
        let itemWithId = list.createItem(item, true);
        itemWithId['userId'] = userId;
        createItem(itemWithId);
    });
    document.querySelector('.sort-date').onclick = function () {
        changeDateSort();
    };
    document.querySelector('.sort-expenses').onclick = function () {
        changeExpensesSort();
    };

    document.querySelector('.button').addEventListener('click', function () {
        logOut();
    });
}

document.addEventListener('DOMContentLoaded', init);