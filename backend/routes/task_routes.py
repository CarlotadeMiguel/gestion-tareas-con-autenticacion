# routes/task_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from managers.task_manager import TaskManager
from models.task import TaskStatus
from models.user import User

task_bp = Blueprint("tasks", __name__)

@task_bp.route("/api/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    
    # Si es admin, puede ver todas las tareas
    if user.role == 'admin':
        tasks = TaskManager.get_all_tasks_admin()
    else:
        tasks = TaskManager.get_tasks(username)
    
    tasks_data = [{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status.value,
        'created_at': task.created_at.isoformat(),
        'user_id': task.user_id
    } for task in tasks]
    
    return jsonify(tasks_data), 200

@task_bp.route("/api/tasks", methods=["POST"])
@jwt_required()
def create_task():
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    status = data.get("status", TaskStatus.PENDING.value)
    
    if not title or not description:
        return jsonify({"message": "Title and description are required"}), 400
    
    try:
        # Convertir string a enum
        task_status = TaskStatus(status)
    except ValueError:
        return jsonify({"message": "Invalid status"}), 400
    
    username = get_jwt_identity()
    try:
        new_task = TaskManager.add_task(username, title, description, task_status)
        return jsonify({
            'id': new_task.id,
            'title': new_task.title,
            'description': new_task.description,
            'status': new_task.status.value,
            'created_at': new_task.created_at.isoformat()
        }), 201
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

@task_bp.route("/api/tasks/<int:task_id>/status", methods=["PUT"])
@jwt_required()
def update_task_status(task_id):
    data = request.get_json()
    new_status = data.get("status")
    
    if not new_status:
        return jsonify({"message": "Status is required"}), 400
    
    try:
        status_enum = TaskStatus(new_status)
    except ValueError:
        return jsonify({"message": "Invalid status"}), 400
    
    username = get_jwt_identity()
    try:
        updated_task = TaskManager.update_task_status(username, task_id, status_enum)
        return jsonify({
            'id': updated_task.id,
            'status': updated_task.status.value
        }), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 400

@task_bp.route("/api/admin/users", methods=["GET"])
@jwt_required()
def get_all_users():
    username = get_jwt_identity()
    user = User.query.filter_by(username=username).first()
    
    if user.role != 'admin':
        return jsonify({"message": "Access denied"}), 403
    
    users = TaskManager.get_all_users_admin()
    users_data = [{
        'id': user.id,
        'username': user.username,
        'role': user.role,
        'task_count': user.tasks.count()
    } for user in users]
    
    return jsonify(users_data), 200
