from flask import Blueprint, request, jsonify
from decorators.token_required import token_required
from managers.task_manager import TaskManager

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/api/tasks", methods=["GET"])
@token_required
def get_tasks():
    username = request.user
    tasks = TaskManager.get_tasks(username)
    tasks_data = [vars(task) for task in tasks]  # Convierte objetos a diccionario
    return jsonify(tasks_data), 200

@task_bp.route("/api/tasks", methods=["POST"])
@token_required
def create_task():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({"message": "Title and description are required"}), 400

    username = request.user
    try:
        new_task = TaskManager.create_task(title, description, username)
        return jsonify(vars(new_task)), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 400
