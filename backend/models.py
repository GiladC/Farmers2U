from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime, timedelta
import pytz

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    farmName = db.Column(db.String(150), nullable=True, unique=False)  # Set nullable=True for the name column
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    about = db.Column(db.String(255), default='')
    phoneNumber1 = db.Column(db.String(150))
    phoneNumber2 = db.Column(db.String(150))
    city = db.Column(db.String(150))
    address = db.Column(db.String(150))
    farmerName = db.Column(db.String(150))
    prices = db.Column(db.String(150))
    products = db.Column(db.String(150))
    facebook = db.Column(db.String(150))
    instagram = db.Column(db.String(150))


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    farmName = db.Column(db.String(150), nullable=False)
    profilePicture = db.Column(db.String(255))
    photo = db.Column(db.String(255))
    desc = db.Column(db.Text)
    posted = db.Column(db.DateTime, default=datetime.utcnow)
    date = db.Column(db.Date)
    price = db.Column(db.strin)
    location = db.Column(db.String(150))
    time = db.Column(db.String(100))
    @property
    def posted(self):
        utc_now = datetime.utcnow()
        ist = pytz.timezone('Asia/Jerusalem')
        ist_now = utc_now.astimezone(ist)
        ist_posted = datetime.strptime(self.date + ' ' + self.time, '%Y-%m-%d %H:%M:%S').replace(tzinfo=pytz.utc).astimezone(ist)

        time_difference = ist_now - ist_posted

        if time_difference < timedelta(minutes=1):
            return f"{time_difference.seconds} seconds ago"
        elif time_difference < timedelta(hours=1):
            return f"{time_difference.seconds // 60} minutes ago"
        elif time_difference < timedelta(days=1):
            return f"{time_difference.seconds // 3600} hours ago"
        elif time_difference < timedelta(weeks=1):
            return f"{time_difference.days} days ago"
        else:
            return ist_posted.date()