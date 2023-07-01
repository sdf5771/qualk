from pydantic import BaseModel

class Input_test(BaseModel):
    UserID: str
    TestType: str
    QuestionNum: int