from flask import jsonify, request, Blueprint
from app import app
from models import Post, User, db
from geopy.geocoders import Nominatim
import datetime
import os
from werkzeug.utils import secure_filename




updatePost_blueprint = Blueprint('update_post', __name__)

def generate_unique_filename(filename):
    from uuid import uuid4
    # Generate a unique filename by combining a random UUID and the original filename
    unique_filename = str(uuid4()) + '_' + filename
    return unique_filename


@app.route('/api/update_post', methods=['POST'])
def update_post():
    data = request.form.to_dict()
    print(data)


    # Validate data
    if 'text' not in data or not data['text'] or data['text'] == 'undefined':
        return jsonify({'error': 'נא למלא את שדה הטקסט'}), 400

    if 'location' not in data or not data['location'] or data['location'] == 'undefined':
        return jsonify({'error': 'נא למלא את שדה המיקום'}), 400

    if 'date' not in data or not data['date'] :
        return jsonify({'error': 'נא למלא את שדה התאריך'}), 400

    if 'startTime' not in data or not data['startTime']:
        return jsonify({'error': 'נא למלא את שדה שעת התחלה'}), 400

    if 'endTime' not in data or not data['endTime']:
        return jsonify({'error': 'נא למלא את שדה שעת סיום'}), 400
    
    if 'email' not in data or not data['email']:
        return jsonify({'error': 'חלה תקלה. נא להתחבר לאתר מחדש.'}), 400
    

    # Validate that the location is an actual address
    geolocator = Nominatim(user_agent="farmers2u_website")
    address = geolocator.geocode(data['location'])
    if address is None:
        return jsonify({'error': 
                            'נא למלא כתובת מדויקת בשדה המיקום או להשאיר ריק אם לא רוצים לסנן לפי כתובת'
                            }), 400
    
    # Validate endTime > startTime
    start_time = datetime.datetime.strptime(data['startTime'], '%H:%M').time()
    end_time = datetime.datetime.strptime(data['endTime'], '%H:%M').time()
    if end_time <= start_time:
        return jsonify({'error': 'נא למלא טווח שעות תקין'}), 400
    
    # Validates the email is actually a correct email of a registered account. If it is not, then something wrong happened.
    user = User.query.filter_by(email=data['email']).first()
    if user is None:
        return jsonify({'error': 'חלה תקלה, נא להתחבר מחדש למערכת.'}), 400
    

    post_image_filename = None

    post_image = request.files.get('image')
    if post_image:
        # Check if the uploaded file is an image of JPEG or PNG format
        allowed_extensions = {'jpg', 'jpeg', 'png'}
        if post_image.filename.split('.')[-1].lower() not in allowed_extensions:
            return jsonify({'error': 'מותר לצרף תמונות בפורמט PNG, JPEG או JPG בלבד.'}), 400
        
        post_image_filename = generate_unique_filename(secure_filename(post_image.filename))
        #post_image_path = os.path.join('posts', 'post_images', post_image_filename)
        post_image_path = os.path.join('..', 'farmers2u_proj', 'public', 'Board_images', post_image_filename)
        post_image.save(post_image_path)


    time_range = f"{data['endTime']}-{data['startTime']}"

    product_types = data.get('products')
    if product_types:
        product_types = product_types.split(',')

    post = Post.query.get(data['post_id'])
    if post_image:
        post.photo = post_image_filename

    post.desc = data.get('text')
    post.location = data.get('location')
    post.latitude = address.latitude
    post.longitude = address.longitude
    post.event_date = datetime.datetime.strptime(data["date"], "%Y-%m-%d").date()
    post.time_range = time_range
    post.products = product_types
    post.isOrganic = data.get('isOrganic') == "true"
    post.isVegan = data.get('isVegan') == "true" 

    db.session.commit()

    response = {'message': 'Post updated successfully'}
    return jsonify(response), 201