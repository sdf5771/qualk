from fastapi import FastAPI
from route import question
import pandas as pd

app = FastAPI()

app.include_router(question.router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}
