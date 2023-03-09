from database.query import select

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder

router = APIRouter()

# fast_api reference 
# @router.get("/")
# async def read_items():
#     return fake_items_db

# @router.get("/{item_id}")
# async def read_item(item_id: str):
#     if item_id not in fake_items_db:
#         raise HTTPException(status_code=404, detail="Item not found")
#     return {"name": fake_items_db[item_id]["name"], "item_id": item_id}

# @router.put(
#     "/{item_id}",
#     tags=["custom"],
#     responses={403: {"description": "Operation forbidden"}},
# )
# async def update_item(item_id: str):
#     if item_id != "plumbus":
#         raise HTTPException(
#             status_code=403, detail="You can only update the item: plumbus"
#         )
#     return {"item_id": item_id, "name": "The great Plumbus"}


#Top 3 question
@router.get("/question/top_3")
async def find_top():
    query = """
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        order by info.view
        limit 3
    """
    result = select(sql=query)
    for i in result:
        i['question_tag'] = i['question_tag'].split(',')
    return jsonable_encoder(result)

#Select question all
@router.get("/question/find_view")
async def find_view():
    query = """
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        order by info.view
    """
    result = select(sql=query)
    for i in result:
        i['question_tag'] = i['question_tag'].split(',')
    return jsonable_encoder(result)

#Select question orderby create_date desc
@router.get("/question/find_new") 
async def find_new():
    query = """
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        order by info.create_date desc
    """
    result = select(sql=query)
    for i in result:
        i['question_tag'] = i['question_tag'].split(',')
    return jsonable_encoder(result)
    
#Select question orderby create_date asc
@router.get("/question/find_old")
async def find_old():
    query = """
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        order by info.create_date asc
    """
    result = select(sql=query)
    for i in result:
        i['question_tag'] = i['question_tag'].split(',')
    return jsonable_encoder(result)
