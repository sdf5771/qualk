import os
import secrets
from fastapi import UploadFile, File, APIRouter, HTTPException, Header
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List
from datetime import datetime

import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler('my.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

router = APIRouter(
    prefix="/api/v1/upload"
)

BASE_DIR = r'C:'
STATIC_DIR = os.path.join(BASE_DIR,r'static')
IMG_DIR = os.path.join(STATIC_DIR,r'images')
SERVER_IMG_DIR = os.path.join('http://localhost:8000/','static/','images/')

@router.post('/upload-images')
async def upload_board(filename, in_files: List[UploadFile] = File(...)):
    logger.info(BASE_DIR)
    file_urls=[]
    for file in in_files:
        currentTime = datetime.now().strftime("%Y%m%d%H%M%S")
        # saved_file_name = ''.join([currentTime,secrets.token_hex(16),'.png'])
        saved_file_name = filename
        logger.info(saved_file_name)
        file_location = os.path.join(IMG_DIR,saved_file_name)
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
        file_urls.append(SERVER_IMG_DIR+saved_file_name)
    result={'fileUrls' : file_urls}
    return result