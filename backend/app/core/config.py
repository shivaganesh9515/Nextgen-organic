from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Next360 Organics"
    API_V1_STR: str = "/api/v1"
    
    # Database (Default to SQLite for local development to avoid Docker issues)
    # POSTGRES_USER: str = "nextgen_user"
    # POSTGRES_PASSWORD: str = "secure_password"
    # POSTGRES_SERVER: str = "localhost"
    # POSTGRES_PORT: str = "5432"
    # POSTGRES_DB: str = "nextgen_db"
    
    # Asynchronous Database URL (SQLite)
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return "sqlite+aiosqlite:///./nextgen.db"

    # Security
    SECRET_KEY: str = "replace_this_with_a_secure_key_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
