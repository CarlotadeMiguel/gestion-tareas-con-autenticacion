# managers/auth_manager.py
from models.user import User
from extensions import db

class AuthManager:
    @staticmethod
    def register(username, password):
        # Verificar si el usuario ya existe
            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                raise ValueError("User already exists")
            
            # Crear nuevo usuario
            user = User(username=username)
            user.set_password(password)
            
            db.session.add(user)
            db.session.commit()
            return user
    
    @staticmethod
    def verify_credentials(username, password):
        user = User.query.filter_by(username=username).first()
        if not user or not user.check_password(password):
            raise ValueError("Invalid credentials")
        return user
    
    @staticmethod
    def create_admin(username, password):
        admin = User(username=username, role='admin')
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        return admin
