const container = document.querySelector('.container');
const form = document.querySelector('form');
const thumb = document.querySelector('.thumb');
const precipitation = document.querySelector('.precipitation__value');
const humidity = document.querySelector('.humidity__value');
const wind = document.querySelector('.wind__value');
const week = document.querySelector('.forecast__wrapper');

const updateUI = data => {
  const { cityDetails, currentWeather, forecast } = data;

  const today = new Date(forecast.DailyForecasts[0].Date).toLocaleDateString('cs', { weekday: 'long' });
  const todayDate = new Date(forecast.DailyForecasts[0].Date).toLocaleDateString('cs', { day: 'numeric', month: 'long', year: 'numeric' });
  const day1 = new Date(forecast.DailyForecasts[1].Date).toLocaleDateString('cs', { weekday: 'short' });
  const day2 = new Date(forecast.DailyForecasts[2].Date).toLocaleDateString('cs', { weekday: 'short' });
  const day3 = new Date(forecast.DailyForecasts[3].Date).toLocaleDateString('cs', { weekday: 'short' });
  const day4 = new Date(forecast.DailyForecasts[4].Date).toLocaleDateString('cs', { weekday: 'short' });

  thumb.innerHTML = `
  <div class="day">${today}</div>
  <div class="date">${todayDate}</div>
  <div class="location">
      <i class="fas fa-map-marker-alt"></i>
      <span class="city">${cityDetails.EnglishName}</span>, <span class="country">${cityDetails.Country.ID}</span>
  </div>
  <div class="icon">
      <img src="img/icons/${currentWeather.WeatherIcon}.svg" alt="weather icon">
  </div>
  <div class="temperature">
      <span>${currentWeather.Temperature.Metric.Value}</span>&deg;C
  </div>
  <div class="text">${currentWeather.WeatherText}</div>
  `;

  precipitation.innerHTML = `${forecast.DailyForecasts[0].Day.PrecipitationProbability} %`;
  humidity.innerHTML = `${currentWeather.RelativeHumidity} %`;
  wind.innerHTML = `${forecast.DailyForecasts[0].Day.Wind.Speed.Value} km/h`;

  week.innerHTML = `
    <div class="forecast__col">
      <div class="forecast__icon">
        <img src="img/icons/${forecast.DailyForecasts[1].Day.Icon}.svg" alt="forecast icon">
      </div>
      <div class="forecast__day">${day1}</div>
      <div class="forecast__temperature">
        <span>${forecast.DailyForecasts[1].Temperature.Maximum.Value}</span>&deg;C
      </div>
    </div>
    <div class="forecast__col">
      <div class="forecast__icon">
        <img src="img/icons/${forecast.DailyForecasts[2].Day.Icon}.svg" alt="forecast icon">
      </div>
      <div class="forecast__day">${day2}</div>
      <div class="forecast__temperature">
        <span>${forecast.DailyForecasts[2].Temperature.Maximum.Value}</span>&deg;C
      </div>
    </div>
    <div class="forecast__col">
      <div class="forecast__icon">
        <img src="img/icons/${forecast.DailyForecasts[3].Day.Icon}.svg" alt="forecast icon">
      </div>
      <div class="forecast__day">${day3}</div>
      <div class="forecast__temperature">
        <span>${forecast.DailyForecasts[3].Temperature.Maximum.Value}</span>&deg;C
      </div>
    </div>
    <div class="forecast__col">
      <div class="forecast__icon">
        <img src="img/icons/${forecast.DailyForecasts[4].Day.Icon}.svg" alt="forecast icon">
      </div>
      <div class="forecast__day">${day4}</div>
      <div class="forecast__temperature">
        <span>${forecast.DailyForecasts[4].Temperature.Maximum.Value}</span>&deg;C
      </div>
    </div>
  `;

  if (container.classList.contains('d-none')) {
    container.classList.remove('d-none');
  }
};

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const currentWeather = await getCurrentWeather(cityDetails.Key);
  const forecast = await getForecast(cityDetails.Key);

  return { cityDetails, currentWeather, forecast };
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const city = form.city.value.trim();
  form.reset();
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
