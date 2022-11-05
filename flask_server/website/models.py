from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user
from sqlalchemy.sql import func
from flask_server.website import db

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
            return {"authenticated":True, "message": "Account created successfully"}