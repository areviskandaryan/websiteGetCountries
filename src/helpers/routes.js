import {BASE_URL} from "../constatnts/api.js";

export let routes = {
    getAllCountries() {
        return `${BASE_URL}/all`;
    },
    getCountryByName(name) {
        return `${BASE_URL}/name/${name}`;
    },
};