# backend/config.py
import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Configuración general
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY', 'mi-clave-secreta-desarrollo')

    # Configuración JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    # Configuración SSL para desarrollo
    SSL_CONTEXT = ('cert.pem', 'key.pem')  # Requiere generar certificados

    # Configuración de la base de datos
    basedir = os.path.abspath(os.path.dirname(__file__))

    SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(basedir, "gestion.db")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# Diccionario de configuraciones por entorno
config = {
    'development': Config,
    # otros entornos si es necesario
}