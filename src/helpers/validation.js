let registerContainer = document.querySelectorAll(".register-container");
let errorName = document.createElement("p");
let errorPass = document.createElement("p");
let form = {
    inputName: false,
    inputPassword: false,
};

export let btn = document.querySelector(".btn");

export let validate = (e, element, index) => {
    if (element.value.trim().length < 5) {
        if (index === 0) {
            form.inputName = false;
            errorName.textContent = "Please enter at least 5 symbols";
            errorName.className = "error";
            registerContainer[index].append(errorName);
        } else {
            form.inputPassword = false;
            errorPass.textContent = "Please enter at least 5 symbols";
            errorPass.className = "error";
            registerContainer[index].append(errorPass);
        }
    } else {
        if (index === 0) {
            form.inputName = true;
            errorName.className = "error-default";
        } else {
            form.inputPassword = true;
            errorPass.className = "error-default";
        }
    }

    removeDisabledAttr();
}

let removeDisabledAttr = () => {
    if (form.inputName && form.inputPassword) {
        btn.removeAttribute("disabled");
        btn.style.cursor = 'pointer';
    } else {
        btn.setAttribute("disabled", "true");
        btn.style.cursor = 'not-allowed';
    }
}