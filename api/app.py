from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users_router, categories_router, tasks_router

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], 
                   allow_credentials=True, allow_methods=["*"], 
                   allow_headers=["*"])
app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(categories_router, prefix="/categories", tags=["categories"])
app.include_router(tasks_router, prefix="/tasks", tags=["tasks"])
