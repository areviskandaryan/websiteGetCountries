import {getFavoriteCountries} from "../services/favorites.js";
import {addItemToLocalStorage} from "./localStorage.js";

let finalArr = getFavoriteCountries();

export let removeEl = (index) => {
    finalArr = finalArr.filter(el => el.index !== index);
    addItemToLocalStorage('favorites', finalArr);
}

export let addEl = (el) => {
    finalArr.push(el);
    addItemToLocalStorage('favorites', finalArr);
}