import requests

API_KEY = "sk-u26pe9E38KI4uTF4pOcbFFoIu89VLXiJ4BoN3BU3Lotsy587"
url = "https://api.stability.ai/v2beta/stable-image/generate/core"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Accept": "application/json"
}

data = {
    "prompt": (None,"A car"),  # Make sure this is a string
    "output_format": (None,"jpeg")  # Should be 'png', 'jpeg', or 'webp'
}

response = requests.post(url, headers=headers, files=data)  # Use data=data, NOT files=data

if response.status_code == 200:
    with open("generated_image.jpeg", "wb") as file:
        file.write(response.content)
    print("✅ Image saved as generated_image.jpeg")
else:
    print("❌ Error:", response.json())