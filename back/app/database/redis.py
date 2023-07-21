import os
import redis

from dotenv import load_dotenv

load_dotenv()

def redis_connect():
    try:
        REDIS_HOST = str = os.getenv("REDIS_HOST")
        REDIS_PORT = integer = os.getenv("REDIS_PORT")
        REDIS_DATABASE = integer = os.getenv("REDIS_DATABASE")
        return redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)
    except:
        print("redis connection failure")
