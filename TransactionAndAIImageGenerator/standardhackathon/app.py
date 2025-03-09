from flask import Flask, jsonify
from flask_cors import CORS
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import os
import json

# Define the required scopes
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

app = Flask(__name__)
CORS(app)

def authenticate_gmail():
    """Authenticate the user and return the Gmail API service"""
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    return build('gmail', 'v1', credentials=creds)

@app.route('/get-emails', methods=['GET'])
def get_emails():
    """Fetch emails containing 'transaction' in the subject"""
    service = authenticate_gmail()
    query = 'subject:(transaction)'
    results = service.users().messages().list(userId='me', q=query).execute()
    messages = results.get('messages', [])
    
    email_list = []
    
    if messages:
        for message in messages[:5]:  # Get only first 5 emails
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            msg_snippet = msg.get("snippet", "No snippet available")
            email_list.append({
                'id': message['id'],
                'snippet': msg_snippet
            })
    
    return jsonify(email_list)

if __name__ == '__main__':
    app.run(debug=True)
