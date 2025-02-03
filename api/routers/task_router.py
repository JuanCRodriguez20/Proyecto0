from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Task, User
from config import get_db
from schema import TaskSchema

tasks_router = APIRouter()

@tasks_router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    """
    Get all task

    This endpoint retrieves all task from the database.

    Parameters:
    - db: Session: The database session dependency.

    Returns:
    - List of task.
    """
    task = db.query(Task).all()
    return task

@tasks_router.post("/create")
def create_task(task: TaskSchema, db: Session = Depends(get_db)):
    """
    Create a new task

    This endpoint creates a new task in the database.

    Parameters:
    - task: TaskSchema: The task data to create.
    - db: Session: The database session dependency.

    Returns:
    - The created task.
    """
    new_task = Task(
        text_task=task.text_task,
        start_date=task.start_date,
        end_date=task.end_date,
        state=task.state,
        user_id=task.user_id,
        category_id= task.category_id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@tasks_router.get("/{task_id}")
def get_task(task_id: int, db: Session = Depends(get_db)):
    """
    Get a task by ID

    This endpoint retrieves a task by their ID from the database.

    Parameters:
    - task_id: int: The ID of the task to retrieve.
    - db: Session: The database session dependency.

    Returns:
    - The task with the specified ID.
    - 404 error if the task is not found.
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@tasks_router.put("/{task_id}")
def update_task(task_id: int, updated_task: TaskSchema, db: Session = Depends(get_db)):
    """
    Update a task by ID

    This endpoint updates a task by their ID in the database.

    Parameters:
    - task_id: int: The ID of the task to update.
    - updated_user: Task: The updated task data.
    - db: Session: The database session dependency.

    Returns:
    - The updated task.
    - 404 error if the task is not found.
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task.text_task = updated_task.text_task
    task.end_date = updated_task.end_date
    task.state = updated_task.state
    task.user_id = updated_task.user_id
    task.category_id = updated_task.category_id
    db.commit()
    db.refresh(task)
    return task

@tasks_router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task by ID

    This endpoint deletes a task by their ID from the database.

    Parameters:
    - task_id: int: The ID of the task to delete.
    - db: Session: The database session dependency.

    Returns:
    - A message indicating that the task was deleted.
    - 404 error if the task is not found.
    """
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted"}

@tasks_router.get("/user/{user_id}")
def get_tasks_by_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get tasks by user ID

    This endpoint retrieves all tasks for a user by their ID from the database.

    Parameters:
    - user_id: int: The ID of the user whose tasks to retrieve.
    - db: Session: The database session dependency.

    Returns:
    - List of tasks for the specified user.
    - 404 error if the user is not found.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    return tasks