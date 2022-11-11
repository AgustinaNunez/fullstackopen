import {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const latitude = country.capitalInfo.latlng[0]
    const longitude = country.capitalInfo.latlng[1]

    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY
      const keyLocation = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search.json?q=${latitude},${longitude}&apikey=${apiKey}`)
      const locationKey = keyLocation.data[0].Key
      const currentConditions = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`)
      const currentWeather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
      return {
        accuWeather: currentConditions.data[0], 
        openMeteo: currentWeather.data.current_weather
      }
    }

    fetchData()
      .then(data => setWeather({
        temperature: data?.accuWeather?.Temperature?.Metric?.Value,
        iconUrl: `https://developer.accuweather.com/sites/default/files/0${data.accuWeather?.WeatherIcon}-s.png`,
        wind: data?.openMeteo.windspeed
      }))
      .catch(err => console.log(err))
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital.join(', ')}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {
          Object.entries(country.languages).map(language => <li key={language}>{language[1]}</li>)
        }
      </ul>
      <img src={country.flags.png} alt={country.flag} />
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {weather.temperature} Celcius</p>
      <img src={weather.iconUrl} alt='' />
      <p>wind {weather.wind} m/s</p>
    </div>
  )
}

const CountryResult = ({country}) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <p>
        {country.name.common} 
        <button onClick={() => setShow(!show)}>
          {show ? 'hide' : 'show'}
        </button>
      </p>
      {
        show && <Country country={country} />
      }
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
  }, [filter, countries])

  return (
    <div>
      <p>
        find countries
        <input type='text' value={filter} onChange={({target}) => setFilter(target.value)} />
      </p>
      {
        filter && 
        <>
        {
          filteredCountries.length > 10
            ? <p>Too many matches, specify another filter</p>
            : <>
            {
              filteredCountries.length === 1
              ? <Country country={filteredCountries[0]} />
              : <>
                {
                  filteredCountries.map(country => <CountryResult key={country.name.common} country={country} />)
                }
              </>
            }
            </>
        }
        </>
      }
    </div>
  );
}

export default App;
