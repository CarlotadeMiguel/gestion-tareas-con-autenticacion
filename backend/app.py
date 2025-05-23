# backend/app.py
from flask import Flask
from flask_cors import CORS
from config import config
from extensions import db, jwt 

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Inicializar extensiones
    db.init_app(app)
    jwt.init_app(app)
    
    # Configurar CORS después de inicializar app
    CORS(
        app,
        resources={r"/api/*": {
            "origins": "http://localhost:3000",
            "supports_credentials": True,
            "allow_headers": ["Authorization", "Content-Type"],
        }}
    )
    
    # Importar blueprints después de inicializar extensiones
    from routes.auth_routes import auth_bp
    from routes.task_routes import task_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(task_bp)
    
    return app

# Crear instancia de la aplicación
app = create_app('development')
