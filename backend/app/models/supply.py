from datetime import datetime
from sqlalchemy import Float, DateTime, BigInteger
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from app.db.base_class import Base

class BitcoinSupply(Base):
    __tablename__ = "bitcoin_supply" # Overriding default
    
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, index=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), index=True)
    
    circulating_supply: Mapped[float] = mapped_column(Float, nullable=False)
    max_supply: Mapped[float] = mapped_column(Float, default=21000000.0)
    
    # Scarcity Metrics
    liquid_supply: Mapped[float] = mapped_column(Float, nullable=True)
    illiquid_supply: Mapped[float] = mapped_column(Float, nullable=True)
    
    price_usd: Mapped[float] = mapped_column(Float, nullable=True)
    market_cap_usd: Mapped[float] = mapped_column(Float, nullable=True)