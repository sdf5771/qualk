from fastapi import FastAPI
from app.route.v1 import router_quiz, router_login, router_test, \
                         router_signup, router_upload
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import uvicorn

app = FastAPI()
app.include_router(router_quiz.router)
app.include_router(router_login.router)
app.include_router(router_test.router)
app.include_router(router_signup.router)
app.include_router(router_upload.router)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 특정 도메인을 지정하거나 모든 도메인을 허용하려면 "*" 사용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)