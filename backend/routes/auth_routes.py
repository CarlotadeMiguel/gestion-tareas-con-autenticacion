from flask import Blueprint, request, jsonify
from managers.auth_manager import AuthManager

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    try:
        AuthManager.register_user(username, password)
        return jsonify({"message": "User registered successfully"}), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    try:
        token = AuthManager.login_user(username, password)
        return jsonify({"token": token}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 401
