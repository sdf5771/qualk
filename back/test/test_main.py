from test.common.config import conf
from dataclasses import asdict

from fastapi import FastAPI
from test.router import test_found
from fastapi.middleware.cors import CORSMiddleware
# from app.database.conn import db
import pandas as pd
import uvicorn

def create_app():
    """
    
    """
    c = conf()
    app = FastAPI()
    conf_dict = asdict(c)
    # db.init_app(app, **conf_dict)
    # 미들 웨어 정의
    app.add_middleware(
        CORSMiddleware,
        allow_origins=conf().ALLOW_SITE,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    #router
    app.include_router(test_found.router)
    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)