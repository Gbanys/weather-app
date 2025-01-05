import requests
import os

def show_city(latitude, longitude):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={os.environ['GOOGLE_MAPS_API_KEY']}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for HTTP issues
        data = response.json()

        if "results" in data and len(data["results"]) > 0:
            city = None

            # Loop through results to find locality
            for result in data["results"]:
                for component in result["address_components"]:
                    if "locality" in component["types"]:
                        city = component["long_name"]
                        break
                if city:
                    break

            # Fallback to administrative_area_level_1 if locality is not found
            if not city:
                for result in data["results"]:
                    for component in result["address_components"]:
                        if "administrative_area_level_1" in component["types"]:
                            city = component["long_name"]
                            break
                    if city:
                        break

            if city:
                print(f"Your city is {city}.")
                return city
            else:
                print("City information not found in the API response.")
                return "unknown"
        else:
            print("No results found in the API response.")
            return "unknown"

    except requests.RequestException as e:
        print(f"Error fetching city name: {e}")
        return "unknown"
