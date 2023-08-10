from flask import jsonify, request, Blueprint
from app import app
from models import Post

getowner_blueprint = Blueprint('get_owner', __name__)

@app.route('/api/get_owner', methods=['POST'])
def get_owner():
    data = request.form.to_dict()
    post = Post.query.filter_by(id=data['id']).first()
    
    if post:
        email = post.email
        return jsonify({'email': email}), 200
    else:
        return jsonify({'error': 'הפוסט לא נמצא'}), 404
