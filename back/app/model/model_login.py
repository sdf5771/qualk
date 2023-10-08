from sqlalchemy import Column, Integer, String, ForeignKey, VARCHAR, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class user(Base):
    __tablename__ = 'user'

    userId = Column(String, primary_key=True)
    password = Column(String)
    emailCheck = Column(Integer)

class AuthToken(Base):
    __tablename__ = 'auth_token'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(VARCHAR(50), nullable=False)
    token = Column(VARCHAR(256))
    createDate = Column(Date)
    