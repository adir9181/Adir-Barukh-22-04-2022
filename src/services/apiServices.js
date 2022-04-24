import axios from "axios";
const key = "6TIwS7SG4gg6EoF2Tf2DDiV6doT75rN2";
const URL = `http://dataservice.accuweather.com`;

axios.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data);
  },
  (err) => {
    const error = err.response;
    if (!error) {
      return Promise.reject({ message: "Network error, Try again." });
    }
    return Promise.reject({ ...error, code: error.status });
  }
);

export const searchCity = (name) => {
  return axios.get(
    `${URL}/locations/v1/cities/autocomplete?apikey=${key}&q=${name}`
  );
};

export const searchCoords = (coords) => {
  return axios.get(
    `${URL}/locations/v1/cities/geoposition/search?apikey=${key}&q=${coords}`
  );
};

export const getCurrentWeather = (locationKey) => {
  return axios.get(`${URL}/currentconditions/v1/${locationKey}?apikey=${key}`);
};

export const getForecast = (locationKey, metric) => {
  let query = `apikey=${key}`;
  if (metric) {
    query = query + "&metric=true";
  }
  return axios.get(`${URL}/forecasts/v1/daily/5day/${locationKey}?${query}`);
};
