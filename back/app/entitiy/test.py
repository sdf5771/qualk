from pydantic import BaseModel

class Input_test(BaseModel):
    TestType: str
    QuestionNum: int