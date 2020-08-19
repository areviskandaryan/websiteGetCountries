export function getFavoriteCountries() {
    return localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
}