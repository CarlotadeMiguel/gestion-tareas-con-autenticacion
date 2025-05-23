# models/task.py
import enum
from datetime import datetime
from extensions import db
from sqlalchemy import Enum
from sqlalchemy.orm import relationship

class TaskStatus(enum.Enum):
    PENDING = "pendiente"
    IN_PROGRESS = "en_ejecucion"
    COMPLETED = "completada"

class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(Enum(TaskStatus), default=TaskStatus.PENDING, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign key to User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relación many-to-one con User
    user = relationship('User', back_populates='tasks')
    
    def __repr__(self):
        return f'<Task {self.title} - {self.status.value}>'
