from flask import Blueprint, make_response, request, jsonify
from flask_jwt_extended import create_access_token
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
        AuthManager.register(username, password)
        access_token = create_access_token(identity=username)
        resp = make_response(jsonify({"msg": "login successful"}), 200)
        resp.set_cookie("token", access_token, httponly=True, samesite='Lax')
        return resp
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
        user = AuthManager.verify_credentials(username, password)
        access_token = create_access_token(identity=user.username)
        resp = make_response(jsonify({"msg": "login successful"}), 200)
        resp.set_cookie("token", access_token, httponly=True, samesite='Lax')
        return resp
    except ValueError as e:
        return jsonify({"message": str(e)}), 401
