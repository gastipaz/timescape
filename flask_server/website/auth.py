from flask import Blueprint, request
from website.models import UserTable
from flask_login import login_required, logout_user, current_user
from flask_cors import cross_origin
from website.user_validation import User

auth = Blueprint('auth', __name__)

@auth.route('/access', methods=["GET", "POST"])
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

@auth.route('/signup', methods=["GET", "POST"])
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

@auth.route('/user', methods=["GET"])
@cross_origin(supports_credentials=True)
def user():
    if (current_user):
        return {"auth":True, "name": current_user.first_name}
    return {"auth": False}


@auth.route('/logout', methods=["POST"])
@cross_origin(supports_credentials=True)
@login_required
def logout():
    logout_user()
    return {"authenticated":False}


