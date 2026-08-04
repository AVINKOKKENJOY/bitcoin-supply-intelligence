from typing import Optional
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenContents(BaseModel):
    sub: Optional[int] = None