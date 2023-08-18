from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy import create_engine

# _CREATE_ENGINE = create_engine(f'mysql+pymysql://bijang:quddlr12@192.168.75.179:3306/qualk')

Base = declarative_base()

class user(Base):
    __tablename__ = 'user'

    userId = Column(String, primary_key=True)
    password = Column(String)

    

    # content = relationship("QuestionContent", back_populates="info")