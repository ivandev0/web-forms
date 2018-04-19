import ListConstructor from './ItemsList.js'
import {createItem} from "./dataBaseEngine.js";
import {changeDateSort} from "./sorting.js"
import DragManagerConstructor from './dragManager.js'

function init() {
    var dragManager = new DragManagerConstructor();
    document.addEventListener("mousedown", function (e) {
        dragManager.onMouseDown(e);
    });
    document.addEventListener("mouseup", function (e) {
        dragManager.onMouseUp(e);
    });

    document.addEventListener("mousemove", function (e) {
        dragManager.onMouseMove(e);
    });


    var list = new ListConstructor();

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", "http://localhost:8080/api/all", true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200){
            if(xmlHttp.responseText !== "[]"){
                for(var i = 0; i < JSON.parse(xmlHttp.responseText).length; i++){
                    //console.log(JSON.stringify(JSON.parse(xmlHttp.responseText)[i]));
                    list.createItem(JSON.parse(xmlHttp.responseText)[i], false);
                }
            }
        }
    };
    xmlHttp.send(null);

    document.forms.adder_form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var formData = new FormData(this);

        var item = {};
        formData.forEach(function(value, key){
            item[key] = value;
        });
        var itemWithId = list.createItem(item, true);
        createItem(itemWithId);
    });
    document.querySelector('.sort-date').onclick = function () {
        changeDateSort();
    };



}

document.addEventListener('DOMContentLoaded', init);