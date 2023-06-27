from flask import Flask, request, jsonify, session
import os
from flask_bcrypt import Bcrypt #pip install Flask-Bcrypt = https://pypi.org/project/Flask-Bcrypt/
from datetime import datetime, timedelta, timezone
from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager #pip install Flask-JWT-Extended
from models import db, User
from werkzeug.utils import secure_filename #pip install Werkzeug
import json
# from flask_migrate import Migrate

 
app = Flask(__name__)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

app.config['SECRET_KEY'] = 'farmers2u'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
   db.create_all()

# migrate = Migrate(app, db)

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

from busCard import business_blueprint
app.register_blueprint(business_blueprint)

from farmFilt import farmfilter_blueprint
app.register_blueprint(farmfilter_blueprint)

UPLOAD_FOLDER = os.path.join('..', 'farmers_private', 'public', 'Form_images','Logo_image')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
  
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def generate_unique_filename(filename):
    from uuid import uuid4
    # Generate a unique filename by combining a random UUID and the original filename
    unique_filename = str(uuid4()) + '_' + filename
    return unique_filename

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/logintoken", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    #password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    # if email != "test" or password != "test":
    #    return {"msg": "Wrong rmail or password"}, 401
    
    # if user is None:
    #    return jsonify({"error": "Wrong email or password"}), 401
    
    if user is None:
        return jsonify({"error": "Wrong Email"}), 401
    
    #if not bcrypt.check_password_hash(user.password, password):
    #    return jsonify({"error": "Unauthorized"}), 401

    access_token = create_access_token(identity=email)
    #response = {"access_token": access_token}
    #return response

    return jsonify({
        "email": email,
        "access_token": access_token
    })
 
@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    print(request.files)
    if 'files[]' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    files = request.files.getlist('files[]')
      
    errors = {}
    success = False
      
    for file in files:      
        if file and allowed_file(file.filename):
            #filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            success = True
        else:
            resp = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp
         
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
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
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
        print("files are: ")
        #print(files)
        for i in range(len(files)):
            print(labels[i])
            print(files[i])
            print(files[i].filename)
            image_filename = generate_unique_filename(files[i].filename)
            if labels[i] == "1":           
                files[i].save(os.path.join('..','farmers_private', 'public', 'Form_images', 'Logo_image', image_filename))
                logo_image.append(image_filename)
            if labels[i] == "2":  
                files[i].save(os.path.join('..','farmers_private', 'public', 'Form_images', 'Products_images', image_filename))
                products_images.append(image_filename)
            if labels[i] == "3":
                files[i].save(os.path.join('..','farmers_private', 'public', 'Form_images', 'Farm_images', image_filename))
                farm_images.append(image_filename)

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
        return jsonify({"error": "Email already exists"}), 409
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
        "email": new_user.email
    })

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes = 30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        
        return response

    except (RuntimeError, KeyError):
        # no valid JWT
        return response
 
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
    # user.logo_picture = request.json['logo_picture']
    user.farm_name = request.json['farm_name']
    user.facebook = request.json['facebook']
    user.instagram = request.json["instagram"]
    user.farm_site = request.json["farm_site"]
    user.about = request.json['about']
    user.phone_number_official = request.json['phone_number_official']
    user.phone_number_whatsapp = request.json['phone_number_whatsapp']
    # user.phone_number_telegram = request.json['phone_number_telegram']
    user.address = request.json['address']
    user.farmer_name = request.json['farmer_name']
    user.delivery_details = request.json['delivery_information']
    user.products = request.json['products']
    user.is_shipping = request.json['is_shipping']
    user.shipping_distance = request.json['shipping_distance']
    user.opening_hours = request.json["opening_hours"]
    user.closing_hours = request.json["closing_hours"]
    user.types_of_products = request.json['types_of_products']
    
    db.session.commit()

    return jsonify({
        "id": user.id,
        "email": user.email
    })

 
if __name__ == "__main__":
    app.run(debug=True)
