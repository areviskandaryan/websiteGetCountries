import {getFavoriteCountries} from "./services/favorites.js";
import {createCard} from "./helpers/createCard.js";

let page = "favorites";
let finalArr = getFavoriteCountries();
let divCards = document.querySelector(".divCards");
let navBarSearch = document.querySelector(".nav-bar_search");
let divtitle = document.querySelector(".title");

let render = () => {
    if (finalArr.length) {
        finalArr.forEach(({flag, index, res}) => {
            let newCard = createCard(res, flag, index, page, finalArr);
            divCards.append(newCard);
            divCards.className = "divCards";
        })
    } else {
        let noInfo = document.createElement("p");
        noInfo.textContent = "There is no favorites!";
        noInfo.className = "noInfo";
        divCards.append(noInfo);
    }

}

render();


navBarSearch.addEventListener("input", (event) => {
    let countryName = event.target.value;
    if (countryName.trim() !== "") {
        searchCountries(event.target.value);
    }

})

let searchCountries = (searchName) => {
    divtitle.innerHTML = "<h1>SEARCH</h1>";
    divCards.innerHTML = "";
    finalArr.forEach(({flag, res: [name, capital, region]}) => {
        if (name.includes(searchName)) {
            let newCard = createCard([name, capital, region], flag);
            divCards.append(newCard);
            divCards.className = "divCards";
        }
    })

}


