from fastapi import FastAPI
from route import question
import pandas as pd
import uvicorn

app = FastAPI()
app.include_router(question.router)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)