import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

# Configuración general
DEBUG = True
SECRET_KEY = os.environ.get('SECRET_KEY', 'mi-clave-secreta-desarrollo')

# Configuración JWT
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', SECRET_KEY)
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

# Configuración SSL para desarrollo
SSL_CONTEXT = ('cert.pem', 'key.pem')  # Requiere generar certificados