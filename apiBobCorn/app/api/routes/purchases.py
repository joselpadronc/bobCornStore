from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.purchases_repository import register_purchase, count_purchases_by_username
from pydantic import BaseModel

router = APIRouter()

class PurchaseRequest(BaseModel):
    username: str

@router.post("/", summary="Make a purchase")
async def sell_corn(request: PurchaseRequest, db: Session = Depends(get_db)):
    return register_purchase(db, request.username)

@router.get("/{username}/count", summary="Get purchase count by username")
async def count_purchases(username: str, db: Session = Depends(get_db)):
    count = count_purchases_by_username(db, username)
    return {"count": count}
