from fastapi import APIRouter
from app.api.v1.endpoints import login, supply

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(supply.router, prefix="/supply", tags=["bitcoin-supply"])