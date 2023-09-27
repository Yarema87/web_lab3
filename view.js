const cars = [
    {
        power: 570,
        model: "Ford Mustang",
        max_speed: 250,
        price: 13000
    },
    {
        power: 330,
        model: "Renault Logan",
        max_speed: 200,
        price: 9500
    },
    {
        power: 340,
        model: "Skoda Fabia",
        max_speed: 195,
        price: 5900
    }
];
function displayCars(){
    let containers = document.querySelectorAll(".car_container");
    for (let i in cars){
        let car = cars[i];
        let container = containers[i];
        let speed_div = container.querySelector(".speed");
        let speed_paragraph = document.createElement("p");
        speed_paragraph.textContent = "Max speed: " + car.max_speed;
        speed_div.appendChild(speed_paragraph);
        let model_div = container.querySelector(".model");
        let model_paragraph = document.createElement("p");
        model_paragraph.textContent = "Model: " + car.model;
        model_div.appendChild(model_paragraph);
        let power_div = container.querySelector(".power");
        let power_paragraph = document.createElement("p");
        power_paragraph.textContent = "Power: " + car.power;
        power_div.appendChild(power_paragraph);
        let price_div = container.querySelector(".price");
        let price_paragraph = document.createElement("p");
        price_paragraph.textContent = "Price: " + car.price;
        price_div.appendChild(price_paragraph);
    };
}
displayCars();

let total_price = 0;
for (let i of cars){
    total_price += i.price;
}
document.write("Total price: " + total_price);

function renderCars(){
    let containers = document.querySelectorAll(".car_container");
    for (let i in cars){
        let container = containers[i];
        let speed_div = container.querySelector(".speed");
        let model_div = container.querySelector(".model");
        let power_div = container.querySelector(".power");
        let price_div = container.querySelector(".price");
        speed_div.textContent = null;
        model_div.textContent = null;
        power_div.textContent = null;
        price_div.textContent = null;
    }
    displayCars();
} 
function sortCarsByPowerDesc(){
    cars.sort(function(a, b){
        return b.power - a.power;
    });
    renderCars();
}
function sortCarsByPowerAsc(){
    cars.sort(function(a, b){
        return a.power - b.power;
    });
    renderCars();
}
function sortCarsByPriceDesc(){
    cars.sort(function(a, b){
        return b.price - a.price;
    });
    renderCars();
}
function sortCarsByPriceAsc(){
    cars.sort(function(a, b){
        return a.price - b.price;
    });
    renderCars();
}
function sortCarsBySpeedDesc(){
    cars.sort(function(a, b){
        return b.max_speed - a.max_speed;
    });
    renderCars();
}
function sortCarsBySpeedAsc(){
    cars.sort(function(a, b){
        return a.max_speed - b.max_speed;
    });
    renderCars();
}
const PowerDes = document.getElementById("power__des");
PowerDes.addEventListener("click", sortCarsByPowerDesc);
const PowerAsc = document.getElementById("power__asc");
PowerAsc.addEventListener("click", sortCarsByPowerAsc);
const PriceDes = document.getElementById("price__des");
PriceDes.addEventListener("click", sortCarsByPriceDesc);
const PriceAsc = document.getElementById("price__asc");
PriceAsc.addEventListener("click", sortCarsByPriceAsc);
const SpeedDes = document.getElementById("speed__des");
SpeedDes.addEventListener("click", sortCarsBySpeedDesc);
const SpeedAsc = document.getElementById("speed__asc");
SpeedAsc.addEventListener("click", sortCarsBySpeedAsc);
const pointer = document.querySelector(".pointer");
const list = document.querySelectorAll(".sort li");
pointer.addEventListener('click', () => {
    list.forEach((item) => {item.classList.toggle('active');
});
});