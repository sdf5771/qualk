import pandas as pd
from sqlalchemy import create_engine

_CREATE_ENGINE = create_engine(f'mysql+pymysql://bijang:quddlr12@192.168.75.179:3306/qualk')

def test():
    csv_data = pd.read_csv(r'qualk_en.csv', encoding='cp949')
    csv_data.to_sql('raw_data',con=_CREATE_ENGINE, if_exists='append')

if __name__=="__main__":
    test()
