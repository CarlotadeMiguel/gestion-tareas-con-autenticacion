# backend/managers/auth_manager.py
#Lógica de autenticación (registro/login)

from werkzeug.security import check_password_hash
from models.datastore import DataStore
from models.user import User

class AuthManager:

    @staticmethod
    def register(username, password):
        if username in DataStore.users:
            raise ValueError("User already exists")
        DataStore.users[username] = User(username, password)

    @staticmethod
    def verify_credentials(username, password):
        user = DataStore.users.get(username)
        if not user or not check_password_hash(user.password, password):
            raise ValueError("Invalid credentials")
        return user
