const speedEdit = document.getElementById("speed_edit");
const powerEdit = document.getElementById("power_edit");
const modelEdit = document.getElementById("model_edit");
const priceEdit = document.getElementById("price_edit");
const cars = JSON.parse(localStorage.getItem("cars"));

const chooseModel = document.querySelector(".choose_model");    
chooseModel.addEventListener('submit', function(e){
    const modelToEdit = document.getElementById('model_to_edit').value;
    const carToEdit = cars.find(function(car){
        return car.model === modelToEdit;
    });
    e.preventDefault();
    const editingForm = document.querySelector(".editing_form");
    editingForm.classList.add("active");
    speedEdit.value = carToEdit.max_speed;
    powerEdit.value = carToEdit.power;
    modelEdit.value = carToEdit.model;
    priceEdit.value = carToEdit.price;
})

const finishEditing = document.querySelector(".editing_form");
finishEditing.addEventListener('submit', function(e){
    e.preventDefault();
    let editedCar = cars.find(function(car){
        return car.model === modelEdit.value;
    })
    editedCar.max_speed = parseInt(speedEdit.value);
    editedCar.power = parseInt(powerEdit.value);
    editedCar.model = modelEdit.value;
    editedCar.price = parseInt(priceEdit.value);
    localStorage.setItem('cars', JSON.stringify(cars));
})
