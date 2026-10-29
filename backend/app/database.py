from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.config import settings

# Dialect-specific engine options
connect_args = {}
engine_kwargs = {
    "pool_pre_ping": True,
    "echo": False,
}

if settings.DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False
elif "mysql" in settings.DATABASE_URL:
    connect_args["charset"] = "utf8mb4"
    engine_kwargs["pool_recycle"] = 3600
    engine_kwargs["pool_size"] = 10
    engine_kwargs["max_overflow"] = 20

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    **engine_kwargs
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db_session():
    """Contextual or procedural session generator."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
