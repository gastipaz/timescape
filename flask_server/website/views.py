from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from sqlalchemy import and_
import calendar
import googlemaps
from .models import EventsTable, SavedPlacesTable
from flask_server.website import db
from flask_cors import cross_origin
import json

views = Blueprint('views', __name__)
key = "AIzaSyBLqbj_ZaGgYVS2nvw-6gh9w8NlFGn4nP0"
gmaps = googlemaps.Client(key=key)
today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
events_table = EventsTable
favorites_table = SavedPlacesTable

@views.route("/")
@views.route("/getNearby", methods=["POST"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
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

@views.route("/savePlace", methods=["POST"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
def save_place():
    data = request.get_json()
    name = data.get('name')
    address = data.get('address')
    phone_number = data.get('phone_number')
    rating = data.get('rating')
    url = data.get('maps_url')
    place_id = data.get('place_id')
    image = data.get('image')
    new_saved_place = SavedPlacesTable(name=name, address=address, phone_number=phone_number, rating=rating, url=url, place_id=place_id, image=image, user_id=current_user.id)
    db.session.add(new_saved_place)
    db.session.commit()
    saved_places = favorites_table.query.filter_by(user_id=current_user.id).all()
    response = [place.dictFormat() for place in saved_places]
    return {"saved":response}

@views.route("/getSavedPlaces", methods=["GET"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
def get_saved_places():
    saved_places = favorites_table.query.filter_by(user_id=current_user.id).all()
    saved_places_list = [saved_place.dictFormat() for saved_place in saved_places]
    return {"saved":saved_places_list}

@views.route("/deletePlace", methods=["POST"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
def delete_place():
    data = request.get_json()
    id = data.get("id")
    place = favorites_table.query.filter_by(user_id=current_user.id, place_id=id).first()
    db.session.delete(place)
    db.session.commit()
    saved_places = favorites_table.query.filter_by(user_id=current_user.id).all()
    response = [place.dictFormat() for place in saved_places]
    return {"saved":response}

@views.route('/createEvent', methods=["POST"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
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
    new_event = EventsTable(title=title.capitalize() if title is not None else title, message=message.capitalize() if message is not None else message, date=date, place=place_name, address=place_address, time=time, phone_number=phone_number, image=image, user_id=current_user.id)
    db.session.add(new_event)
    db.session.commit()
    response = filterEvents(current_user.id, date)
    return response

@views.route('/getEvents', methods=["GET", "POST"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
def get_events():
    if request.method == "POST":
        date = request.get_json()
        selected_date = datetime.strptime(date.get("date"), "%a, %d %b %Y %H:%M:%S %Z")
        sel_date_events = filterEvents(current_user.id, selected_date)
        return sel_date_events
    today_events = filterEvents(current_user.id)
    return today_events

@views.route('/getEvents/dates', methods=["GET"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
def get_events_dates():
    last_day = calendar.monthrange(today.year, today.month)[1]
    start_date = datetime.strptime(f"1/{today.month}/{today.year}", "%d/%m/%Y")
    end_date = datetime.strptime(f"{last_day}/{today.month}/{today.year}", "%d/%m/%Y")
    dates = events_table.query.filter(and_(events_table.user_id == current_user.id, events_table.date >= start_date, events_table.date <= end_date)).all()
    dates_list = [event.date.strftime('%Y-%m-%d') for event in dates]
    return {"dates": list(dict.fromkeys(dates_list))}

@views.route('/userEvents', methods=["GET"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
def user_events():
    user_events = events_table.query.filter_by(user_id=current_user.id).order_by(events_table.date.asc(), events_table.time.asc()).all()
    response = [event.dictFormat() for event in user_events if event.date > today or 
                event.date == today and datetime.strptime(event.time, "%H:%M").time() > datetime.now().time()]
    return {"events": response}

@views.route("/deleteEvent", methods=["POST"])
# @login_required
# @cross_origin(supports_credentials=True)
@cross_origin()
def delete_event():
    data = request.get_json()
    id = data.get("entry_id")
    event = events_table.query.filter_by(user_id=current_user.id, id=id).first()
    date = event.date if event is not None else today
    db.session.delete(event)
    db.session.commit()
    response = filterEvents(current_user.id, date)
    return response

def filterEvents(user_id, date=today):
    events = events_table.query.filter_by(user_id=user_id, date=date).order_by(events_table.date.asc(), events_table.time.asc()).all()
    events_list = [event.dictFormat() for event in events]
    final_dict = {"events":events_list}
    return final_dict
