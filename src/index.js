import {validate} from "./helpers/validation.js"
import {btn} from "./helpers/validation.js"

let inputName = document.querySelector(".inputName");
let inputPassword = document.querySelector(".inputPassword");


inputName.addEventListener("change", (e) => {
    validate(e, inputName, 0);
})


inputPassword.addEventListener("change", (e) => {
    validate(e, inputPassword, 1);
})


btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = 'countries.html';
})

