from abc import ABC, abstractmethod
from datetime import datetime
from app.schemas.supply import BitcoinSupplyCreate

class BitcoinDataProvider(ABC):
    @abstractmethod
    async def get_latest_supply(self) -> BitcoinSupplyCreate:
        """Fetch the most recent supply metrics."""
        pass

    @abstractmethod
    async def get_historical_supply(self, start_date: datetime, end_date: datetime):
        """Fetch historical supply range."""
        pass