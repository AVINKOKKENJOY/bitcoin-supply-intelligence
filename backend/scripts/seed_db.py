import sys
import os
from datetime import datetime, timedelta, timezone
import random

# --- PATH HACK ---
# This ensures the script can see the 'app' directory even if run from different folders
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

# --- IMPORTS ---
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.supply import BitcoinSupply

def seed_data():
    """
    Creates 31 days of historical Bitcoin data for the professional dashboard.
    """
    # Initialize the session
    db: Session = SessionLocal()
    
    try:
        print("Starting Database Seeding Process...")
        
        # 1. Clear existing data to avoid duplicates
        print("-> Cleaning up existing Bitcoin metrics...")
        db.query(BitcoinSupply).delete()
        
        # 2. Generate and Insert Data
        print("-> Generating 31-day professional supply intelligence curve...")
        
        base_supply = 19685000.0
        base_price = 61500.0
        
        for i in range(31):
            # Calculate back from today
            target_date = datetime.now(timezone.utc) - timedelta(days=(30 - i))
            
            # Simulated realistic Bitcoin growth metrics
            current_supply = base_supply + (i * 900) + random.uniform(-15, 15)
            current_price = base_price + (i * 350) + random.uniform(-1200, 1200)
            
            new_entry = BitcoinSupply(
                timestamp=target_date,
                circulating_supply=current_supply,
                max_supply=21000000.0,
                liquid_supply=current_supply * 0.73,
                illiquid_supply=current_supply * 0.27,
                price_usd=current_price,
                market_cap_usd=current_supply * current_price
            )
            db.add(new_entry)
            
        # 3. Commit to Postgres
        db.commit()
        print("✅ SUCCESS: 31 data points successfully injected into PostgreSQL.")
        
    except Exception as e:
        print(f"❌ FATAL ERROR during seeding: {str(e)}")
        db.rollback()
    finally:
        db.close()
        print("-> Database connection closed.")

if __name__ == "__main__":
    seed_data()