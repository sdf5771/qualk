from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

_CREATE_ENGINE = create_engine(f'mysql+pymysql://bijang:quddlr12@192.168.75.179:3306/qualk')

Base = declarative_base()

class QuestionContent(Base):
    __tablename__ = 'QuestionContent'

    ContentID = Column(Integer, primary_key=True)
    Correct = Column(Integer)
    Title = Column(String)
    ReferenceURL = Column(String)
    ContentList = Column(String)
    Description = Column(String)
    lang = Column(String)
    
    # info = relationship("QuestionInfo", uselist=False, back_populates="content")

class QuestionInfo(Base):
    __tablename__ = 'QuestionInfo'

    ContentID = Column(Integer, primary_key=True)
    view = Column(Integer)
    Title = Column(String)
    Tag = Column(String)
    CreateDate = Column(String)
    Type = Column(String)
    

    # content = relationship("QuestionContent", back_populates="info")