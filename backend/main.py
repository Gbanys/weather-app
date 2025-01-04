from typing import Union
from fastapi import FastAPI
from api_functions import get_aggregated_weather_data, get_weather_statistics_by_date

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_aggregated_weather_data")
def get_weather_data(latitude: float, longitude: float):
    aggregated_weather_data = get_aggregated_weather_data(latitude, longitude)
    return aggregated_weather_data

@app.get("/get_grouped_weather_data_by_date")
def get_weather_data(latitude: float, longitude: float):
    aggregated_weather_data = get_weather_statistics_by_date(latitude, longitude)
    return aggregated_weather_data


