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

function total_price(){
    let container = document.querySelector(".total");
    let total_price = 0;
    for (let i of cars){
        total_price += i.price;
    }
    let total_price_paragraph = document.createElement("p");
    total_price_paragraph.textContent = ("Total price: " + total_price);
    container.appendChild(total_price_paragraph);
}
total_price();

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

function searchCar(){
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultDiv = document.getElementById("result");
    searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    resultDiv.classList.toggle('active');
    const targetModel = searchInput.value;
    const foundCar = cars.find(function(car) {
        return car.model === targetModel;
    });
    if (foundCar) {
        resultDiv.textContent = `Model: ${foundCar.model}\n
        Max speed: ${foundCar.max_speed}\n
        Power: ${foundCar.power}\n
        Price: ${foundCar.price}`;
    } else {
        resultDiv.textContent = 'Car not found.';
    }
    });
}
searchCar();

function createNewCar(){
    const speedValue = parseInt(document.getElementById("add_car_speed").value);
    const powerValue = parseInt(document.getElementById("add_car_power").value);
    const modelValue = document.getElementById("add_car_model").value;
    const priceValue = parseInt(document.getElementById("add_car_price").value);
    const newCar = {
        power: powerValue,
        model: modelValue,
        max_speed: speedValue,
        price: priceValue
    }
    cars.push(newCar);
    const newOuterContainer = document.createElement("div");
    newOuterContainer.classList.add("car_container");
    const allCars = document.querySelector(".cars");
    allCars.appendChild(newOuterContainer);
    const newSpeedContainer = document.createElement("div");
    const newPowerContainer = document.createElement("div");
    const newModelContainer = document.createElement("div");
    const newPriceContainer = document.createElement("div");
    newSpeedContainer.classList.add('speed');
    newPowerContainer.classList.add('power');
    newModelContainer.classList.add('model');
    newPriceContainer.classList.add('price');
    newOuterContainer.appendChild(newSpeedContainer);
    newOuterContainer.appendChild(newPowerContainer);
    newOuterContainer.appendChild(newModelContainer);
    newOuterContainer.appendChild(newPriceContainer);
    const newSpeedParagraph = document.createElement("p");
    const newPowerParagraph = document.createElement("p");
    const newModelParagraph = document.createElement("p");
    const newPriceParagraph = document.createElement("p");
    newSpeedParagraph.textContent = "Max speed: " + newCar.max_speed;
    newPowerParagraph.textContent = "Power: " + newCar.power;
    newModelParagraph.textContent = "Model: " + newCar.model;
    newPriceParagraph.textContent = "Price: " + newCar.price;
    newSpeedContainer.appendChild(newSpeedParagraph);
    newPowerContainer.appendChild(newPowerParagraph);
    newModelContainer.appendChild(newModelParagraph);
    newPriceContainer.appendChild(newPriceParagraph);
}

const addButton = document.querySelector(".add_car_button");
const addForm = document.querySelector(".add_car_form");
const confirmButton = document.querySelector(".confirm_add");
addButton.addEventListener("click", function(){
    addForm.classList.add('active');
})
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.add_car_form').addEventListener('submit', function (e){
        e.preventDefault();
        createNewCar();
    })
})


