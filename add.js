const form = document.querySelector('.add_car_form');
form.addEventListener('submit', function (e) {
    const max_speed = parseInt(document.getElementById('add_car_speed').value);
    const power = parseInt(document.getElementById('add_car_power').value);
    const model = document.getElementById('add_car_model').value;
    const price = parseInt(document.getElementById('add_car_price').value);

    const car = {
        max_speed: max_speed,
        power: power,
        model: model,
        price: price
    };
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));

    document.getElementById('add_car_speed').value = '';
    document.getElementById('add_car_power').value = '';
    document.getElementById('add_car_model').value = '';
    document.getElementById('add_car_price').value = '';

    window.location.href = "view.html";
});