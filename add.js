const form = document.querySelector('.add_car_form');
const url = 'http://localhost:5000/add'
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
    //let cars = JSON.parse(localStorage.getItem('cars')) || [];
    fetch(url)
        .then(response => response.json())
        .then(cars => {
            console.log('Data received:', cars);
            cars.push(car);
            for (car of cars){
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(car)
                })
                .then(response =>{
                    console.log('Car added successfully', response);
                })
                .catch(error => {
                    console.error('Some error occured', error);
                });
            };
        
        })
        .catch(error =>{
            console.error('Some error occured:', error);
        });
        
    //localStorage.setItem('cars', JSON.stringify(cars));
    
    document.getElementById('add_car_speed').value = '';
    document.getElementById('add_car_power').value = '';
    document.getElementById('add_car_model').value = '';
    document.getElementById('add_car_price').value = '';

    window.location.href = "view.html";
});