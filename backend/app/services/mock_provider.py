import random
from datetime import datetime, timezone
from app.services.bitcoin_provider import BitcoinDataProvider
from app.schemas.supply import BitcoinSupplyCreate

class MockBitcoinProvider(BitcoinDataProvider):
    async def get_latest_supply(self) -> BitcoinSupplyCreate:
        # Generate realistic fake Bitcoin data
        return BitcoinSupplyCreate(
            timestamp=datetime.now(timezone.utc),
            circulating_supply=19700000.0 + random.uniform(0, 100),
            max_supply=21000000.0,
            liquid_supply=15000000.0,
            illiquid_supply=4700000.0,
            price_usd=65000.0 + random.uniform(-1000, 1000),
            market_cap_usd=1200000000000.0
        )

    async def get_historical_supply(self, start_date: datetime, end_date: datetime):
        return [] # Placeholder for now