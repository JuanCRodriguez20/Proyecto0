from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Category
from config import get_db
from schema import CategorySchema

categories_router = APIRouter()

@categories_router.get("/")
def get_categories(db: Session = Depends(get_db)):
    """
    Get all categories

    This endpoint retrieves all categories from the database.

    Parameters:
    - db: Session: The database session dependency.

    Returns:
    - List of categories.
    """
    categories = db.query(Category).all()
    return categories

@categories_router.post("/create")
def create_category(category: CategorySchema, db: Session = Depends(get_db)):
    """
    Create a new category

    This endpoint creates a new category in the database.

    Parameters:
    - category: category: The category data to create.
    - db: Session: The database session dependency.

    Returns:
    - The created category.
    """
    new_category = Category(name=category.name, description=category.description)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

@categories_router.get("/{category_id}")
def get_category(category_id: int, db: Session = Depends(get_db)):
    """
    Get a category by ID

    This endpoint retrieves a category by their ID from the database.

    Parameters:
    - category_id: int: The ID of the category to retrieve.
    - db: Session: The database session dependency.

    Returns:
    - The category with the specified ID.
    - 404 error if the category is not found.
    """
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@categories_router.put("/{category_id}")
def update_category(category_id: int, updated_category: CategorySchema, db: Session = Depends(get_db)):
    """
    Update a category by ID

    This endpoint updates a category by their ID in the database.

    Parameters:
    - category_id: int: The ID of the category to update.
    - updated_category: category: The updated category data.
    - db: Session: The database session dependency.

    Returns:
    - The updated category.
    - 404 error if the category is not found.
    """
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    category.name = updated_category.name
    category.description = updated_category.description
    db.commit()
    db.refresh(category)
    return category

@categories_router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    """
    Delete a category by ID

    This endpoint deletes a category by their ID from the database.

    Parameters:
    - category_id: int: The ID of the category to delete.
    - db: Session: The database session dependency.

    Returns:
    - A message indicating that the category was deleted.
    - 404 error if the category is not found.
    """
    category = db.query(Category).filter(Category.id == category_id).first()
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(category)
    db.commit()
    return {"detail": "Category deleted"}