from flask import Flask, request, jsonify, session
import os
from datetime import datetime, timedelta, timezone
from flask_cors import CORS #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager #pip install Flask-JWT-Extended
import json
from google.cloud import storage
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy


# Load environment variables from .env
load_dotenv()

# Retrieve the JSON string from the environment variable
google_credentials_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
# Parse the JSON string into a dictionary
google_credentials_dict = json.loads(google_credentials_json)
# Create a storage client using the parsed service account info
storage_client = storage.Client.from_service_account_info(google_credentials_dict)

bucket_name = 'image_storage_farmers2u'
bucket = storage_client.bucket(bucket_name)
default_logo_name = "farmers2u_logo.png"
default_logo = f"https://storage.googleapis.com/{bucket_name}/{default_logo_name}"


app = Flask(__name__)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=87600)
jwt = JWTManager(app)

app.config['SECRET_KEY'] = 'farmers2u'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'postgresql://tupahkiqaiurrp:56ad8658b5c79441fe7d3bb264d62623cee511e9f245b47d54676e2ec28802de@ec2-54-243-32-226.compute-1.amazonaws.com:5432/dee2o99tifbk3i'
    '?sslmode=require'
)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

  
CORS(app, supports_credentials=True)
print(app.config['SQLALCHEMY_DATABASE_URI'])
db = SQLAlchemy(app)




# migrate = Migrate(app, db)



ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
  








from uuid import uuid4
from datetime import datetime
import pytz


def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(40), primary_key=True, unique=True, default=get_uuid)
    # email = db.Column(db.String(150), nullable=True, unique=True)
    email = db.Column(db.String(150), nullable=True)
    google_profile_picture = db.Column(db.String(150))
    google_name = db.Column(db.String(150))
    google_family_name = db.Column(db.String(150))
    shipping_distance = db.Column(db.String(10))
    is_shipping = db.Column(db.String(10))
    opening_hours = db.Column(db.String(300), nullable=True)
    closing_hours = db.Column(db.String(300), nullable=True)
    logo_picture = db.Column(db.String(300), nullable=True)
    products_pictures = db.Column(db.String(1000), nullable=True)    
    farm_pictures = db.Column(db.String(1000), nullable=True)     
    farm_name = db.Column(db.String(150), nullable=True, unique=False)  # Set nullable=True for the name column
    about = db.Column(db.String(4000), default='')
    phone_number_official = db.Column(db.String(20), default='')
    phone_number_whatsapp = db.Column(db.String(20), default='')
    phone_number_telegram = db.Column(db.String(20), default='')
    address = db.Column(db.String(150))
    farmer_name = db.Column(db.String(150))
    #is_organic = db.Column(db.String(10))
    #is_vegan = db.Column(db.String(10))
    delivery_details = db.Column(db.String(1000))
    products = db.Column(db.String(3000))
    types_of_products = db.Column(db.String(400))
    farm_site = db.Column(db.String(150), default='')
    facebook = db.Column(db.String(150), default='')
    instagram = db.Column(db.String(150), default='')


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.String(40), primary_key=True, unique=True, default=get_uuid)  # unique identifier of the post
    farmName = db.Column(db.String(150), nullable=False)   
    email = db.Column(db.String(150), nullable=False)                        
    profilePicture = db.Column(db.String(255))                                      # The logo of the farm
    photo = db.Column(db.String(255))                                               # The picture on the post
    desc = db.Column(db.String(3000))                                               # The text of the post
    date = db.Column(db.Date)                                                       # The date it was posted month/day/year              
    latitude = db.Column(db.Float)                                                  # Latitude for the distance function
    longitude = db.Column(db.Float)                                                 # Longitude for the distance function    
    location = db.Column(db.String(150))                                            # The location mentioned in the post
    time = db.Column(db.String(100))                                                # The time it was posted in hour/minute/second
    event_date = db.Column(db.Date)                                                 # The date when the event takes place
    time_range = db.Column(db.String(50))                                           # The hour range the event will take place
    products = db.Column(db.JSON, nullable=True)                                    # The list of the product types
    isOrganic = db.Column(db.Boolean, default=False)                                # Only organic stuff on the post?
    isVegan = db.Column(db.Boolean, default=False)                                  # Only vegan stuff on the post?

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
            return posted_datetime.strftime('%d/%m/%Y')



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def delete_object_by_url(url):
    if default_logo in url:
        return
    # Parse the URL to extract the object name
    object_name = url.split('/')[-1]

    # Initialize Google Cloud Storage client
    client = storage.Client.from_service_account_info(google_credentials_dict)

    # Specify the bucket name
    bucket_name = 'image_storage_farmers2u'
    # Get the bucket
    bucket = client.bucket(bucket_name)

    # Delete the object (blob) with the extracted object name
    blob = bucket.blob(object_name)
    blob.delete()   

def generate_unique_filename(filename):
    from uuid import uuid4
    # Generate a unique filename by combining a random UUID and the original filename
    unique_filename = str(uuid4()) + '_' + filename
    return unique_filename

def check_file_exists(bucket_name, filename):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blob = bucket.blob(filename)
    return blob.exists()

def extract_filename_from_url(image_url):
    print("image_url", image_url)
    parts = image_url.split("/")
    filename = parts[-1]
    return filename

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/logintoken", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    #password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"error": "Wrong Email"}), 401

    access_token = create_access_token(identity=email)

    return jsonify({
        "email": email,
        "userName": user.farm_name,
        "profilePicture": user.logo_picture,
        "access_token": access_token
    })
 
         
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        errors['status'] = 'failed'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'successs'
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp

@app.route("/signup", methods=["POST"])
def signup():
    json_data = request.form.get('jsonData')
    data = json.loads(json_data)
    email = data.get("email")
    is_shipping = data.get("is_shipping")
    user_exists = User.query.filter_by(email=email).first() is not None
    if email == "":
        return jsonify({"error": "No email"}), 405
    if user_exists:
        return jsonify({"error": "Email already exists or None"}), 409
    if is_shipping is None:
        return jsonify({"success": "Valid email"})

    if 'files[]' not in request.files:
        logo_image_string = ""
        products_images_string = ""
        farm_images_string = ""
    else:
        logo_image = []
        products_images = []
        farm_images = []
        files = request.files.getlist('files[]')
        labels = request.form.getlist('labels[]')

        for i in range(len(files)):
            image_filename = generate_unique_filename(files[i].filename)
            blob = bucket.blob(image_filename)
            blob.upload_from_file(files[i])

            # Generate public URL for the uploaded image
            image_url = f"https://storage.googleapis.com/{bucket_name}/{image_filename}"

            if labels[i] == "1":
                logo_image.append(image_url)
            if labels[i] == "2":
                products_images.append(image_url)
            if labels[i] == "3":
                farm_images.append(image_url)

        logo_image_string = ','.join(logo_image)
        products_images_string = ','.join(products_images)
        farm_images_string = ','.join(farm_images)
        

        print(logo_image_string)
        print(products_images_string)
        print(farm_images_string)



    #if logo_picture:
    #    logo_picture_name = generate_unique_filename(logo_picture[0].filename)
    #    logo_picture[0].save(os.path.join('..', 'frontend', 'public', 'Form_images', 'Logo_image', logo_picture_name))

    google_name = data.get("google_name")
    # validation for new registered email
    google_profile_picture = data.get("google_profile_picture")
    google_family_name = data.get("google_family_name")
    shipping_distance = data.get("shipping_distance")
    is_shipping = data.get("is_shipping")
    opening_hours = data.get("opening_hours")
    closing_hours = data.get("closing_hours")
    types_of_products = data.get("types_of_products")
    #logo_picture = request.json["logo_picture"]
    #print("mumo")

    #logo_picture = request.json.get("logo_picture")
    #logo_picture_string = ','.join(str(photo) for photo in logo_picture)
    products_pictures = data.get("products_pictures")
    farm_pictures = data.get("farm_pictures")
    farm_name = data.get("farm_name")
    about = data.get("about")
    phone_number_official = data.get("phone_number_official")
    phone_number_whatsapp = data.get("phone_number_whatsapp")
    phone_number_telegram = data.get("phone_number_telegram")
    address = data.get("address")
    farmer_name = data.get("farmer_name")
    delivery_details = data.get("delivery_details")
    products = data.get("products")
    farm_site = data.get("farm_site")
    facebook = data.get("facebook")
    instagram = data.get("instagram")

    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 

    if logo_image_string == "":
        logo_image_string = default_logo
    
    #hashed_password = bcrypt.generate_password_hash(password)
    #new_user = User(name="tamir20",email=email, password=hashed_password, about="sample check")
    #new_user = User(name= "gilad", email=email, password=hashed_password, about="I am Gilad, a farmer.")
    new_user = User(email=email, google_profile_picture = google_profile_picture, google_name = google_name, 
                    google_family_name = google_family_name, shipping_distance = shipping_distance, 
                    is_shipping= is_shipping, opening_hours = opening_hours, closing_hours = closing_hours,  
                    logo_picture = logo_image_string, products_pictures = products_images_string,
                    farm_pictures = farm_images_string, farm_name = farm_name, about = about, types_of_products = types_of_products, 
                    phone_number_official = phone_number_official, phone_number_whatsapp = phone_number_whatsapp,
                    phone_number_telegram = phone_number_telegram, address = address, farmer_name = farmer_name,
                    delivery_details= delivery_details,products= products, farm_site = farm_site,
                    facebook = facebook, instagram = instagram)
    db.session.add(new_user)
    db.session.commit()
 
    #session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "logo_picture": new_user.logo_picture
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    #password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    #if not bcrypt.check_password_hash(user.password, password):
    #    return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/profile/<getemail>')
@jwt_required() 
def my_profile(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401
    user = User.query.filter_by(email=getemail).first()
    response_body = {
        "id": user.id,
        "google_profile_picture": user.google_profile_picture,
        "google_name": user.google_name,
        "google_family_name": user.google_family_name,
        "farmName": user.farmName,
        "about" : user.about,
        "phoneNumber_official": user.phone_number_official,
        "phoneNumber_whatsapp": user.phone_number_whatsapp,
        "phoneNumber_telegram": user.phone_number_telegram,
        "address" : user.address,
        "farmerName" : user.farmerName,
        "delivery_details" : user.delivery_details,
        "products" : user.products,
        "farm_site" : user.farm_site,
        "facebook" : user.facebook,
        "instagram" : user.instagram,
    }
  
    return response_body

@app.route('/settings/<getemail>')
@jwt_required() 
def my_settings(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401
    user = User.query.filter_by(email=getemail).first()
    products_pictures = user.products_pictures.split(',')
    farm_pictures = user.farm_pictures.split(',')
    response_body = {
        "id": user.id,
        "google_profile_picture": user.google_profile_picture,
        "google_name": user.google_name,
        "google_family_name": user.google_family_name,
        "logo_picture": user.logo_picture,
        "farm_name": user.farm_name,
        "about" : user.about,
        "phone_number_official": user.phone_number_official,
        "phone_number_whatsapp": user.phone_number_whatsapp,
        "phone_number_telegram": user.phone_number_telegram,
        "address" : user.address,
        "farmer_name" : user.farmer_name,
        "delivery_details" : user.delivery_details,
        "products" : user.products,
        "farm_site" : user.farm_site,
        "facebook" : user.facebook,
        "instagram" : user.instagram,
        "is_shipping" : user.is_shipping,
        "shipping_distance" : user.shipping_distance,
        "products_images_list": products_pictures,
        "farm_images_list": farm_pictures,
        "opening_hours": user.opening_hours,
        "closing_hours": user.closing_hours,
        'types_of_products' : user.types_of_products
    }
  
    return response_body

@app.route('/settings/<getemail>', methods=["PUT"])
@jwt_required() 
def update_my_settings(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401
    
    user = User.query.filter_by(email=getemail).first()
    json_data = request.form.get('jsonData')
    data = json.loads(json_data)
    print(data)
    user_posts = Post.query.filter_by(email=user.email).all()
    for post in user_posts:
        post.farmName = data.get("farm_name")
    # user.logo_picture = request.json['logo_picture']
    user.farm_name = data.get("farm_name")
    user.facebook = data.get('facebook')
    user.instagram = data.get('instagram')
    user.farm_site = data.get('farm_site')
    user.about = data.get('about')
    user.phone_number_official = data.get('phone_number_official')
    user.phone_number_whatsapp = data.get('phone_number_whatsapp')
    # user.phone_number_telegram = request.json['phone_number_telegram']
    user.address = data.get('address')
    user.farmer_name = data.get('farmer_name')
    user.delivery_details = data.get('delivery_details')
    user.products = data.get('products')
    user.is_shipping = data.get('is_shipping')
    user.shipping_distance = data.get('shipping_distance')
    user.opening_hours = data.get('opening_hours')
    user.closing_hours = data.get('closing_hours')
    user.types_of_products = data.get('types_of_products')
    labels = request.form.getlist('labels[]')
    print("labels",labels)
    if labels:
        for label in labels:
            if label == '4':
                # Delete logo images from the cloud
                if user.logo_picture:
                    delete_object_by_url(user.logo_picture)
                    user.logo_picture = default_logo  # Clear the list of URLs after deletion
                    for post in user_posts:
                        post.profilePicture = default_logo
            elif label == '5':
                if user.products_pictures:
                    # Delete product images from the cloud
                    urls = user.products_pictures.split(",")
                    for product_image_url in urls:
                        delete_object_by_url(product_image_url)
                    user.products_pictures = ""  # Clear the list of URLs after deletion
            elif label == '6':
                if user.farm_pictures:
                    # Delete farm images from the cloud
                    urls = user.farm_pictures.split(",")
                    for farm_image_url in urls:
                        delete_object_by_url(farm_image_url)
                    user.farm_pictures = ""  # Clear the list of URLs after deletion
    elements_to_remove = ['4','5','6']
    labels = [item for item in labels if item not in elements_to_remove]
    print("labelssss",labels)
    if 'files[]' not in request.files:
        None # do nothing
    else:
        products_images = []
        farm_images = []
        files = request.files.getlist('files[]')
        print("files", files)
        
        # Delete existing images from the cloud based on labels
        for label in labels:
            if label == '1':
                if user.logo_picture:
                    # Delete logo image from the cloud
                    delete_object_by_url(user.logo_picture)
                    user.logo_picture = default_logo
                    for post in user_posts:
                        post.profilePicture = default_logo
            elif label == '2':
                if user.products_pictures:
                    # Delete product images from the cloud
                    urls = user.products_pictures.split(",")
                    print("urls", urls)
                    for product_image_url in urls:
                        delete_object_by_url(product_image_url)
                    user.products_pictures = []  # Clear the list of URLs after deletion

            elif label == '3':
                if user.farm_pictures:
                    # Delete farm images from the cloud
                    urls = user.farm_pictures.split(",")
                    for farm_image_url in urls:
                        delete_object_by_url(farm_image_url)
                    user.farm_pictures = []  # Clear the list of URLs after deletion
            
        for i in range(len(files)):
            print("files:", files[i])
            image_filename = generate_unique_filename(files[i].filename)
            blob = bucket.blob(image_filename)
            blob.upload_from_file(files[i])

            # Generate public URL for the uploaded image
            image_url = f"https://storage.googleapis.com/{bucket_name}/{image_filename}"
            if labels[i] == "1":
                user.logo_picture = image_url
                for post in user_posts:
                    post.profilePicture = image_url
            elif labels[i] == "2":
                products_images.append(image_url)
            elif labels[i] == "3":
                print("farm_images", farm_images)
                farm_images.append(image_url)
        
        # Update products and farm images lists in the database
        if products_images:
            user.products_pictures = ','.join(products_images)
        if farm_images:
            user.farm_pictures = ','.join(farm_images)

    db.session.commit()

    return jsonify({
        "id": user.id,
        "profilePicture": user.logo_picture,
        "email": user.email
    })

##############################################

# MODELS

##############################################




from navbar_profile import getprofile_blueprint
app.register_blueprint(getprofile_blueprint)

from posts.routes import posts_blueprint
app.register_blueprint(posts_blueprint)

from posts.posts_sender import getposts_blueprint
app.register_blueprint(getposts_blueprint)

from posts.posts_filter import posts_filter_blueprint
app.register_blueprint(posts_filter_blueprint)

from posts.small_data import smalldata_blueprint
app.register_blueprint(smalldata_blueprint)

from posts.user_posts import userposts_blueprint
app.register_blueprint(userposts_blueprint)
 
from posts.updatePost import updatePost_blueprint
app.register_blueprint(updatePost_blueprint)

from posts.delete_post import deletepost_blueprint
app.register_blueprint(deletepost_blueprint)

from busCard import business_blueprint
app.register_blueprint(business_blueprint)

from farmFilt import farmfilter_blueprint
app.register_blueprint(farmfilter_blueprint)

 
if __name__ == "__main__":
    app.run(debug=True)
