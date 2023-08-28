from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy import create_engine

# _CREATE_ENGINE = create_engine(f'mysql+pymysql://bijang:quddlr12@192.168.75.179:3306/qualk')

Base = declarative_base()

class terms_content(Base):
    __tablename__ = 'terms_content'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    required = Column(Integer)

    

    # content = relationship("QuestionContent", back_populates="info")