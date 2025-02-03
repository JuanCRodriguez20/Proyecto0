from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User
from config import get_db
from schema import UserSchema

users_router = APIRouter()

@users_router.get("/")
def get_users(db: Session = Depends(get_db)):
    """
    Get all users

    This endpoint retrieves all users from the database.

    Parameters:
    - db: Session: The database session dependency.

    Returns:
    - List of users.
    """
    users = db.query(User).all()
    return users

@users_router.post("/create")
def create_user(user: UserSchema, db: Session = Depends(get_db)):
    """
    Create a new user

    This endpoint creates a new user in the database.

    Parameters:
    - user: User: The user data to create.
    - db: Session: The database session dependency.

    Returns:
    - The created user.
    """
    new_user = User(name=user.name, password=user.password, avatar=user.avatar)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@users_router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get a user by ID

    This endpoint retrieves a user by their ID from the database.

    Parameters:
    - user_id: int: The ID of the user to retrieve.
    - db: Session: The database session dependency.

    Returns:
    - The user with the specified ID.
    - 404 error if the user is not found.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@users_router.put("/{user_id}")
def update_user(user_id: int, updated_user: UserSchema, db: Session = Depends(get_db)):
    """
    Update a user by ID

    This endpoint updates a user by their ID in the database.

    Parameters:
    - user_id: int: The ID of the user to update.
    - updated_user: User: The updated user data.
    - db: Session: The database session dependency.

    Returns:
    - The updated user.
    - 404 error if the user is not found.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    user.name = updated_user.name
    user.password = updated_user.password
    if updated_user.avatar is not None:
        user.avatar = updated_user.avatar
    db.commit()
    db.refresh(user)
    return user

@users_router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user by ID

    This endpoint deletes a user by their ID from the database.

    Parameters:
    - user_id: int: The ID of the user to delete.
    - db: Session: The database session dependency.

    Returns:
    - A message indicating that the user was deleted.
    - 404 error if the user is not found.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"detail": "User deleted"}