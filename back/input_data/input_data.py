import pandas as pd

_CREATE_ENGINE = create_engine

def test():
    csv_data = pd.read_csv(r'qualk_en.csv', encoding='cp949')
    print(csv_data)

test()