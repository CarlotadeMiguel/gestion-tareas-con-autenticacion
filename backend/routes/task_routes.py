from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from managers.task_manager import TaskManager
task_bp = Blueprint("tasks", __name__)

@task_bp.route("/api/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    username = get_jwt_identity()
    tasks = TaskManager.get_tasks(username)
    tasks_data = [vars(task) for task in tasks]
    return jsonify(tasks_data), 200

@task_bp.route("/api/tasks", methods=["POST"])
@jwt_required()
def create_task():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({"message": "Title and description are required"}), 400

    username = get_jwt_identity()
    try:
        new_task = TaskManager.add_task(username, title, description)
        return jsonify(vars(new_task)), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
    
@task_bp.route("/api/tasks/<task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    username = get_jwt_identity()
    try:
        msg = TaskManager.delete_task(username, task_id)
        return jsonify({"message": msg}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
