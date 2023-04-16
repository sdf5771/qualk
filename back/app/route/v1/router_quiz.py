from app.database.query import select, insert

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder

router = APIRouter(
    prefix="/api/v1/quiz"
)

#Top 3 question
@router.get("/{type}/top_3")
async def find_top(type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.view desc
        limit 3
    """
    result = select(sql=query)
    for i in result:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    return jsonable_encoder(result)

#Select question all
@router.get("/{type}/view/{last_index}")
async def find_view(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        ORDER BY question_view DESC,
				 question_id DESC
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    isLastData = False
    if len(data) < 6:
        isLastData = True
    result = { 
                'workbookData': data,
                'lastIndex': last_index + 6,
                'isLastData': isLastData,
             }
    return jsonable_encoder(result)

#Select question orderby create_date desc
@router.get("/{type}/new/{last_index}")
async def find_new(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.create_date desc,
                 question_id DESC
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    isLastData = False
    if len(data) < 6:
        isLastData = True
    result = { 
                'workbookData': data,
                'lastIndex': last_index + 6,
                'isLastData': isLastData,
             }
    return jsonable_encoder(result)

#Select question orderby create_date asc
@router.get("/{type}/old/{last_index}")
async def find_old(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.create_date asc,
                 question_id DESC
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    isLastData = False
    if len(data) < 6:
        isLastData = True
    result = { 
                'workbookData': data,
                'lastIndex': last_index + 6,
                'isLastData': isLastData,
             }
    return jsonable_encoder(result)

@router.get("/{quiz_type}/{quiz_id}")
async def find_problem(quiz_type: str, quiz_id: int):
    query = f"""
        SELECT content.content_id AS question_id,
               info.question_name AS question_name,
               content.type AS question_type,
			   content.content_list AS question_contents,
               content.correct AS question_correct,
               content.description AS question_description,
               info.reference_url AS question_reference
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.content_id = {quiz_id}
        and content.type = '{quiz_type}';
    """
    view = f"""
            update question_info set view = view + 1 where info_id = {quiz_id};
            """

    insert(sql=view)
    result = select(sql=query)

    if len(result) == 0:
        raise HTTPException(
            status_code=403, detail="no data"
        )
    
    for i in result:
        if i['question_contents'] is not None:
            try:
                i['question_contents'] = i['question_contents'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
        else:
            raise HTTPException(status_code=404, detail=f"{quiz_id} is Not found")
    return jsonable_encoder(result)
