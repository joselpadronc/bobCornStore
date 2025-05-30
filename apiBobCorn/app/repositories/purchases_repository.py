from sqlalchemy.orm import Session
from app.models.purchase import Purchase
from datetime import datetime, timedelta
import uuid
from fastapi import HTTPException

def register_purchase(db: Session, username: str):
    now = datetime.utcnow()

    # Fetch last purchase from this user
    last_purchase = db.query(Purchase).filter(Purchase.username == username).order_by(Purchase.created_at.desc()).first()

    if last_purchase and now - last_purchase.created_at < timedelta(minutes=1):
        raise HTTPException(status_code=429, detail="Solo puedes comprar maiz una vez por minuto")

    # Register new purchase
    new_purchase = Purchase(username=username, created_at=now)
    db.add(new_purchase)
    db.commit()
    return {"message": "Compra realizada con exito", "status_code": 200}

def count_purchases_by_username(db: Session, username: str):
    return db.query(Purchase).filter(Purchase.username == username).count()
