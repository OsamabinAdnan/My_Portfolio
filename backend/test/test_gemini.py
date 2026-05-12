"""Test Gemini OpenAI-compatible endpoint to find correct model name"""
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url=os.getenv("BASE_URL")
)

print("Testing Gemini OpenAI-compatible endpoint...")
print(f"Base URL: {os.getenv('BASE_URL')}")
print(f"Model: {os.getenv('MODEL_NAME')}")
print()

try:
    # Try to list models
    print("Attempting to list available models...")
    models = client.models.list()
    print("Available models:")
    for model in models.data:
        print(f"  - {model.id}")
except Exception as e:
    print(f"Could not list models: {e}")
    print()
    print("Trying common model names...")

    # Try common model names
    test_models = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-flash",
    ]

    for model_name in test_models:
        try:
            print(f"\nTesting: {model_name}")
            response = client.chat.completions.create(
                model=model_name,
                messages=[{"role": "user", "content": "Say hello"}],
                max_tokens=10
            )
            print(f"✅ SUCCESS with {model_name}")
            print(f"Response: {response.choices[0].message.content}")
            break
        except Exception as e:
            print(f"❌ Failed: {str(e)[:100]}")
