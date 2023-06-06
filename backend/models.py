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
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)  # unique identifier of the post
    farmName = db.Column(db.String(150), nullable=False)                            # Name of the farm
    profilePicture = db.Column(db.String(255))                                      # The logo of the farm
    photo = db.Column(db.String(255))                                               # The picture on the post
    desc = db.Column(db.String(1000))                                               # The text of the post
    date = db.Column(db.Date)                                                       # The date it was posted month/day/year              
    price = db.Column(db.String(50))                                                # The price range
    location = db.Column(db.String(150))                                            # The location mentioned in the post
    time = db.Column(db.String(100))                                                # The time it was posted in hour/minute/second
    event_date = db.Column(db.Date)                                                 # The date when the event takes place
    time_range = db.Column(db.String(50))    

    ''' 
    posted explanation: How long was it since the post was posted:
    1) Less then 1 minute, then its written in seconds
    2) Less then 1 hour, then its written in minutes
    3) Less then 1 day, then its written in hours
    4) Less then a week, then its written in days
    5) More then a week, then its the date it was posted
    '''
    # posted = db.Column(db.DateTime, default=datetime.now(pytz.timezone('Asia/Jerusalem')))
    @property
    def posted(self):                                          #The initializer of the posted property
        utc_now = datetime.now(pytz.utc)
        ist = pytz.timezone('Asia/Jerusalem')   #ist = israel timezone
        ist_now = utc_now.astimezone(ist)      
        ist_posted = datetime.strptime(self.date.strftime('%Y-%m-%d') + ' ' + self.time, '%Y-%m-%d %H:%M:%S').replace(tzinfo=pytz.utc).astimezone(ist)

        time_difference = ist_now - ist_posted

        if time_difference < timedelta(minutes=1):
            return f"{time_difference.seconds} שניות"
        elif time_difference < timedelta(hours=1):
            return f"{time_difference.seconds // 60} דק'"
        elif time_difference < timedelta(days=1):
            return f"{time_difference.seconds // 3600} שעות"
        elif time_difference < timedelta(weeks=1):
            return f"{time_difference.days} ימים"
        else:
            return ist_posted.strftime('%m/%d/%Y')