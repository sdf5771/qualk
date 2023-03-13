import pandas as pd
from sqlalchemy import create_engine

_CREATE_ENGINE = create_engine(f'mysql+pymysql://bijang:quddlr12@192.168.75.179:3306/qualk')

def test():
    """
    INSERT INTO question_content (content_id, type, content_list, description)
    Select `문제 번호`,`자격증 종류`, group_concat(`항목`), MAX(`풀이`)
    FROM raw_data
    where `문제 번호` is not null
    group by `문제 번호`, `자격증 종류`;
 
    INSERT INTO question_info (info_id, question_name, reference_url, tag)
    Select `문제 번호`, MAX(`문제`), MAX(`참고자료 내용`), MAX(`키워드`) 
    FROM raw_data
    where `문제 번호` is not null
    group by `문제 번호`, `자격증 종류`;
 
    update question_content AS content
    inner join raw_data AS raw
	on content.content_id = raw.`문제 번호`
    set content.correct = raw.`index` % 4
    where raw.`정답여부` = 'O';
    """
    csv_data = pd.read_csv(r'test1.csv', encoding='utf8')
    csv_data['항목'] = csv_data['항목'].str.replace(',', '')
    csv_data.to_sql('raw_data',con=_CREATE_ENGINE, if_exists='replace')
    # csv_data['문제'] = csv_data['문제'].str.replace(',', '')
    # print(csv_data)



if __name__=="__main__":
    test()
