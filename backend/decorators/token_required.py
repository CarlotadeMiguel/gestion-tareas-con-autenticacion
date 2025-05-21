# backend/decorators/token_required.py
# Es una alternativa manual (personalizada) al decorador @jwt_required()

from functools import wraps
from flask import request, jsonify
from managers.auth_manager import AuthManager

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            decoded = AuthManager.validate_token(token)
            request.user = decoded['username']
        except ValueError as e:
            return jsonify({'message': str(e)}), 401

        return f(*args, **kwargs)
    return decorated
