# from fastapi import FastAPI
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import logging

# def _database_exist(engine, schema_name):
#     query = f"SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '{schema_name}'"
#     with engine.connect() as conn:
#         result_proxy = conn.execute(query)
#         result = result_proxy.scalar()
#         return bool(result)


# def _drop_database(engine, schema_name):
#     with engine.connect() as conn:
#         conn.execute(f"DROP DATABASE {schema_name};")


# def _create_database(engine, schema_name):
#     with engine.connect() as conn:
#         conn.execute(f"CREATE DATABASE {schema_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;")

# class SQLAlchemy:
#     """
#         싱글톤 으로 만들어 한 곳에서만 DB 커넥션 관리를 해주어야 함
#     """
#     def __init__(self, app: FastAPI = None, **kwargs):
#         self._engine = None
#         self._session = None
#         if app is not None:
#             self.init_app(app=app, **kwargs)

#     def init_app(self, app: FastAPI, **kwargs):
#         """
#         DB 초기화 함수
#         :param app: FastAPI 인스턴스
#         :param kwargs:
#         :return:
#         """
#         database_url = kwargs.get("DB_URL")
#         pool_recycle = kwargs.setdefault("DB_POOL_RECYCLE",900)
#         echo = kwargs.setdefault("DB_ECHO", True)

#         self._engine = create_engine(
#             database_url,
#             echo=echo,
#             pool_recycle=pool_recycle,
#             pool_pre_ping=True,
#         )

#         self._session = sessionmaker(autocommit=False, autoflush=False, bind=self._engine)

#         @app.on.event("startup")
#         def startup():
#             self._engine.connect()
#             logging.info("DB connected")

#         @app.on.event("shutdown")
#         def shutdown():
#             self._session.close_all()
#             self._engine.dispose()
#             logging.info("DB disconnected")

#     def get_db(self):
#         """
#         :return;
#         """
#         if self._session is None:
#             raise Exception("must be called 'init_app'")
#         db_session = None
#         try:    
#             db_session = self._session()
#             yield db_session
#         finally:
#             db_session.close()
    
#     @property
#     def session(self):
#         return self.get_db
    
#     @property
#     def engine(self):
#         return self._engine

# db = SQLAlchemy()
# Base = declarative_base()

