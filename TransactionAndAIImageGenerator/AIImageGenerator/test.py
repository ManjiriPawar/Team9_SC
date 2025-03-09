import openai

# Initialize OpenAI client
client = openai.OpenAI(api_key="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")

# Generate Image
response = client.images.generate(
    model="dall-e-3",  # You can also use "dall-e-2"
    prompt="A futuristic city with flying cars",
    n=1,
    size="1024x1024"
)

# Get Image URL
image_url = response.data[0].url
print("Generated Image URL:", image_url)
