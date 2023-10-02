# -*- coding: utf-8 -*-
import os
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient import errors
from email.message import EmailMessage

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv

import base64

load_dotenv(verbose=True)

html_form = """
<table border="0" cellpadding="0" cellspacing="0" width="100%" bgColor="#F4F5F7" style="padding: 20px 16px 82px; color: #191919; font-family: 'Noto Sans KR', sans-serif;" class="wrapper">
  <tbody style="display: block; max-width: 600px; margin: 0 auto;">
    <tr width="100%" style="display: block;">
      <td width="100%" style="display: block;">
        <!-- 본문 -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgColor="#FFFFFF" style="display: inline-block; padding: 32px; text-align: left; border-top: 3px solid #22B4E6; border-collapse: collapse;" class="container">
          <tbody style="display: block;">
            <!-- BIGPICTURE 로고 -->
            <tr>
              <td style="padding-bottom: 32px; font-size: 20px; font-weight: bold;">
                <img width="92" src='https://d3hqehqh94ickx.cloudfront.net/images/mail-asset/bigpicture_logo.png' />
              </td>
            </tr>
            <!-- 본문 제목 -->
            <tr>
              {{{verify_code_content1}}}
            </tr>
            <!-- 본문 내용 -->
            <tr>
              {{{verify_code_leave_content}}}
            </tr>
            <!-- 본문 컨텐츠 영역 -->
            <tr width="100%" style="display: block; margin-bottom: 32px;">
              <td width="100%" style="display: block;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgColor="#F8F9FA" style="padding: 40px 20px; border-radius: 4px; text-align: center;" class="content">
                  <tbody style="display: block;">
                    <tr style="display: block;">
                      <td style="display: block; padding-bottom: 16px; font-size: 32px; font-weight: bold;">
                        {{leave_code}}</td>
                    </tr>
                    <tr style="display: block;">
                      {{{verify_code_content3}}}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <!-- 발신전용 & 저작권 -->
            <tr>
              {{{only_send_mail}}}
            </tr>
            <tr>
              <td style="padding-bottom: 24px; color: #A7A7A7; font-size: 12px; line-height: 20px;">© 2022 Bigpicture Interactive Co., Ltd. All Rights Reserved.</td>
            </tr>
            <!-- 푸터(통합 서비스) -->
            <tr width="100%" style="display:block; padding-top: 24px; border-top: 1px solid #e9e9e9;">
              <td style="position: relative;">
                <img height="16" style="vertical-align: middle; display: inline-block; padding: 0 5px 0 0;" src='https://d3hqehqh94ickx.cloudfront.net/images/mail-asset/lvup_gray.png' />
                <img height="10" style="display: inline-block; border-left: 1px solid #E9E9E9; padding: 0 8px;" src='https://d3hqehqh94ickx.cloudfront.net/images/mail-asset/gco_gray.png' />
                {{{footer1}}}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
"""

def gmail_authenticate():
    SCOPES = ['https://mail.google.com/']
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('client_secret_30738102224-lbavud6uvf1bessi5a910gufpdjho0b0.apps.googleusercontent.com.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return build('gmail', 'v1', credentials=creds)

def create_message(sender, to, subject, message_text):
    message = EmailMessage()
    # message = MIMEMultipart('alternative')
    message["From"] = sender
    message["To"] = to.split(",")
    message["Subject"] = subject
    message.set_content(html_form, subtype='html')
    return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode('utf8')}

def send_message(service, user_id, message):
    try:
        message = service.users().messages().send(userId=user_id, body=message).execute()
        print('Message Id: %s' % message['id'])
        return message
    except errors.HttpError as error:
        print('An error occurred: %s' % error)

def main():
    service = gmail_authenticate()
    message = create_message("qualk", "seobisback@gmail.com", "qualk 이메일 인증 테스트", html_form)
    send_message(service, "qualkofficial@gmail.com", message)
main()