from datetime import datetime, timedelta
from typing import Dict
from fastapi import HTTPException
from pydantic import BaseModel

class SuccessResponse(BaseModel):
    message: str
    status_code: int

class RateLimitResponse(BaseModel):
    detail: str

class ValidationErrorResponse(BaseModel):
    detail: str

# Simulación de almacenamiento temporal de compras por cliente
purchase_history: Dict[str, datetime] = {}

def process_buy(username: str) -> Dict[str, any]:
    now = datetime.utcnow()

    # Validar si el cliente ha comprado en el último minuto
    if username in purchase_history:
        last_purchase = purchase_history[username]
        if now - last_purchase < timedelta(minutes=1):
            raise HTTPException(status_code=429, detail="Solo puedes comprar maiz una sola vez por minuto")

    # Registrar la compra
    purchase_history[username] = now
    return {"message": "Compra realizada con exito.", "status_code": 200}
