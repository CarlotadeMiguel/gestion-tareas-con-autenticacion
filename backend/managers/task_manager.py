# backend/managers/task_manager.py
# Gestión de tareas (crear, obtener)

from models.datastore import DataStore
from models.task import Task

class TaskManager:

    @staticmethod
    def get_tasks(username):
        return DataStore.users[username].tasks

    @staticmethod
    def add_task(username, title, description):
        user = DataStore.users[username]
        task = Task(title, description, username)
        user.tasks.append(task)
        return task

    @staticmethod
    def delete_task(username, task_id):
        user = DataStore.users.get(username)
        if not user:
            raise ValueError(f"Usuario '{username}' no existe")
        # Buscar la tarea por id
        task_to_delete = next((task for task in user.tasks if str(task.id) == str(task_id)), None)
        if not task_to_delete:
            raise ValueError(f"Tarea con id '{task_id}' no encontrada")
        user.tasks.remove(task_to_delete)
        return 'Tarea eliminada con éxito'
