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
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; padding-top: 67px;">
    <tbody style="display: block; max-width: 600px; margin: 0 auto;">
      <tr width="100%" style="display: block;">
        <td width="100%" style=" display: block;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="display: inline-block;">
          <tbody style="display: block; width: 100%; margin: 0 auto;">
        <tr style="display: block; width: 100%;">
          <td style="display: block; margin: 0 auto; width: 200px; height: 54px; text-align: center;">
            <img width="200px" src='https://qualk.co.kr/mail-asset/qualk_logo.png' />
          </td>
        </tr>
      <tr style="margin-top: 54px; display: block; width: 100%;">
        <td style="display: block; margin: 0 auto; width: 244px; height: 209px; text-align: center;">
          <img width="244px" height="209px" src='https://qualk.co.kr/mail-asset/duck01.png' />
        </td>
      </tr>

      <tr style="margin-top: 53px; display: block; width: 100%;">
        <td style="display: block; margin: 0 auto; font-size: 24px; font-weight: 600; letter-spacing: -0.96px; text-align: center; color: #5b5b5b;">비밀번호 재설정</td>
      </tr>

      <tr style="margin-top: 20px; display: block; width: 100%;">
        <td style="display: block; margin: 0 auto; font-size: 18px; font-weight: 500; line-height: 1.56; letter-spacing: -0.72px; text-align: center; color: #5b5b5b;">000님 안녕하세요, <br>비밀번호를 재설정 하시려면 아래 버튼을 클릭해주세요.</td>
      </tr>

      <tr style="margin-top: 20px; display: block; width: 100%;">
        <td style="display: block; width: 100%;">
          <a href="https://qualk.co.kr/" style="text-decoration: none;">
            <button style="display: block; margin: 0 auto; width: 440px; height: 44px; border-radius: 8px; background-color: #ffba00; border: 0; outline: none; cursor: pointer; font-size: 14px; font-weight: 600; letter-spacing: -0.56px; color: #fff;">비밀번호 재설정하기</button>
          </a>
        </td>
      </tr>

        <tr style="margin-top: 20px; display: block; width: 100%;">
          <td style="display: block; margin: 0 auto; width: 400px; height: 38px; padding: 20; border-radius: 10px; background-color: #f9f9f9; font-size: 14px; font-weight: 500; line-height: 1.43; letter-spacing: -0.56px; text-align: center; color: #bababa;">본 메일은 비밀번호 재설정을 요청하신 회원께 보내드리는 메일입니다.<br>만약 본인이 요청한 것이 아닌 경우, 본 메일은 무시하거나 삭제해 주세요.</td>
        </tr>
        <tr style="margin-top: 60px; margin-bottom: 172px; display: block; width: 100%;">
          <td style="display: block; margin: 0 auto; font-size: 14px; font-weight: 500; line-height: 1.71; letter-spacing: -0.56px; text-align: center; color: #bababa;">본 메일은 발신전용 메일이에요. <br>Copyright @ 2023 Qualk, All rights reserved.</td>
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
    message["From"] = sender
    message["To"] = to.split(",")
    message["Subject"] = subject
    message.set_content(message_text, subtype='html')
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
    message = create_message("qualk", "kzsc5464@gmail.com", "qualk 이메일 인증 테스트", html_form)
    send_message(service, "qualkofficial@gmail.com", message)
main()