import sys
import os
from datetime import datetime, timedelta, timezone
import random

# Ensure the script recognizes 'backend' as the root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import specifically from the session module
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.supply import BitcoinSupply

def seed_data():
    # SessionLocal() is a factory call. This returns a Session object.
    db: Session = SessionLocal()
    try:
        print("--- BITCOIN SUPPLY INTELLIGENCE SEEDER ---")
        print("Cleaning database...")
        db.query(BitcoinSupply).delete()
        
        print("Generating 30-day supply curve...")
        for i in range(31):
            date = datetime.now(timezone.utc) - timedelta(days=(30 - i))
            supply_val = 19650000 + (i * 900) + random.uniform(-50, 50)
            price_val = 58000 + (i * 400) + random.uniform(-1000, 1000)
            
            entry = BitcoinSupply(
                timestamp=date,
                circulating_supply=supply_val,
                max_supply=21000000.0,
                liquid_supply=supply_val * 0.72,
                illiquid_supply=supply_val * 0.28,
                price_usd=price_val,
                market_cap_usd=supply_val * price_val
            )
            db.add(entry)
        
        db.commit()
        print("✅ Success: 30 data points injected.")
    except Exception as e:
        print(f"❌ Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()