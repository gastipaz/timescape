from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_session import Session

db = SQLAlchemy()
DB_NAME = "timescape_users.db"
sess = Session()

def create_app():
    secret_key = os.getenv("SECRET_KEY")
    uri = os.getenv("DATABASE_URL")
    if uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)

    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = secret_key
    login_manager = LoginManager()
    # app.config['SQLALCHEMY_DATABASE_URI']=f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SESSION_TYPE'] = 'sqlalchemy'

    db.init_app(app)

    app.config['SESSION_SQLALCHEMY'] = db

    sess.init_app(app)

    Migrate(app, db)

    from .views import views
    from .auth import auth

    login_manager.login_view = 'auth.access'
    login_manager.init_app(app)

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    from .models import UserTable, EventsTable, SavedPlacesTable

    create_database(app)    

    @login_manager.user_loader
    def load_user(id):
        return UserTable.query.get(int(id))
    
    return app

def create_database(app):
    # if not path.exists('website/' + DB_NAME):
    with app.app_context():
        db.create_all(app = app)
    
