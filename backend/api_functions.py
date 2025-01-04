from typing import Any
import requests
import pandas as pd
from weather_codes import weather_codes
from datetime import datetime


def add_ordinal_suffix(day: int) -> str:
    """Return the day with its ordinal suffix."""
    if 10 <= day % 100 <= 20:  # Special case for teens
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(day % 10, "th")
    return f"{day}{suffix}"


def format_date_without_year(date_str: str) -> str:
    date_object = datetime.strptime(date_str, "%Y-%m-%d")
    day_with_suffix = add_ordinal_suffix(date_object.day)
    return f"{date_object.strftime('%A')} {day_with_suffix} of {date_object.strftime('%B')}"


def get_weather_data_by_latitude_and_longitude(latitude: float, longitude: float) -> pd.DataFrame:
    response = requests.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code")
    weather_data = response.json()

    datetime = weather_data['hourly']['time']
    temperatures = weather_data['hourly']['temperature_2m']
    weather_descriptions = [weather_codes[code] for code in weather_data['hourly']['weather_code']]

    current_temperature = weather_data['current']['temperature_2m']
    current_date = weather_data['current']['time'].split("T")[0]
    current_weather_description = weather_codes[weather_data['current']['weather_code']]

    weather_dataframe = pd.DataFrame(
        {"datetime" : datetime, 
         "temperature" : temperatures,
         "description" : weather_descriptions,
         "current_temperature" : current_temperature,
         "current_date" : current_date,
         "current_weather_description" : current_weather_description
         })
    return weather_dataframe


def get_aggregated_weather_data(latitude: float, longitude: float) -> dict[str, Any]:
    weather_dataframe = get_weather_data_by_latitude_and_longitude(latitude, longitude)
    weather_dataframe['date'] = weather_dataframe.apply(lambda row: row['datetime'].split('T')[0], axis=1)
    
    return {
        "date" : weather_dataframe['date'].drop_duplicates().tolist(),
        "minimum_temperature" : weather_dataframe.groupby(['date'])['temperature'].min().tolist(),
        "maximum_temperature" : weather_dataframe.groupby(['date'])['temperature'].max().tolist(),
        "average_temperature" : weather_dataframe.groupby(['date'])['temperature'].mean().round(1).tolist(),
        "description" : weather_dataframe.groupby(['date'])['description'].apply(lambda row: row.mode().iloc[0]).tolist(),
        "current_weather_description" : weather_dataframe.loc[0, 'current_weather_description'],
        "current_date" : weather_dataframe.loc[0, 'current_date'],
        "current_temperature" : weather_dataframe.loc[0, 'current_temperature']
    }   

def get_weather_statistics_by_date(latitude: float, longitude: float):
    weather_dataframe = get_weather_data_by_latitude_and_longitude(latitude, longitude)
    weather_dataframe['date'] = weather_dataframe.apply(lambda row: row['datetime'].split('T')[0], axis=1)
    weather_dataframe['time'] = weather_dataframe.apply(lambda row: row['datetime'].split('T')[1], axis=1)

    grouped_dataframe = weather_dataframe.groupby('date').agg({
        'temperature': list,
        'time': list,
        'description' : list,
    }).reset_index()

    result = grouped_dataframe.set_index('date').to_dict(orient='index')
    return result
    