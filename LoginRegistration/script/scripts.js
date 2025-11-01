'use strict';
let classLogin = document.querySelector(".login");
let classRegister = document.querySelector(".register");
classLogin.style.display = "none";
classRegister.style.display = "block";
let documentName = document.querySelector(".titleHead");

///|\\\

const create_users = document.getElementById("create_users");

//register inputs
const lastName = document.querySelector(".lastName");
lastName.requestPointerLock
const firstName = document.getElementById("firstName");
firstName.requestPointerLock
const emailReg = document.getElementById("emailReg");
emailReg.requestPointerLock
const passwordReg = document.getElementById("passwordReg");
passwordReg.requestPointerLock
const register = document.getElementById("register");
console.log(register);
const InputRol = document.getElementById("InputRol");
InputRol.value = "Users";
InputRol.style.display = "none";

//login inputs
const passwordLog = document.getElementById("passwordLog");
passwordLog.requestPointerLock
const emailLog = document.getElementById("emailLog");
emailLog.requestPointerLock
console.log(emailLog);
function getRegister() {
    classLogin.style.display = "none";
    classRegister.style.display = "block";
    documentName.innerHTML = `Shop | Register`
}

function getLogin() {
    classRegister.style.display = "none";
    classLogin.style.display = "block";
    documentName.innerHTML = `Shop | Login`
}

let helloWelcomes = document.querySelectorAll(".helloWelcomes");

firstName.addEventListener("input", () => {
    helloWelcomes[0].innerHTML = firstName.value
});

emailLog.addEventListener("input", () => {
    helloWelcomes[1].innerHTML = emailLog.value
});

register.addEventListener("click", () => {
    if (passwordReg.value.length == 0 &&
        lastName.value.length == 0 &&
        emailReg.value.length == 0 &&
        firstName.value.length == 0) {
        alert("Заполнитье поля!");
        return false
    } else {
        const formData = new FormData(create_users);
        const formDataObject = Object.fromEntries(formData);
        window.document.location.href = "../site/index.html"
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify({
                ...formDataObject
            })
        });
    }
});