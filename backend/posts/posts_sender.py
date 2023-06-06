from flask import jsonify, Blueprint
from app import app
from models import Post  # Assuming you have defined the Post model in a separate file

getposts_blueprint = Blueprint('getposts', __name__)

@app.route('/api/getposts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    post_list = []

    for post in posts:
        post_dict = {
            'farmName': post.farmName,
            'profilePicture': post.profilePicture,
            'photo': post.photo,
            'desc': post.desc,
            'posted': post.posted,
            'date': post.event_date.strftime('%m/%d/%Y') if post.event_date else None,
            'price': post.price,
            'location': post.location,
            'when_posted_date': post.date,
            'when_posted_time': post.time,
            'id': post.id,
        }
        post_list.append(post_dict)

    # The next line ensures the posts are sorted such that the latest posts are presented first.
    post_list.sort(key=lambda post: (post['when_posted_date'], post['when_posted_time']), reverse=True)

    return jsonify(post_list)