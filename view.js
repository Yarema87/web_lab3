let cars = [
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.add_car_form');
    const url = 'http://localhost:5000/view';
    const get_url = 'http://localhost:5000/get';

    fetch(get_url)
        .then(response => response.json())
        .then(cars => {
            console.log('Data received:', cars); 
            displayObjectsOnPage(cars);
            
            function renderCars(){
                let containers = document.querySelectorAll(".car_container");
                for (let i in cars){
                    let container = containers[i];
                    let speed_div = container.querySelector(".speed");
                    let model_div = container.querySelector(".model");
                    let power_div = container.querySelector(".power");
                    let price_div = container.querySelector(".price");
                    speed_div.innerHTML = null;
                    model_div.innerHTML = null;
                    power_div.innerHTML = null;
                    price_div.innerHTML = null;
                }
                displayObjectsOnPage(cars);
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

            cars.forEach(car => {
                console.log(car);
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(car),
                })
                .then(response => {
                    console.log('Car added successfully:', response);
                })
                .catch(error => {
                    console.error('Some error occured:', error);
                });
            });
        })
        .catch(error =>{
            console.error('Some error occured:', error);
        });
    

    
});






function displayObjectsOnPage(objects) {
    const allCars = document.querySelector(".cars");
    allCars.innerHTML = ''
    for (let index = 0; index < objects.length; index++) {
        const displayElement = document.createElement("div");
        displayElement.id = "displayObject";
        displayElement.classList.add("car_container");
        displayElement.innerHTML = '';
        const object = objects[index];
        const objectDiv = document.createElement('div');
        objectDiv.innerHTML = `
            <div class="speed">
            <p>Max speed: ${object.max_speed}</p>
            </div>
            <div class="power">
            <p>Power: ${object.power}</p>
            </div>
            <div class="model">
            <p>Model: ${object.model}</p>
            </div>
            <div class="price">
            <p>Price: ${object.price}</p>
            </div>
        `;
        displayElement.appendChild(objectDiv);
        
        allCars.appendChild(displayElement)
    }
    
}

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
