from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "timescape_users.db"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'gastipaz' 
    CORS(app)
    login_manager = LoginManager()
    app.config['SQLALCHEMY_DATABASE_URI']=f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
    db.init_app(app)
    Migrate(app, db)

    from .views import views
    from .auth import auth
    CORS(views)
    CORS(auth)

    login_manager.login_view = 'auth.access'
    login_manager.init_app(app)

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import UserTable, EventsTable, SavedPlacesTable

    create_database(app)    

    @login_manager.user_loader
    def load_user(id):
        return UserTable.query.get(int(id))
    
    return app

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app = app)
    
