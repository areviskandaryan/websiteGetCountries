import {getFavoriteCountries} from "./services/favorites.js";
import {doGet} from "./helpers/request.js";
import {createCard} from "./helpers/createCard.js";
import {getErrorMessage} from "./helpers/createCard.js";
import {routes} from "./helpers/routes.js";
import {debounce} from "./helpers/debounce.js";

let page = "countries";
let divCards = document.querySelector(".divCards");
let navBarSearch = document.querySelector(".nav-bar_search");
let divtitle = document.querySelector(".title");
let finalArr = getFavoriteCountries();

let state = {
    countryName: "",
};

navBarSearch.addEventListener("input", (event) => {
    let countryName = event.target.value;
    if (countryName.trim() !== "") {
        state.countryName = event.target.value;
    }
    effectiveSearch(state.countryName);

})


let getCountries = (name) => {
    const url =
        name === "" ? routes.getAllCountries() : routes.getCountryByName(name);
    divCards.innerHTML = "Loading...";
    return doGet(url)
        .then((res) => {
            divCards.innerHTML = "";
            if (name) {
                divtitle.innerHTML = "<h1>SEARCH</h1>";
            }
            res.forEach(({flag, name, capital, region}, index) => {

                let newCard = createCard([name, capital, region], flag, index, page, finalArr);
                divCards.append(newCard);
                divCards.className = "divCards";

            })
        })
        .catch((err) => {
            let errorMessage = getErrorMessage(err);
            divCards.append(errorMessage);
        });


}
getCountries(state.countryName)

let effectiveSearch = debounce(getCountries, 500)



