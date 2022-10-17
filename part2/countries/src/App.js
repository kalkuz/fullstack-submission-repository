/* eslint-disable no-nested-ternary */
import axios from 'axios';
import { useEffect, useState } from 'react';

function CountryDetails({ country }) {
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const FetchWeather = () => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(({ data }) => setWeather(data));

  useEffect(() => { FetchWeather(); }, []);
  useEffect(() => setWeatherIcon(`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`), [weather]);

  return (
    <div>
      <h1>{country.name?.common}</h1>
      <p>
        Capital:
        {' '}
        {country.capital[0]}
      </p>
      <p>
        Area:
        {' '}
        {country.area}
      </p>
      <h3>Languages:</h3>
      <ul>{Object.values(country.languages).map((l) => (<li>{l}</li>))}</ul>
      <img src={country.flags.png} alt="" />

      {weather && (
        <>
          <h2>
            Weather in
            {' '}
            {country.capital[0]}
          </h2>
          <p>
            Temperature
            {' '}
            {Math.floor(Number(weather.main.temp) - 273)}
            {' '}
            Celcius
          </p>
          <img src={weatherIcon} alt="" />
          <p>
            Wind
            {' '}
            {weather.wind.speed}
            {' '}
            m/s
          </p>
        </>
      )}
    </div>
  );
}

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [opened, setOpened] = useState(null);

  const [query, setQuery] = useState('');

  const FetchCountries = () => axios.get('https://restcountries.com/v3.1/all').then(({ data }) => setAllCountries(data));

  useEffect(() => { FetchCountries(); }, []);
  useEffect(() => {
    setCountries(allCountries.filter((c) => c.name?.common?.toLowerCase().startsWith(query.toLowerCase())));
    setOpened(null);
  }, [query]);

  return (
    <div>
      <div>
        <p>find countries: </p>
        <input onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div>
        {countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          countries.length === 1 ? (
            <CountryDetails country={countries[0]} />
          ) : (
            opened ? <CountryDetails country={opened} /> : (countries.map((c) => (
              <div>
                {c.name?.common}
                {' '}
                <input type="button" onClick={() => setOpened(c)} value="Show" />
              </div>
            )))
          )
        )}
      </div>
    </div>
  );
}

export default App;
