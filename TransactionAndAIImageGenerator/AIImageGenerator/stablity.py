import requests

response = requests.post(
    f"https://api.stability.ai/v2beta/stable-image/generate/core",
    headers={
        "authorization": f"Bearer sk-a3Uv50JJ0dQT8O4BepfAVaOXEWEHgzXyLcBbLKG4eanDZ8n1",
        "accept": "image/*"
    },
    files={"none": ''},
    data={
        "prompt": "A girl standing outside a dream house",
        "output_format": "webp",
    },
)

if response.status_code == 200:
    with open("./dreamhouse.webp", 'wb') as file:
        file.write(response.content)
else:
    raise Exception(str(response.json()))