from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# 1. Create the database engine
# pool_pre_ping=True ensures the connection is alive before using it
engine = create_engine(
    settings.DATABASE_URL, 
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=False
)

# 2. Create a session factory
# This returns a CLASS that we can call like a function: SessionLocal()
SessionLocal = sessionmaker(
    autocommit=False, 
    autoflush=False, 
    bind=engine
)

# 3. Dependency used by FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()