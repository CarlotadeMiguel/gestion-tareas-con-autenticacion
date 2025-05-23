# backend/init_db.py
from app import create_app
from extensions import db
from models.user import User
from models.task import Task
from managers.auth_manager import AuthManager

def init_database():
    app = create_app('development')
    with app.app_context():
        db.create_all()
        
        # Crear usuario administrador
        if not User.query.filter_by(username='admin').first():
            AuthManager.create_admin('admin', 'admin_password')
            print("Usuario administrador creado")
        
        print("Base de datos inicializada correctamente")

if __name__ == '__main__':
    init_database()