from flask import Flask, config, json, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
#CORS(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///car.db'
db = SQLAlchemy(app)

class Car_Objects(db.Model):
    max_speed = db.Column(db.Integer)
    power = db.Column(db.Integer)
    model = db.Column(db.String(50), primary_key = True)
    price = db.Column(db.Integer)

@app.route('/view', methods=['POST'])
@cross_origin()
def contain_cars():
    if request.method == 'POST':
        try:
            data = request.get_json()
            for car in data:
                if 'max_speed' in car and 'power' in car and 'model' in car and 'price' in car:
                    new_car = Car_Objects(max_speed=car['max_speed'], power=car['power'], model=car['model'], price=car['price'])
                    db.session.add(new_car)
            db.session.commit()
            return jsonify({'message': 'Cars got successfully'})
        except Exception as e:
            return jsonify({'error': 'An error occurred during adding cars to the session', 'details': str(e)}), 500

@app.route('/add', methods=['POST'])
@cross_origin()
def add_car():
    if request.method == 'POST':
        car = request.get_json()
        existing_car = Car_Objects.query.filter_by(model=car.get('model')).first()
        if not existing_car:
            new_car = Car_Objects(max_speed=car['max_speed'], power=car['power'], model=car['model'], price=car['price'])
            try:
                db.session.add(new_car)
                db.session.commit()
                return jsonify({'message': 'Car added successfully'})
            except:
                return jsonify({'message': 'some error occured during adding the car'})
    
@app.route('/edit', methods=['POST'])
@cross_origin()
def edit_car():
    if request.method == 'POST':
        edited_car = request.get_json()
        older_version = Car_Objects.query.filter_by(model=edited_car.get('model')).first()
        if older_version:
            car_dict = {'max_speed': older_version.max_speed, 'power': older_version.power, 'model': older_version.model, 'price': older_version.price}
            car_dict['max_speed'] = edited_car.get('max_speed')
            car_dict['power'] = edited_car.get('power')
            car_dict['price'] = edited_car.get('price')
            try:
                older_version.max_speed = car_dict['max_speed']
                older_version.power = car_dict['power']
                older_version.price = car_dict['price']
                db.session.commit()
                return jsonify(car_dict)
            except:
                return 'some error occured while editing'
        else:
            return 'the car, you are trying to edit, doesnt exist'
        

@app.route('/get', methods=['GET'])
@cross_origin()
def get_car_on_view():
    try:
        cars = Car_Objects.query.all()
        car_list = []
        for car in cars:
            car_dict = {'max_speed': car.max_speed, 'power': car.power, 'model': car.model, 'price': car.price}
            car_list.append(car_dict)
        return jsonify(car_list)
    except Exception as e:
        return jsonify({'error': 'some error occured during getting car on view', 'details': str(e)}), 500  
    
if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'redis'
    app.app_context().push()
    try:
        db.create_all()
    except Exception as e:
        print(e)
    app.run(debug=True)