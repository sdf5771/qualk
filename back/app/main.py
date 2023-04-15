from fastapi import FastAPI
from back.app.route.v1 import quiz
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import uvicorn

app = FastAPI()
app.include_router(quiz.router)

origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost",
    "http://localhost:3000",
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