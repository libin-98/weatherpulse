import './App.css';
import { getData, getCityList } from './services/generalservice';
import { useState , useRef , useEffect} from 'react';

function App() {
  const [weatherResult, setWeatherResult] = useState({});
  const [cityDropdown, setCityDropdown] = useState(false);
  const [cityList, setCity] = useState(['Delhi', 'Chennai', 'Mumbai', 'Kolkata', 'Banglore', 'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur']);
  const [masterCitylist, setMasterCityList] = useState([]);
  const [inputValue, setInputValue] = useState('Chennai');
  const divRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    getCityList().then((data) => {
      setMasterCityList(data);
      setCity(data.slice(0, 9));
    })
    geWeathertData('Chennai');
  }, [])

  function geWeathertData(city) {
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
    return parseFloat(((fahrenheit - 32) * 5 / 9).toFixed(1));
  }
  const handleClick = (event) => {
    if (
      divRef.current && !divRef.current.contains(event.target) &&
      inputRef.current && !inputRef.current.contains(event.target)
    ) {
      setCityDropdown(false);
    }
  }
  const handleFocus = () => {
    setCityDropdown(true);
  }


  return (
    <div className="container-wrapper" onClick={handleClick}>
      <div className="header">
        <input ref={inputRef} type="text" value={inputValue} onChange={(e) => filterWeatherdata(e.target.value)} onFocus={handleFocus} placeholder="Search City" className='citySearch' />
        {cityDropdown && cityList.length > 0 ? (
          <div className="city-dropdown" ref={divRef}>
            {cityList.map((city) => (
              <p className='city-item' onClick={() => geWeathertData(city)}>{city}</p>
            ))}
          </div>
        ) : null}
      </div>
      <div className="container">
        {weatherResult && weatherResult.id ? (
          <div className="container-content">
            <div className="container-left">
              {/* <img src='icons/rain.svg' alt='rain'></img>z  */}
              {/* <img src='icons/storm.svg' alt='storm'></img> */}
              <img src='icons/sun.svg' alt='sun'></img>
              {/* <img src='icons/thunder-storm.svg' alt='thunder-storm'></img> */}
            </div>
            <div className="container-right">
              <p className='today'>Today</p>
              <h2 className='city-name'>{weatherResult.name}</h2>
              <p className='main-weather'>Temperature : {fahrenheitToCelcius(weatherResult.main.temp)}&deg;C</p>
              <p className='main-weather'>{weatherResult.weather[0].main}</p>
            </div>
            <div className='weather-responsive'>
              <div className='responsive-item'>
                <p>Feels Like</p>
                <p>{fahrenheitToCelcius(weatherResult.main.feels_like)}&deg;C</p>
              </div>
              <div className='responsive-item'>
                <p>Wind</p>
                <p>{weatherResult.wind.speed}Km/hr</p>
              </div>
              <div className='responsive-item'>
                <p>Humidity</p>
                <p>{weatherResult.main.humidity}%</p>
              </div>
              <div className='responsive-item'>
                <p>pressure</p>
                <p>{weatherResult.main.pressure}hPa</p>
              </div>

            </div>
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
      </div>
      {/* <div className="footer">
        footer
    </div> */}
    </div>
  )

}


export default App;
