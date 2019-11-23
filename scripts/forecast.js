const key = 'byiDzZcJWh4wk8QAeYClPkayXAXcl6PU';

export const getForecast = async id => {
  const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${key}&details=true&metric=true`;
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const getCurrentWeather = async id => {
  const url = `https://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}&details=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0];
};

export const getCity = async city => {
  const url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0];
};
