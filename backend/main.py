from typing import Any, List, Optional, Union
from fastapi import FastAPI
from pydantic import BaseModel
from agent.agent import callAgent
from api_functions import get_aggregated_weather_data, get_weather_statistics_by_date
import pandas as pd
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware

from utils.google_maps_api import show_city

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserMessage(BaseModel):
    input: str = None
    history: Optional[List[dict[str, Any]]] = None


@app.get("/get_aggregated_weather_data")
def get_weather_data(latitude: float, longitude: float):
    aggregated_weather_data = get_aggregated_weather_data(latitude, longitude)
    return aggregated_weather_data


@app.get("/get_grouped_weather_data_by_date")
def get_weather_data(latitude: float, longitude: float):
    aggregated_weather_data = get_weather_statistics_by_date(latitude, longitude)
    return aggregated_weather_data


@app.get("/suggestions")
def get_suggestions(query: str) -> List[str]:
    world_cities = pd.read_csv('worldcities.csv')
    cities = world_cities['city']
    filtered_cities = cities[cities.str.lower().str.startswith(query.lower(), na=False)].tolist()
    return filtered_cities

@app.get("/city")
def get_location(latitude: float, longitude: float) -> str:
    return show_city(latitude, longitude)

@app.get("/coordinates")
def get_coordinates(city: str) -> dict[str, Union[float, float]]:
    world_cities = pd.read_csv('worldcities.csv')
    latitude = float(world_cities[['lat', 'lng']][world_cities['city'] == city].reset_index().loc[0, 'lat'])
    longitude = float(world_cities[['lat', 'lng']][world_cities['city'] == city].reset_index().loc[0, 'lng'])
    return {"latitude": latitude, "longitude": longitude}


@app.post("/agent_answer")
def get_agent_response(userMessage: UserMessage) -> dict[str, Any]:
    output = callAgent(userMessage.input, userMessage.history)
    return output