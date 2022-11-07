from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_login import LoginManager, logout_user, UserMixin, login_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func
from flask_session import Session
from user_validation import User
from sqlalchemy import and_
import calendar
import googlemaps
import json
from datetime import datetime

app = Flask(__name__, static_folder="client/build", static_url_path="")
db = SQLAlchemy()
DB_NAME = "timescape_users.db"
sess = Session()
secret_key = os.getenv("SECRET_KEY")
uri = os.getenv("DATABASE_URL").replace("postgres://", "postgresql://", 1) if os.getenv("DATABASE_URL").startswith("postgres://") else os.getenv("DATABASE_URL")
CORS(app)
app.config['SECRET_KEY'] = secret_key
login_manager = LoginManager()
app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'sqlalchemy'
db.init_app(app)
app.config['SESSION_SQLALCHEMY'] = db
sess.init_app(app)
Migrate(app, db)
login_manager.init_app(app)

class SavedPlacesTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    phone_number = db.Column(db.String(255))
    rating = db.Column(db.Float)
    url = db.Column(db.String(1000))
    place_id = db.Column(db.String(150))
    image = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    def dictFormat(self):
        return {
            "id": self.id,
            "place_id": self.place_id,
            "name":self.name, 
            "address":self.address, 
            "place_number":self.phone_number,
            "rating":self.rating,
            "url":self.url,
            "place_image":self.image
        }

class EventsTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    message = db.Column(db.String(1000))
    date = db.Column(db.DateTime, default=func.now())
    place = db.Column(db.String(150))
    address = db.Column(db.String(1000))
    time = db.Column(db.String(100))
    phone_number = db.Column(db.String(150))
    image = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    def dictFormat(self):
        return {
            "id": self.id,
            "title":self.title, 
            "message":self.message, 
            "date":self.date.strftime('%d/%m/%Y'), 
            "place_name":self.place, 
            "place_address":self.address, 
            "time": self.time,
            "place_number":self.phone_number,
            "place_image":self.image
        }

class UserTable(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    events = db.relationship('EventsTable')
    saved_places = db.relationship('SavedPlacesTable')

    def login_user(self, email, password):
        user_table = self.query.filter_by(email = email).first()
        if user_table:
            if check_password_hash(user_table.password, password):
                login_user(user_table, remember=True)
                session["current_user"] = {"id":current_user.id, "first_name": current_user.first_name}
                return {"authenticated":True, "message": "Logged in successfully"}
            else:
                return {"authenticated":False, "message": "Incorrect password. Try again"}
        else: 
            return {"authenticated":False, "message": "Email does not exist. Try again"}
    
    def signup_user(self, email, password, first_name, last_name, password_confirmation):
        user_table = self.query.filter_by(email = email).first()
        if user_table:
            return {"authenticated":False, "message": "Email already exists"}
        elif password != password_confirmation:
            return {"authenticated":False, "message": "Passwords are not equal"}
        else: 
            new_user_entry = UserTable(first_name=first_name, last_name=last_name, email=email, password=generate_password_hash(password, method='sha256'))
            db.session.add(new_user_entry)
            db.session.commit()
            login_user(new_user_entry, remember=True)
            session["current_user"] = {"id":current_user.id, "first_name": current_user.first_name}
            return {"authenticated":True, "message": "Account created successfully"}

def create_database(app):
    with app.app_context():
        db.create_all(app = app)

create_database(app)    

@login_manager.user_loader
def load_user(id):
    return UserTable.query.get(int(id))


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/access', methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def access():
    if request.method == 'POST':
        user = User()
        data = request.get_json()
        try :
            user.email = data.get('user_email')
            user.password = data.get('user_password')
            user_table = UserTable()
            response = user_table.login_user(user.email, user.password)
        except (TypeError, ValueError) as error:
            response = {"authenticated": False, "message": str(error)}
    return response

@app.route('/signup', methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def signup():
    if request.method == 'POST':
        user = User()
        data = request.get_json()
        try:
            user.first_name = data.get('user_first_name')
            user.last_name = data.get('user_last_name')
            user.email = data.get('user_email')
            user.password = data.get('user_password')
            user.password_confirmation = data.get('user_password_confirmation')
            user_table = UserTable()
            response = user_table.signup_user(first_name=user.first_name, last_name=user.last_name, email=user.email, password=user.password, password_confirmation=user.password_confirmation)
        except (TypeError, ValueError) as error:
            response = {"authenticated": False, "message": str(error)}
    return response

@app.route('/user', methods=["GET"])
@cross_origin(supports_credentials=True)
def user():
    if (session["current_user"]):
        user = session.get("current_user")
        return {"auth":True, "name": user.get("first_name")}
    return {"auth": False}


@app.route('/logout', methods=["POST"])
@cross_origin(supports_credentials=True)
def logout():
    logout_user()
    session.pop("current_user", None)
    return {"authenticated":False}

key = os.getenv("GOOGLE_API_KEY")
gmaps = googlemaps.Client(key=key)
today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
events_table = EventsTable
favorites_table = SavedPlacesTable

@app.route("/getNearby", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_nearby():
    data = request.get_json()              
    nearby_places = gmaps.places_nearby(location=(data['coordinates']["lat"], data['coordinates']["lng"]), radius=10000, type=data["type"])["results"]
    places_list = []
    for place in nearby_places:
        place_photos = place.get('photos')
        photo_reference = place_photos[0].get("photo_reference") if place_photos is not None else None
        image = 'https://maps.googleapis.com/maps/api/place/photo?photo_reference=' + photo_reference + '&maxheight=1000&minheight=100&key=' + key if photo_reference is not None else None
        place_dict = {"name":place.get("name"), "place_id":place.get("place_id"), "rating":place.get("rating"), "coordinates":place["geometry"]["location"], "address":place.get("vicinity"), "place_image":image}
        places_list.append(place_dict)
    response = {"nearby": places_list}
    return response

@app.route("/savePlace", methods=["POST"])
@cross_origin(supports_credentials=True)
def save_place():
    user = session.get("current_user")
    print(user)
    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    phone_number = data.get('phone_number')
    rating = data.get('rating')
    url = data.get('maps_url')
    place_id = data.get('place_id')
    image = data.get('image')
    new_saved_place = SavedPlacesTable(name=name, address=address, phone_number=phone_number, rating=rating, url=url, place_id=place_id, image=image, user_id=session["current_user"].get("id"))
    db.session.add(new_saved_place)
    db.session.commit()
    saved_places = favorites_table.query.filter_by(user_id=session["current_user"].get("id")).all()
    response = [place.dictFormat() for place in saved_places]
    return {"saved":response}

@app.route("/getSavedPlaces", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_saved_places():
    saved_places = favorites_table.query.filter_by(user_id=session["current_user"].get("id")).all()
    saved_places_list = [saved_place.dictFormat() for saved_place in saved_places]
    return {"saved":saved_places_list}

@app.route("/deletePlace", methods=["POST"])
@cross_origin(supports_credentials=True)
def delete_place():
    data = request.get_json()
    id = data.get("id")
    place = favorites_table.query.filter_by(user_id=session["current_user"].get("id"), place_id=id).first()
    db.session.delete(place)
    db.session.commit()
    saved_places = favorites_table.query.filter_by(user_id=session["current_user"].get("id")).all()
    response = [place.dictFormat() for place in saved_places]
    return {"saved":response}

@app.route('/createEvent', methods=["POST"])
@cross_origin(supports_credentials=True)
def create_event():
    req = request.get_json().get("data")
    data = json.loads(req)
    title = data.get('title')        
    message = data.get('message')
    date_string = data.get('date')
    date = datetime.strptime(date_string, '%d/%m/%Y')
    place_name = data.get('place_name')
    place_address = data.get('place_address')
    time = data.get('time')
    phone_number = data.get('place_number')
    image = (data.get('place_image'))
    new_event = EventsTable(title=title.capitalize() if title is not None else title, message=message.capitalize() if message is not None else message, date=date, place=place_name, address=place_address, time=time, phone_number=phone_number, image=image, user_id=session["current_user"].get("id"))
    db.session.add(new_event)
    db.session.commit()
    response = filterEvents(session["current_user"].get("id"), date)
    return response

@app.route('/getEvents', methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def get_events():
    if request.method == "POST":
        date = request.get_json()
        selected_date = datetime.strptime(date.get("date"), "%a, %d %b %Y %H:%M:%S %Z")
        sel_date_events = filterEvents(session["current_user"].get("id"), selected_date)
        return sel_date_events
    today_events = filterEvents(session["current_user"].get("id"))
    return today_events

@app.route('/getEvents/dates', methods=["GET"])
@cross_origin(supports_credentials=True)
def get_events_dates():
    last_day = calendar.monthrange(today.year, today.month)[1]
    start_date = datetime.strptime(f"1/{today.month}/{today.year}", "%d/%m/%Y")
    end_date = datetime.strptime(f"{last_day}/{today.month}/{today.year}", "%d/%m/%Y")
    dates = events_table.query.filter(and_(events_table.user_id == session["current_user"].get("id"), events_table.date >= start_date, events_table.date <= end_date)).all()
    dates_list = [event.date.strftime('%Y-%m-%d') for event in dates]
    return {"dates": list(dict.fromkeys(dates_list))}

@app.route('/userEvents', methods=["GET"])
@cross_origin(supports_credentials=True)
def user_events():
    user_events = events_table.query.filter_by(user_id=session["current_user"].get("id")).order_by(events_table.date.asc(), events_table.time.asc()).all()
    response = [event.dictFormat() for event in user_events if event.date > today or 
                event.date == today and datetime.strptime(event.time, "%H:%M").time() > datetime.now().time()]
    return {"events": response}

@app.route("/deleteEvent", methods=["POST"])
@cross_origin(supports_credentials=True)
def delete_event():
    data = request.get_json()
    id = data.get("entry_id")
    event = events_table.query.filter_by(user_id=session["current_user"].get("id"), id=id).first()
    date = event.date if event is not None else today
    db.session.delete(event)
    db.session.commit()
    response = filterEvents(session["current_user"].get("id"), date)
    return response

def filterEvents(user_id, date=today):
    events = events_table.query.filter_by(user_id=user_id, date=date).order_by(events_table.date.asc(), events_table.time.asc()).all()
    events_list = [event.dictFormat() for event in events]
    final_dict = {"events":events_list}
    return final_dict

if __name__ == '__main__':

    app.run(debug=False)
