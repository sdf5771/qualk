from pydantic import BaseModel

class quiz(BaseModel):
    id: int
    grade: int
    playtime: int
    name: str
    canonical_name: str
    director: str
    genre: str
    casts: str
    seen_url: str