from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.supply.BitcoinSupply])
def read_supply_history(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve historical Bitcoin supply metrics.
    """
    supply_history = db.query(models.supply.BitcoinSupply).offset(skip).limit(limit).all()
    return supply_history

@router.post("/", response_model=schemas.supply.BitcoinSupply)
def create_supply_entry(
    *,
    db: Session = Depends(deps.get_db),
    supply_in: schemas.supply.BitcoinSupplyCreate
) -> Any:
    """
    Create a new supply data entry (Internal/Worker use).
    """
    db_obj = models.supply.BitcoinSupply(
        timestamp=supply_in.timestamp,
        circulating_supply=supply_in.circulating_supply,
        max_supply=supply_in.max_supply,
        liquid_supply=supply_in.liquid_supply,
        illiquid_supply=supply_in.illiquid_supply,
        price_usd=supply_in.price_usd,
        market_cap_usd=supply_in.market_cap_usd
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj
