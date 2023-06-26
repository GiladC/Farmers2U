from flask import jsonify, request, Blueprint
from app import app
from models import Post  
from models import User

smalldata_blueprint = Blueprint('small_data', __name__)

@app.route('/api/small_data', methods=['POST'])
def small_data():
    data = request.form.to_dict()
    print(data)
    user = User.query.filter_by(email=data['email']).first()


    small_data = { 'profilePicture': None, 'profileName': user.farmName }
    print(small_data)
    return jsonify(small_data), 201