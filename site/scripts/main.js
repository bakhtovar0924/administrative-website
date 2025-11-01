'use strict';

const constents = document.getElementById("contents");
let carsContainer = document.getElementById("cars");

const extendedSearch = document.getElementById("extendedSearch");

const extendedSearchDiv = document.getElementById("extendedSearchDiv");
const searchInputExtended = document.getElementById("searchInputExtended");
const extendedSearchSelect = document.getElementById("extendedSearchSelect");

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
        <img src="" alt="logo" id="image">
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
        window.location.href = `detail_car.html?id=${car.id}`;
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

extendedSearch.addEventListener("click", () => {
    extendedSearchDiv.classList.toggle("flex");
});