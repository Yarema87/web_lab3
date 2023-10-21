from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
#cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///car.db'
db = SQLAlchemy(app)

class Car(db.Model):
    max_speed = db.Column(db.Integer)
    power = db.Column(db.Integer)
    model = db.Column(db.String(50), primary_key = True)
    price = db.Column(db.Integer)

@app.route('/view', methods=['POST'])
@cross_origin()
def contain_cars():
    if request.method == 'POST':
        data = request.get_json()
        cars = data.get('cars')
        session['cars'] = cars
        return jsonify({'message': 'Cars got successfully'})

@app.route('/add', methods=['POST'])
@cross_origin()
def add_car():
    if request.method == 'POST':
        data = request.get_json()
        cars = data.get('cars')

        for car in cars:
            new_car = Car(max_speed=car.get('max_speed'), power=car.get('power'), model=car.get('model'), price=car.get('price'))
            existing_car = Car.query.filter_by(model=car.get('model')).first
            if not existing_car:
                db.session.add(new_car)
        db.session.commit()
        return jsonify({'message': 'Cars added successfully'})
    
@app.route('/add', methods=['GET'])
@cross_origin()
def get_car_on_add():
    cars = session.get('cars')
    for car in cars:
        return jsonify({'max_speed': car.get('max_speed'),
                        'power': car.get('power'),
                        'model': car.get('model'),
                        'price': car.get('price')
                        })
    
@app.route('/view', methods=['GET'])
@cross_origin()
def get_car_on_view():
    cars = session.get('cars')
    for car in cars:
        return jsonify({'max_speed': car.get('max_speed'),
                        'power': car.get('power'),
                        'model': car.get('model'),
                        'price': car.get('price')
                        })
    
@app.route('/edit', methods=['GET'])
@cross_origin()
def get_car_on_edit():
    cars = session.get('cars')
    for car in cars:
        return jsonify({'max_speed': car.get('max_speed'),
                        'power': car.get('power'),
                        'model': car.get('model'),
                        'price': car.get('price')
                        })
    
@app.route('/edit', methods=['POST'])
@cross_origin
def edit_car():
    if request.method == 'POST':
        edited_car = request.get_json()
        older_version = Car.query.filter_by(model=edited_car.get('model')).first()
        if older_version:
            older_version.max_speed = edited_car.get('max_speed')
            older_version.power = edited_car.get('power')
            older_version.price = edited_car.get('price')
    
if __name__ == '__main__':
    app.run(debug=True)
