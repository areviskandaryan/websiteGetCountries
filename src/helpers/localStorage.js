export function addItemToLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}