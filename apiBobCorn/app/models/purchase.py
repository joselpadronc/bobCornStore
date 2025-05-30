from sqlalchemy import Column, String, DateTime, Integer
from datetime import datetime
from app.core.database import Base

class Purchase(Base):
    __tablename__ = "purchases"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(255), index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
