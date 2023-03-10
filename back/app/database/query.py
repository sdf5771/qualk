from dotenv import load_dotenv
import pymysql
import os

load_dotenv(verbose=True)


_DB_ID = os.getenv('DB_ID')
_DB_PASS = os.getenv('DB_PASS')
_DB_IP = os.getenv('DB_IP')
_DB_SCHEMA = os.getenv('DB_SCHEMA')
_DB_PORT = os.getenv('DB_PORT')

#connection decorator
def conn(sql):
    connection = pymysql.connect(
    user='root',
    password='520496',
    host='localhost',
    port=int('3306'),
    db='qualk',
    charset='utf8'
    )

    def _QUERY(*args, **kwargs):
        result = ''
        try:
            result = sql(conn=connection, *args, **kwargs)
        except Exception as e:
            connection.rollback()
        else:
            connection.commit()
        return result
    return _QUERY

#Select_dict
@conn
def select(conn, sql):
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(sql)
    return cursor.fetchall()




