from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class auth_token(Base):
    __tablename__ = 'auth_token'

    id = Column(Integer, primary_key=True)
    userId = Column(String)
    token = Column(String)

