from flask import Flask, jsonify, request
from flask_cors import CORS
import app as portfolio_app

# Initialize Flask application
flask_app = Flask(__name__)
CORS(flask_app)  # Enable CORS for all routes

# Register API routes
portfolio_app.create_api_routes(flask_app)

# Root route
@flask_app.route('/')
def index():
    return jsonify({"message": "DevFolio API is running"})

if __name__ == '__main__':
    flask_app.run(debug=True, host='0.0.0.0', port=5000) 