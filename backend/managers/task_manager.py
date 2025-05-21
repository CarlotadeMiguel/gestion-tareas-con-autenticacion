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
