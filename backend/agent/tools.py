import requests
from langchain.agents import tool

@tool
def get_weather_data_from_location(latitude, longitude):
    """Get weather data from a particular location using latitude and longitude"""
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m&hourly=temperature_2m")
    return response.json()