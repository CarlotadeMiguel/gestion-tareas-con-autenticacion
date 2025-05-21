from flask import Flask
from flask_cors import CORS
from config import *
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object('config')
CORS(app)
jwt = JWTManager(app)

# Registra tus blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(task_bp)

if __name__ == "__main__":
    app.run(debug=True)
