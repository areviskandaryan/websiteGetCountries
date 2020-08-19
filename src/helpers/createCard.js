import {addEl, removeEl} from "./array.helper.js";

export let createCard = (res, flag, index, page, finalArr) => {
    let cardItem = document.createElement("div");
    let imgFlag = document.createElement("img");
    let cardButton = document.createElement("button");
    let infoItem = document.createElement("div");

    res.forEach((value) => {
        imgFlag.src = flag;
        imgFlag.className = "imgFlag";
        cardItem.append(imgFlag);
        let infoName = document.createElement("p");
        infoName.textContent = value;
        infoName.className = "infoName";
        infoItem.append(infoName);
        infoItem.className = "infoItem";
        infoItem.append(cardButton);
        cardItem.className = "cardItem";
        cardItem.append(infoItem);
        cardButton.className = "card-button";
        if (page === "countries") {
            cardButton.textContent = "Add to favorites";
            if (finalArr.length > 0) {
                finalArr.forEach((el) => {
                    if (el.index == index) {
                        cardButton.textContent = "Remove from favorites";
                        return
                    }
                })

            }


        } else {
            cardButton.textContent = "Remove from favorites";
        }


    })


    cardButton.addEventListener("click", () => {
        cardButton.textContent === "Add to favorites" ? addEl({res, flag, index}) : removeEl(index);
        cardButton.textContent = cardButton.textContent === "Add to favorites" ? "Remove from favorites" : "Add to favorites";

    })
    return cardItem;
}


export let getErrorMessage = (err) => {
    let errorMessage = document.createElement("p");
    errorMessage.textContent = err.message;
    errorMessage.className = "errorMessage";
    return errorMessage;

}