# managers/task_manager.py
from models.task import Task, TaskStatus
from models.user import User
from extensions import db

class TaskManager:
    @staticmethod
    def get_tasks(username):
        user = User.query.filter_by(username=username).first()
        if not user:
            raise ValueError(f"Usuario '{username}' no existe")
        return user.tasks.all()
    
    @staticmethod
    def add_task(username, title, description, status=TaskStatus.PENDING):
        user = User.query.filter_by(username=username).first()
        if not user:
            raise ValueError(f"Usuario '{username}' no existe")
        
        task = Task(
            title=title,
            description=description,
            status=status,
            user_id=user.id
        )
        
        db.session.add(task)
        db.session.commit()
        return task
    
    @staticmethod
    def update_task_status(username, task_id, new_status):
        task = Task.query.filter_by(id=task_id, user_id=User.query.filter_by(username=username).first().id).first()
        if not task:
            raise ValueError(f"Tarea con id '{task_id}' no encontrada")
        
        task.status = new_status
        db.session.commit()
        return task
    
    @staticmethod
    def delete_task(username, task_id):
        user = User.query.filter_by(username=username).first()
        if not user:
            raise ValueError(f"Usuario '{username}' no existe")
        
        task = Task.query.filter_by(id=task_id, user_id=user.id).first()
        if not task:
            raise ValueError(f"Tarea con id '{task_id}' no encontrada")
        
        db.session.delete(task)
        db.session.commit()
        return 'Tarea eliminada con éxito'
    
    @staticmethod
    def get_all_tasks_admin():
        """Método para que el admin vea todas las tareas de todos los usuarios"""
        return Task.query.all()
    
    @staticmethod
    def get_all_users_admin():
        """Método para que el admin vea todos los usuarios"""
        return User.query.all()
