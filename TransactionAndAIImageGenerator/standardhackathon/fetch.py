from __future__ import print_function
import os.path
import base64
import google.auth
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# Define the required scopes
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def authenticate_gmail():
    """Authenticate the user and return the Gmail API service"""
    creds = None
    # Check if we have a previously saved token
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If no valid credentials exist, log in via browser
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return build('gmail', 'v1', credentials=creds)

def fetch_emails():
    """Fetch the latest emails that contain 'transaction' in the subject"""
    service = authenticate_gmail()
   
    # Search for emails with 'transaction' in the subject
    query = 'subject:(transaction)'
    results = service.users().messages().list(userId='me', q=query).execute()
    messages = results.get('messages', [])

    if not messages:
        print("No transaction emails found.")
    else:
        for message in messages[:5]:  # Fetch only the first 5 emails
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            msg_snippet = msg.get("snippet", "No snippet available")
            print(f"Email ID: {message['id']}\nSnippet: {msg_snippet}\n---")

if __name__ == '__main__':
    fetch_emails()