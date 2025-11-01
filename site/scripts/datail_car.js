'use strict';

const detail = document.querySelector(".detail");
const info = document.querySelector(".info");

const brand = document.getElementById("brand");
const engine_type = document.getElementById("engine_type");
const engine_displacement = document.getElementById("engine_displacement");
const engine_power = document.getElementById("engine_power");
const engine_technologies = document.getElementById("engine_technologies");
const engine_resource = document.getElementById("engine_resource");
const engine_fuel_consumption = document.getElementById("engine_fuel_consumption");
const transmission_type = document.getElementById("transmission_type");
const transmission_drive = document.getElementById("transmission_drive");
const transmission_gears = document.getElementById("transmission_gears");
const transmission_differential_lock = document.getElementById("transmission_differential_lock");
const suspension_front = document.getElementById("suspension_front");
const suspension_rear = document.getElementById("suspension_rear");
const suspension_stabilizers = document.getElementById("suspension_stabilizers");
const suspension_ground_clierance = document.getElementById("suspension_ground_clierance");
const body_type = document.getElementById("body_type");
const body_materials = document.getElementById("body_materials");
const body_corrosion_protection = document.getElementById("body_corrosion_protection");
const body_aerodynamics = document.getElementById("body_aerodynamics");
const electrical_systems = document.getElementById("electrical_systems");
const electrical_battery = document.getElementById("electrical_battery");
const electrical_generator = document.getElementById("electrical_generator");
const interior_materials = document.getElementById("interior_materials");
const interior_options = document.getElementById("interior_options");
const interior_multimedia = document.getElementById("interior_multimedia");
const safety_active = document.getElementById("safety_active");
const safety_passive = document.getElementById("safety_passive");
const safety_additional = document.getElementById("safety_additional");
const ecology_co2emissions = document.getElementById("ecology_co2emissions");
const ecology_eco_class = document.getElementById("ecology_eco_class");
const ecology_eco_materials = document.getElementById("ecology_eco_materials");


let params = new URLSearchParams(window.location.search);
let id = params.get("id");

async function getBookDetail() {
    try {
        let response = await fetch(`http://localhost:3000/cars/${id}`, {
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

async function showCarsDetails() {
    let carsDetail = await getBookDetail();
    brand.innerHTML = carsDetail.brand;
    engine_type.innerHTML = carsDetail.engine_type;
    engine_displacement.innerHTML = carsDetail.engine_displacement;
    engine_power.innerHTML = carsDetail.engine_power;
    engine_technologies.innerHTML = carsDetail.engine_technologies;
    engine_resource.innerHTML = carsDetail.engine_resource;
    engine_fuel_consumption.innerHTML = carsDetail.engine_fuel_consumption;
    transmission_type.innerHTML = carsDetail.transmission_type;
    transmission_drive.innerHTML = carsDetail.transmission_drive;
    transmission_gears.innerHTML = carsDetail.transmission_gears;
    transmission_differential_lock.innerHTML = carsDetail.transmission_differential_lock;
    suspension_front.innerHTML = carsDetail.suspension_front;
    suspension_rear.innerHTML = carsDetail.suspension_rear;
    suspension_stabilizers.innerHTML = carsDetail.suspension_stabilizers;
    suspension_ground_clierance.innerHTML = carsDetail.suspension_ground_clierance;
    body_type.innerHTML = carsDetail.body_type;
    body_materials.innerHTML = carsDetail.body_materials;
    body_corrosion_protection.innerHTML = carsDetail.body_corrosion_protection;
    body_aerodynamics.innerHTML = carsDetail.body_aerodynamics;
    electrical_systems.innerHTML = carsDetail.electrical_systems;
    electrical_battery.innerHTML = carsDetail.electrical_battery;
    electrical_generator.innerHTML = carsDetail.electrical_generator;
    interior_materials.innerHTML = carsDetail.interior_materials;
    interior_options.innerHTML = carsDetail.interior_options;
    interior_multimedia.innerHTML = carsDetail.interior_multimedia;
    safety_active.innerHTML = carsDetail.safety_active;
    safety_passive.innerHTML = carsDetail.safety_passive;
    safety_additional.innerHTML = carsDetail.safety_additional;
    ecology_co2emissions.innerHTML = carsDetail.ecology_co2emissions;
    ecology_eco_class.innerHTML = carsDetail.ecology_eco_class;
    ecology_eco_materials.innerHTML = carsDetail.ecology_eco_materials;
}

showCarsDetails();