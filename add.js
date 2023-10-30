document.addEventListener('DOMContentLoaded', function () {
    const get_url = 'http://localhost:5000/get';
    const form = document.querySelector('.add_car_form');
    const url = 'http://localhost:5000/add';
    fetch(get_url)
        .then(response => response.json())
        .then(cars => {
            console.log('Data received:', cars);

            form.addEventListener('submit', function (e) {
                e.preventDefault();
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
                cars.push(car);
                console.log(cars);
                
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(car),
                })
                .then(response => {
                    console.log('Car added successfully:', response.json());
                })
                .catch(error => {
                    console.error('Some error occured:', error);
                });
                
                
                document.getElementById('add_car_speed').value = '';
                document.getElementById('add_car_power').value = '';
                document.getElementById('add_car_model').value = '';
                document.getElementById('add_car_price').value = '';
            }) 
            
        })
        .catch(error =>{
            console.error('Some error occured:', error);
        });

    
});