from datetime import datetime
from typing import Optional
from pydantic import BaseModel

# Shared properties
class BitcoinSupplyBase(BaseModel):
    circulating_supply: float
    max_supply: float = 21000000.0
    liquid_supply: Optional[float] = None
    illiquid_supply: Optional[float] = None
    price_usd: Optional[float] = None
    market_cap_usd: Optional[float] = None

# Properties to receive via API on creation
class BitcoinSupplyCreate(BitcoinSupplyBase):
    timestamp: datetime

# Properties to return via API
class BitcoinSupply(BitcoinSupplyBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
        