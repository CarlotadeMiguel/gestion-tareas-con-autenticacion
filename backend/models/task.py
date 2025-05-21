import uuid

class Task:
    def __init__(self, title, description, user_id):
        self.id = str(uuid.uuid4())
        self.title = title
        self.description = description
        self.user_id = user_id