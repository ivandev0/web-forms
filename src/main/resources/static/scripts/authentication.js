import {signIn} from "./dataBaseEngine.js";
import {signUp} from "./dataBaseEngine.js";

function init() {

    let signInFrom = document.querySelector('.signIn-form');
    if(signInFrom){

        signInFrom.addEventListener('submit', function (ev) {
            ev.preventDefault();

            let formData = new FormData(this);

            let user = {};
            formData.forEach(function(value, key){
                user[key] = value;
            });

            reset();
            signIn(user, function (id) {
                deleteCookie('userId');
                setCookie('userId', id, 1);
                document.location.href = "index.html";
            }, function (message) {
                document.querySelector('.authError').innerHTML = message;
                document.querySelector('.authError').classList.remove('hide');
            });
        });
    }

    let signUpFrom = document.querySelector('.signUp-form');
    if(signUpFrom){

        signUpFrom.addEventListener('submit', function (ev) {
            ev.preventDefault();

            let formData = new FormData(this);

            let user = {};
            formData.forEach(function(value, key){
                user[key] = value;
            });

            signUp(user, function () {
                signInOn();
                document.querySelector('.success').classList.remove('hide');
            }, function (message) {
                document.querySelector('.regError').innerHTML = message;
                document.querySelector('.regError').classList.remove('hide');
            });
        });
    }

}


document.addEventListener('DOMContentLoaded', init);