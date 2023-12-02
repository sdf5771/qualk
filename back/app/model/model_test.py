from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class TestResult(Base):
    __tablename__ = 'TestResult'

    TestId = Column(String, primary_key=True)
    UserId = Column(String)
    TestType = Column(String)
    QuestionTotal = Column(Integer)
    QuestionCorrect = Column(Integer)
    TotalTime = Column(Integer)
    createDate = Column(Date)
    
