from flask import Blueprint, request, jsonify
import datetime
from models import User, Post, db
import os
import pytz
from werkzeug.utils import secure_filename


'''
Assumption:
AddPost.jsx is supposed to use this route. It sends a POST request with
the new post made and the data is:
{
    text: ?,
    location: ?,
    date: ?,
    startTime: ?,
    endTime: ?,
    lowPrice: ?,
    highPrice: ?,
    image: ?,
}
'''
def generate_unique_filename(filename):
    from uuid import uuid4
    # Generate a unique filename by combining a random UUID and the original filename
    unique_filename = str(uuid4()) + '_' + filename
    return unique_filename


posts_blueprint = Blueprint('posts', __name__)

@posts_blueprint.route('/api/posts', methods=['POST'])
def create_post():
    data = request.form.to_dict()

    # Validate data
    if 'text' not in data or not data['text']:
        return jsonify({'error': 'נא למלא את שדה הטקסט'}), 400

    if 'location' not in data or not data['location']:
        return jsonify({'error': 'נא למלא את שדה המיקום'}), 400

    if 'date' not in data or not data['date']:
        return jsonify({'error': 'נא למלא את שדה התאריך'}), 400

    if 'startTime' not in data or not data['startTime']:
        return jsonify({'error': 'נא למלא את שדה שעת התחלה'}), 400

    if 'endTime' not in data or not data['endTime']:
        return jsonify({'error': 'נא למלא את שדה שעת סיום'}), 400

    if 'lowPrice' not in data or not data['lowPrice']:
        return jsonify({'error': 'נא למלא את שדה המחיר הנמוך ביותר בטווח'}), 400

    if 'highPrice' not in data or not data['highPrice']:
        return jsonify({'error': 'נא למלא את שדה המחיר הגבוה ביותר בטווח'}), 400
    
    if 'email' not in data or not data['email']:
        return jsonify({'error': 'חלה תקלה. נא להתחבר לאתר מחדש.'}), 400


    # Validate highPrice >= lowPrice
    if int(data['highPrice']) < int(data['lowPrice']):
        return jsonify({'error': 'המחיר הגבוה צריך להיות גדול או שווה למחיר הנמוך בטווח'}), 400

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


    #Here we will also get the profile picture once it is implemented for the User.


    israel_timezone = pytz.timezone('Asia/Jerusalem')  # Set the time zone to IST (Israel Standard Time)
    current_time = datetime.datetime.now(israel_timezone)
    price = f"{data['highPrice']} - {data['lowPrice']} שקלים"
    time_range = f"{data['endTime']}-{data['startTime']}"

    new_post = Post(
        farmName = user.farmName,
        profilePicture = None, #profilePicture = user.profilePicture,
        photo = post_image_filename,
        desc = data.get('text'),
        date = current_time.date(),
        time = current_time.strftime('%H:%M:%S'),
        location = data.get('location'),
        price = price,
        event_date = datetime.datetime.strptime(data["date"], "%Y-%m-%d").date(),  # Convert to date object
        time_range = time_range,
    ) 
    db.session.add(new_post)
    db.session.commit()

    
    

    # Creating a new post object with the validated data
    

    
    # Use SQLAlchemy to save the post to the database.
    # Example: post_model = Post(**post); db.session.add(post_model); db.session.commit()

    # Return a response indicating the success or failure of the post creation
    response = {'message': 'Post created successfully'}
    return jsonify(response), 201
