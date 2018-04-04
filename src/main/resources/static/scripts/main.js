import ListConstructor from './ItemsList.js'
import {createItem} from "./dataBaseEngine.js";

function init() {
    var list = new ListConstructor();

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", "http://localhost:8080/api/all", true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
            if(xmlHttp.responseText !== "[]"){
                for(var i = 0; i < JSON.parse(xmlHttp.responseText).length; i++){
                    //console.log(JSON.stringify(JSON.parse(xmlHttp.responseText)[0]));
                    list.createItem(JSON.parse(xmlHttp.responseText)[i]);
                }
            }
        }
    };
    xmlHttp.send(null);

    document.getElementById('mainForm').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var item = {
            date: document.querySelector('.inputDate').value,
            expenses: document.querySelector('.inputExpenses').value,
            comment: document.querySelector('.inputComment').value
        };
        var itemWithId = list.createItem(item);
        createItem(itemWithId);
    });
}

document.addEventListener('DOMContentLoaded', init);