from flask import jsonify, request, Blueprint
from app import app
from models import Post  
from models import User

userposts_blueprint = Blueprint('getuserposts', __name__)

@app.route('/api/getuserposts', methods=['POST'])
def get_user_posts():
    data = request.form.to_dict()
    print(data)
    posts = Post.query.filter_by(email=data['email']).all()

    post_list = []
    for post in posts:
        post_dict = {
            'farmName': post.farmName,
            'profilePicture': post.profilePicture,
            'photo': post.photo,
            'desc': post.desc,
            'posted': post.posted,
            'date': post.event_date.strftime('%m/%d/%Y') if post.event_date else None,
            'location': post.location,
            'when_posted_date': post.date,
            'when_posted_time': post.time,
            'id': post.id,
            'time': post.time_range,
        }
        post_list.append(post_dict)

    print(post_list)

    post_list.sort(key=lambda post: (post['when_posted_date'], post['when_posted_time']), reverse=True)

    return jsonify(post_list), 201