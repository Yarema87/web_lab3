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
    let carList = document.getElementById("cars");
    while(carList.firstChild){
        carList.removeChild(carList.firstChild)
    }
    displayCars();
} 
function sortCarsByPower(){
    cars.sort(function(a, b){
        return b.power - a.power;
    });
    renderCars();
}
const sortButton = document.getElementById("sort");
sortButton.addEventListener("click", sortCarsByPower);