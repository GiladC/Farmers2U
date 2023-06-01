from flask import Blueprint, request, jsonify
import datetime

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
posts_blueprint = Blueprint('posts', __name__)

@posts_blueprint.route('/api/posts', methods=['POST'])
def create_post():
    data = request.json
    print(data)

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


    # Validate highPrice >= lowPrice
    if data['highPrice'] < data['lowPrice']:
        return jsonify({'error': 'המחיר הגבוה צריך להיות גדול או שווה למחיר הנמוך בטווח'}), 400

    # Validate endTime > startTime
    start_time = datetime.datetime.strptime(data['startTime'], '%H:%M').time()
    end_time = datetime.datetime.strptime(data['endTime'], '%H:%M').time()
    if end_time <= start_time:
        return jsonify({'error': 'נא למלא טווח שעות תקין'}), 400

    # Creating a new post object with the validated data
    post = {
        'text': data['text'],
        'location': data['location'],
        'date': data['date'],
        'startTime': data['startTime'],
        'endTime': data['endTime'],
        'lowPrice': data['lowPrice'],
        'highPrice': data['highPrice'],
        'image': data.get('image', ''),  # Optional field, empty string if not provided
    }

    # Use SQLAlchemy to create and save the post to the database.
    # Example: post_model = Post(**post); db.session.add(post_model); db.session.commit()

    # Return a response indicating the success or failure of the post creation
    response = {'message': 'Post created successfully'}
    return jsonify(response), 201
