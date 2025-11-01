'use strict';
const userBtn = document.getElementById("user-btn");
const wrench = document.getElementById("wrench");
const users = document.getElementById("users");
const car = document.getElementById("car");
const list = document.getElementById("list");

//

const adminDiv = document.querySelector(".admin");
const menuDiv = document.querySelector(".menu");
const searchDiv = document.querySelector(".search");
const settingsDiv = document.querySelector(".settings");
const carsDiv = document.querySelector(".cars");
const usersDataDiv = document.getElementById("usersData");

const user_table_info = document.getElementById("user_table_info");

const create_post_element_div = document.querySelector(".create_post_element_div");
const delete_post_element = document.querySelector(".delete_post_element");

//

const admin_password = document.getElementById("admin_password");
const admin_firstName = document.getElementById("admin_firstName");
const admin_lastName = document.getElementById("admin_lastName");
const admin_email = document.getElementById("admin_email");

//
create_post_element_div.style.display = "none";
delete_post_element.style.display = "none";
menuDiv.style.display = "none";
adminDiv.style.display = "flex";
usersDataDiv.style.display = "none";

userBtn.addEventListener("click", () => {
    create_post_element_div.style.display = "none";
    delete_post_element.style.display = "none";
    menuDiv.style.display = "none";
    carsDiv.style.display = "none";
    searchDiv.style.display = "none";
    adminDiv.style.display = "flex";
    usersDataDiv.style.display = "none";
});

wrench.addEventListener("click", () => {
    create_post_element_div.style.display = "flex";
    delete_post_element.style.display = "flex";
    menuDiv.style.display = "none";
    carsDiv.style.display = "none";
    searchDiv.style.display = "none";
    adminDiv.style.display = "none";
    usersDataDiv.style.display = "none";
});

car.addEventListener("click", () => {
    create_post_element_div.style.display = "none";
    delete_post_element.style.display = "none";
    menuDiv.style.display = "flex";
    carsDiv.style.display = "grid";
    searchDiv.style.display = "flex";
    adminDiv.style.display = "none";
    usersDataDiv.style.display = "none";
});

users.addEventListener("click", () => {
    create_post_element_div.style.display = "none";
    delete_post_element.style.display = "none";
    menuDiv.style.display = "none";
    carsDiv.style.display = "none";
    searchDiv.style.display = "none";
    adminDiv.style.display = "none";
    usersDataDiv.style.display = "flex";
});

//Пользователи

async function getUsersData() {
    try {
        let response = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });
        let users = await response.json();
        return users
    } catch (error) {
        return [false, "Ошибка загрузки!"];
    }
}

async function showUsers() {

    let usersData = await getUsersData();

    if (usersData.length == 0) {
        usersDataDiv.innerHTML = "Пользователей пока не сушествует!";
        return false;
    }

    if (!usersData[0]) {
        usersDataDiv.innerHTML = usersData[1];
        return false;
    }

    usersData.forEach(user => {
        let userCard = createUsersCard(user);
        tbodyContainer.append(userCard);
    });

}

const tbodyContainer = document.getElementById("tbodyContainer");

function createUsersCard(user) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.lastName}</td>
        <td>${user.firstName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.rol}</td>
    `
    return tr
}

showUsers();

//Удаление пользователя
const delete_user_element_form = document.getElementById("delete_user_element");
const delete_user_element_id = document.getElementById("delete_user_element_id");
const delete_user_element_btn = document.getElementById("delete_user_element_btn");

delete_user_element_btn.addEventListener("click", (event) => {
    if (confirm(`Вы точно хотите удалить ${delete_user_element_id.value}`)) {
        event.preventDefault();
        fetch(`http://localhost:3000/users/${delete_user_element_id.value}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    alert(`Элемент ID -${delete_user_element_id.value}, успешно удален!`);
                } else {
                    alert(`Ошибка при удалении элемента - ${delete_user_element_id.value}`);
                }
            })
            .catch(error => {
                alert(`Ошибка - ${response.status, error}`)
            })
    } else {
        alert("Удаление отменено!");
    }
});


let carsContainer = document.getElementById("cars");

// Сохронения данных

const createPostElement = document.querySelector(".create_post_element");

let carsElement = document.getElementById("carsElement");

createPostElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(createPostElement);
    const formDataObject = Object.fromEntries(formData);
    console.log(formData);

    fetch('http://localhost:3000/cars', {
        method: 'post',
        body: JSON.stringify({
            ...formDataObject
        })
    });
});

// Получения данных
async function getCarsData() {
    try {
        let response = await fetch("http://localhost:3000/cars", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });
        let cars = await response.json();
        return cars;
    } catch (error) {
        return [false, "Ошибка загрузки!"];
    }
}

async function showCars(str) {

    let carsData = await getCarsData();

    if (carsData.length == 0) {
        carsContainer.innerHTML = "Машини пока не существует!";
        return false;
    }

    if (!carsData[0]) {
        carsContainer.innerHTML = carsData[1];
        return false;
    }

    carsData.forEach(car => {
        if (car.brand.toLowerCase().includes(str)) {
            let carCard = createCarsCard(car);
            carsContainer.append(carCard);
        }
    });

}

function createCarsCard(car) {
    let div = document.createElement("div");
    div.classList.add("carsDetail");

    div.innerHTML = `
    <div class="headerCars">
        <p class="id">${car.id}</p>
        <img src="${car.image}" alt="logo" id="image">
        <p class="brand">${car.brand}</p>
    </div>
    <div class="section">
        <div class="text">
            <p>Тип двигателя</p>
            <p class="text_size">${car.engine_type[0]}</p>
        </div>
        <div class="text">
            <p>Технологии двигателья</p>
            <p class="text_size">${car.engine_technologies[0]}</p>
        </div>
    </div>
    `;

    let btn_container = document.createElement("div");
    btn_container.classList.add("btn_container");

    let button = document.createElement("button");
    button.innerText = "Подробнее";
    button.classList.add("button");
    button.addEventListener("click", () => {
        console.log(window.location);
        window.location.href = `../site/detail_car.html?id=${car.id}`;
    });
    btn_container.append(button);
    div.append(btn_container);
    return div;
}
showCars("");
const search = document.getElementById("search");
search.addEventListener("input", () => {
    carsContainer.innerHTML = "";
    let value = search.value.toLowerCase().trim();
    showCars(value);
});

async function getUserData() {
    try {
        let response = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        let users = await response.json();
        return users;
    } catch (error) {
        return [false, "Ошибка загрузки!"];
    }
}

async function getInputAdmin() {
    let usersData = await getUserData();

    if (usersData.users == 0) {
        admin_name.innerHTML = "Имя пока не существует!";
        admin_password.innerHTML = "Пороль пока не существует!";
        return false;
    }

    usersData.forEach(user => {
        if (user.rol == "Admin") {
            admin_firstName.innerHTML = user.firstName
            admin_lastName.innerHTML = user.lastName
            admin_email.innerHTML = user.email
            admin_password.innerHTML = user.password
        }
    });
}

getInputAdmin();

//Удаления данных
const delete_post_element_form = document.getElementById("delete_post_element");
const delete_post_element_id = document.getElementById("delete_post_element_id");
const delete_post_element_btn = document.getElementById("delete_post_element_btn");

delete_post_element_btn.addEventListener("click", (event) => {
    if (confirm(`Вы точно хотите удалить ${delete_post_element_id.value}`)) {
        event.preventDefault();
        fetch(`http://localhost:3000/cars/${delete_post_element_id.value}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    alert(`Элемент ID -${delete_post_element_id.value}, успешно удален!`);
                } else {
                    alert(`Ошибка при удалении элемента - ${delete_post_element_id.value}`);
                }
            })
            .catch(error => {
                alert(`Ошибка - ${response.status, error}`)
            })
    } else {
        alert("Удаление отменено!");
    }
});