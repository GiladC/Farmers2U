from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime
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
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)  # unique identifier of the post
    farmName = db.Column(db.String(150), nullable=False)                            # Name of the farm
    profilePicture = db.Column(db.String(255))                                      # The logo of the farm
    photo = db.Column(db.String(255))                                               # The picture on the post
    desc = db.Column(db.String(1000))                                               # The text of the post
    date = db.Column(db.Date)                                                       # The date it was posted month/day/year              
    location = db.Column(db.String(150))                                            # The location mentioned in the post
    area = db.Column(db.String(150))                                                # The specific area it will be in, for the filter
    time = db.Column(db.String(100))                                                # The time it was posted in hour/minute/second
    event_date = db.Column(db.Date)                                                 # The date when the event takes place
    time_range = db.Column(db.String(50))  
    products = db.Column(db.JSON, nullable=True)

    ''' 
    posted explanation: How long was it since the post was posted:
    1) Less then 1 minute, then its written in seconds
    2) Less then 1 hour, then its written in minutes
    3) Less then 1 day, then its written in hours
    4) Less then a week, then its written in days
    5) More then a week, then its the date it was posted
    '''

    @property
    def posted(self):          #The initializer of the posted property
        ist = pytz.timezone('Asia/Jerusalem')   # ist = Israel timezone

        posted_datetime = datetime.strptime(self.date.strftime('%Y-%m-%d') + ' ' + self.time, '%Y-%m-%d %H:%M:%S').replace(tzinfo=ist).replace(tzinfo=None)
        current_datetime = datetime.now(ist).replace(tzinfo=None)

        time_difference = current_datetime - posted_datetime
        time_difference_seconds = int(time_difference.total_seconds())

        if time_difference_seconds < 60:
            return f"{time_difference_seconds} שניות"
        elif time_difference_seconds < 3600:
            return f"{time_difference_seconds // 60} דק'"
        elif time_difference_seconds < 86400:
            return f"{time_difference_seconds // 3600} שעות"
        elif time_difference_seconds < 604800:
            return f"{time_difference_seconds // 86400} ימים"
        else:
            return posted_datetime.strftime('%m/%d/%Y')
