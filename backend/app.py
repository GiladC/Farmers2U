from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt #pip install Flask-Bcrypt = https://pypi.org/project/Flask-Bcrypt/
from datetime import datetime, timedelta, timezone
from flask_cors import CORS, cross_origin #ModuleNotFoundError: No module named 'flask_cors' = pip install Flask-Cors
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager #pip install Flask-JWT-Extended
from models import db, User
 
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

    
from posts.routes import posts_blueprint
app.register_blueprint(posts_blueprint)

 
@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/logintoken", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    # if email != "test" or password != "test":
    #    return {"msg": "Wrong rmail or password"}, 401
    
    if user is None:
        return jsonify({"error": "Wrong email or password"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    access_token = create_access_token(identity=email)
    #response = {"access_token": access_token}
    #return response

    return jsonify({
        "email": email,
        "access_token": access_token
    })
 
@app.route("/signup", methods=["POST"])
def signup():
    farmName = request.json["farmName"]
    email = request.json["email"]
    password = request.json["password"]
    about = request.json["about"]
    phoneNumber1 = request.json["phoneNumber1"]
    phoneNumber2 = request.json["phoneNumber2"]
    city = request.json["city"]
    address = request.json["address"]
    farmerName = request.json["farmerName"]
    prices = request.json["prices"]
    products = request.json["products"]
    facebook = request.json["facebook"]
    instagram = request.json["instagram"]

 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    #new_user = User(name="tamir20",email=email, password=hashed_password, about="sample check")
    #new_user = User(name= "gilad", email=email, password=hashed_password, about="I am Gilad, a farmer.")
    new_user = User(farmName=farmName, email=email, password=hashed_password, about = about, 
                    phoneNumber1 = phoneNumber1, phoneNumber2 = phoneNumber2,
                      city = city, address = address, farmerName = farmerName,
                      prices= prices,products= products,facebook = facebook, instagram = instagram)
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
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
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
        "farmName": user.farmName,
        "phoneNumber1": user.phoneNumber1,
        "phoneNumber2": user.phoneNumber2,
        "about" : user.about,
        "address" : user.address,
        "city" : user.city,
        "farmerName" : user.farmerName,
        "prices" : user.prices,
        "products" : user.products,
        "facebook" : user.facebook,
        "instagram" : user.instagram,
    }
  
    return response_body

 
if __name__ == "__main__":
    app.run(debug=True)