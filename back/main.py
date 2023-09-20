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

origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:3000",
    "http://1.224.252.171:3000",
    "https://qualk.co.kr"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)