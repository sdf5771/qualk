from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class TermsContent(Base):
    __tablename__ = 'TermsContent'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    isRequired = Column(Integer)

class TermsContenthistory(Base):
    __tablename__ = 'TermsContenthistory'

    id = Column(Integer, primary_key=True)
    userId = Column(String, primary_key=True)
    hasAgreed = Column(Integer)
    