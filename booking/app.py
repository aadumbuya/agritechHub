from flask import Flask, request, jsonify, render_template
from models import db, Machine, Booking
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farm_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.before_request
def create_tables(): 
    db.create_all()
    # Check if the Machine table is empty and insert sample data
    if Machine.query.count() == 0:
        sample_machines = [
            Machine(name='Tractor', description='Versatile farm machine for various tasks.',image='trac.jpg'),
            Machine(name='Harvester', description='Efficient for harvesting crops quickly.', image='trac.jpg'),
            Machine(name='Plough', description='Essential for preparing the land for planting.', image='trac.jpg'),
            Machine(name='Sprayer', description='Used for applying liquid substances to crops.', image='trac.jpg')
        ]
        db.session.bulk_save_objects(sample_machines)
        db.session.commit()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/machines', methods=['GET'])
def get_machines():
    machines = Machine.query.all()
    return jsonify([{'id': machine.id, 'name': machine.name, 'description': machine.description} for machine in machines])

@app.route('/api/book', methods=['POST'])
def book_machine():
    data = request.json
    existing_booking = Booking.query.filter_by(machine_id=data['machine_id'], booking_date=data['booking_date']).first()
    if existing_booking:
        return jsonify({'error': 'Machine already booked for this date'}), 400

    booking = Booking(
        machine_id=data['machine_id'],
        user_name=data['user_name'],
        user_email=data['user_email'],
        user_id=data['user_id'],
        booking_date=data['booking_date']
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({'success': 'Booking confirmed'}), 201

if __name__ == '__main__':
    app.run(debug=True)
