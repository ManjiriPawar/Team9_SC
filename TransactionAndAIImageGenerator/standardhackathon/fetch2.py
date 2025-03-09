from __future__ import print_function
import os
import re
import google.auth
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import firebase_admin
from firebase_admin import credentials, firestore

# Define the required Gmail API scope
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

# Initialize Firebase
firebase_cred = credentials.Certificate("serviceAccountKey_New.json")  # Use your Firebase credentials file
firebase_admin.initialize_app(firebase_cred)
db = firestore.client()

# Define platform-category mapping
CATEGORY_MAPPING = {
    "Amazon": "Shopping",
    "Flipkart": "Shopping",
    "Myntra": "Shopping",
    "Snapdeal": "Shopping",
    "Ebay": "Shopping",
    "Swiggy": "Food",
    "Zomato": "Food",
    "UberEats": "Food",
    "Dominos": "Food",
    "Ola": "Travel",
    "Uber": "Travel",
    "RedBus": "Travel",
    "MakeMyTrip": "Travel",
    "GoIbibo": "Travel",
    "Cleartrip": "Travel",
}

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

def extract_transaction_details(subject, body):
    """Extract transaction type (credit/debit), amount, platform, and category from email subject & body"""
    text = f"{subject} {body}"  # Combine subject and body for keyword search

    # Extract amount using a more flexible regex pattern
    amount_pattern = re.search(r'[\₹\$€]?\s?\d{1,3}(?:,\d{3})*(?:\.\d{2})?', text)
    amount = amount_pattern.group() if amount_pattern else "Unknown"
    
    # Remove unwanted characters (optional)
    amount = re.sub(r'[^\d\.]', '', amount) if amount != "Unknown" else "Unknown"

    # Identify transaction type
    debit_keywords = ['debited', 'withdrawn', 'spent', 'paid']
    credit_keywords = ['credited', 'received', 'added', 'refunded']
    transaction_type = "Unknown"
    if any(word in text.lower() for word in debit_keywords):
        transaction_type = "Debit"
    elif any(word in text.lower() for word in credit_keywords):
        transaction_type = "Credit"

    # Identify platform & category
    platform = "Unknown"
    category_type = "Miscellaneous"  # Default to Miscellaneous
    for key, value in CATEGORY_MAPPING.items():
        if key.lower() in text.lower():
            platform = key
            category_type = value
            break  # Stop after first match

    return category_type, platform, transaction_type, amount

def fetch_and_store_emails():
    """Fetch transaction emails and store in Firebase"""
    service = authenticate_gmail()
    query = 'subject:(transaction) OR subject:(payment) OR subject:(credited) OR subject:(debited)'

    results = service.users().messages().list(userId='me', q=query).execute()
    messages = results.get('messages', [])

    if not messages:
        print("No transaction emails found.")
    else:
        for message in messages[:5]:  # Fetch only the first 5 emails
            msg = service.users().messages().get(userId='me', id=message['id']).execute()

            # Extract subject
            headers = msg.get("payload", {}).get("headers", [])
            subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")

            # Extract email snippet (body preview)
            snippet = msg.get("snippet", "No snippet available")

            # Extract transaction details using both subject & body
            category_type, platform, transaction_type, amount = extract_transaction_details(subject, snippet)

            # Store in Firebase Firestore
            transaction_data = {
                "email_id": message["id"],
                "subject": subject,
                "snippet": snippet,
                "categoryType": category_type,
                "platform": platform,
                "transactionType": transaction_type,
                "amount": amount
            }

            db.collection("transactions").add(transaction_data)
            print(f"Stored transaction: {transaction_data}")

if __name__ == '__main__':
    fetch_and_store_emails()
