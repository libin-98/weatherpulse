import './App.css';
import { getData , getCityList} from './services/generalservice';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [weatherResult, setWeatherResult] = useState({});
  const [cityDropdown, setCityDropdown] = useState(false);
  const [cityList, setCity] = useState(['Delhi', 'Chennai', 'Mumbai', 'Kolkata', 'Banglore', 'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur']);
  const [masterCitylist, setMasterCityList] = useState([]);
  const [inputValue, setInputValue] = useState('Chennai');
  useEffect(() => {
    getCityList().then((data) => {
      setMasterCityList(data);
      setCity(data.slice(0, 9));
    })
    geWeathertData('Chennai');
  }, [])

  function geWeathertData (city)  {
    getData(city, 'EN').then((data) => {
      setWeatherResult(data);
      setInputValue(city)
      setCityDropdown(false)
    })
  }
  const filterWeatherdata = (filterKey) => {
    setInputValue(filterKey);
    let filteredCityList = masterCitylist.filter((city) => {
      return city.toLowerCase().includes(filterKey.toLowerCase());
    })
    setCity(filteredCityList.slice(0, 9));
    // filterWeatherdata();
  }
  const fahrenheitToCelcius = (fahrenheit) => {
    return parseFloat(((fahrenheit - 32) * 5/9).toFixed(1));
}
    
  
  return(
    <div className="container-wrapper" >
    <div className="header">
        <input type="text" value={inputValue} onChange={(e) => filterWeatherdata(e.target.value)}  onFocus={() => setCityDropdown(true)} placeholder="Search City" className='citySearch'/>
        {cityDropdown && cityList.length > 0?(
          <div className="city-dropdown">
            {cityList.map((city) => (
              <p className='city-item' onClick={() => geWeathertData(city)}>{city}</p>
            ))}
          </div>
        ):  null}
        {/* <button type="button" onClick={() => geWeathertData('chennai')}>SEARCH</button> */}
    </div>
    <div className="container">
        {weatherResult && weatherResult.id ? (
          <div className="container-content">
            <div className="container-left">
              {/* <img src='icons/rain.svg' alt='rain'></img>z  */}
              {/* <img src='icons/storm.svg' alt='storm'></img> */}
              <img src='icons/sun.svg'  alt='sun'></img>
              {/* <img src='icons/thunder-storm.svg' alt='thunder-storm'></img> */}
            </div>
            <div className="container-right">
              <p className='today'>Today</p>
              <h2 className='city-name'>{weatherResult.name}</h2>
              <p className='main-weather'>Temperature : {fahrenheitToCelcius(weatherResult.main.temp)}&deg;C</p>
              <p className='main-weather'>{weatherResult.weather[0].main}</p>
              {/* <p>{weatherResult.weather[0].description}</p> */}
            </div>
            
            
            
            {/* <h2 className='city-name'>{weatherResult.name}</h2>
            <p>Temperature : {weatherResult.main.temp}</p>
            <p>Pressure : {weatherResult.main.pressure}</p>
            <p>Humidity : {weatherResult.main.humidity}%</p>
            <h3>Weather</h3>
            <p>{weatherResult.weather[0].main}</p>
            <p>{weatherResult.weather[0].description}</p> */}
          
                <ul className='weather-list'>
                  <li className='weather-item'>
                    Feels Like
                    <p>{fahrenheitToCelcius(weatherResult.main.feels_like)}&deg;C</p>
                    <img src='icons/hot-temp.svg' alt='hot'></img>

                  </li>
                  <li className='weather-item'>
                  Wind
                  <p>{weatherResult.wind.speed}Km/hr</p>
                  <img src='icons/wind.svg' alt='hot'></img>
                  </li>
                  <li className='weather-item'>
                    humidity
                    <p>{weatherResult.main.humidity}%</p>
                    <img src='icons/cloudy.svg' alt='hot'></img>
                  </li>
                  <li className='weather-item'>
                    pressure
                    <p>{weatherResult.main.pressure}hPa</p>
                    <img src='icons/cold-temp.svg' alt='hot'></img>
                  </li>
                </ul>
            
          </div>
          
          // <div className="container-list"></div>
          
        ) : (
          <div>no data found</div>
        )}
        {/* <img src='icons/cloudy.svg' alt='cloudy'></img>
        <img src='icons/cold-temp.svg' alt='cold'></img>
        <img src='icons/hot-temp.svg' alt='hot'></img>
        <img src='icons/rain.svg' alt='rain'></img>
        <img src='icons/storm.svg' alt='storm'></img>
        <img src='icons/sun.svg'  alt='sun'></img>
        <img src='icons/thunder-storm.svg' alt='thunder-storm'></img>
        <img src='icons/wind.svg' alt='wind'></img> */}
    </div>
    {/* <div className="footer">
        footer
    </div> */}
</div>
  )

}


export default App;
