import sys
import os
from datetime import datetime, timedelta, timezone
import random

# Add the parent directory to path so we can import 'app'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.supply import BitcoinSupply

def seed_data():
    db: Session = SessionLocal()
    print("Deleting old data...")
    db.query(BitcoinSupply).delete()
    
    print("Seeding new Bitcoin intelligence data...")
    
    base_supply = 19600000.0
    base_price = 55000.0
    
    # Create 30 days of data
    for i in range(30):
        target_date = datetime.now(timezone.utc) - timedelta(days=(30 - i))
        
        # Realistic daily growth
        daily_supply = base_supply + (i * 900) + random.uniform(-50, 50)
        daily_price = base_price + (i * 400) + random.uniform(-1000, 1000)
        
        entry = BitcoinSupply(
            timestamp=target_date,
            circulating_supply=daily_supply,
            max_supply=21000000.0,
            liquid_supply=daily_supply * 0.75,
            illiquid_supply=daily_supply * 0.25,
            price_usd=daily_price,
            market_cap_usd=daily_supply * daily_price
        )
        db.add(entry)
    
    db.commit()
    db.close()
    print("Database successfully seeded with 30 data points!")

if __name__ == "__main__":
    seed_data()