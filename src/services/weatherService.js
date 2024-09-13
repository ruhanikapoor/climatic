import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export const fetchWeatherData = async(city) =>{
  try{
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)
    return response.data;

  }
  catch (error){
    console.log('Error fetching weather data : ', error);
    throw error
  }
}