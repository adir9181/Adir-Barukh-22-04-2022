/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CityWeather, Forecast, SearchInput } from "../components";
import {
  getCurrentWeather,
  getForecast,
  searchCoords,
} from "../services/apiServices";
import { ACTIONS } from "../store/actions";
import UnitContext from "../store/unitContext";

export default function Main({ favorites, dispatch }) {
  const [isMetric] = useContext(UnitContext);
  const { state } = useLocation();
  const [weather, setWeather] = useState(null);
  const [forecasts, setForecasts] = useState([]);
  const [city, setCity] = useState({
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel",
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv",
    },
  });

  useEffect(() => {
    if (state) {
      setCity(state);
      window.history.replaceState({}, document.title);
    } else {
      navigator.geolocation.getCurrentPosition(
        (success) => {
          searchCoords(
            `${success.coords.latitude}` + `,${success.coords.longitude}`
          ).then((res) => {
            const data = { ...res.AdministrativeArea, Key: res.Key };
            setCity(data);
          });
        },
        () => {
          // SHOW MODALS
          toast.error("Location not found", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
    }
  }, []);
  // useeffect function run when user click on the favorites button
  useEffect(() => {
    if (!weather) return;
    const exists = favorites.some((fav) => fav.Key === city.Key);
    const data = { ...weather, isFavorite: exists };
    setWeather(data);
  }, [favorites]);

  useEffect(() => {
    const exists = favorites.some((fav) => fav.Key === city.Key);
    getCurrentWeather(city.Key)
      .then((res) => {
        const data = {
          ...res[0],
          Key: city.Key,
          LocalizedName: city.LocalizedName,
          isFavorite: exists,
        };
        setWeather(data);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    getForecast(city.Key, isMetric)
      .then((res) => {
        const data = {
          ...res,
          Key: city.Key,
          LocalizedName: city.LocalizedName,
          isFavorite: exists,
        };
        setForecasts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [city, isMetric]);

  return (
    <div className="container mx-auto pt-8 flex flex-col items-center">
      <SearchInput onSelect={onSelectedCityChange} />
      <CityWeather
        weather={weather}
        toggleFavorite={toggleFavorite}
        isMetric={isMetric}
      />
      <Forecast forecast={forecasts} isMetric={isMetric} />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );

  function onSelectedCityChange(location) {
    if (location) {
      setCity(location);
    } else {
      setCity({
        Version: 1,
        Key: "215854",
        Type: "City",
        Rank: 31,
        LocalizedName: "Tel Aviv",
        Country: {
          ID: "IL",
          LocalizedName: "Israel",
        },
        AdministrativeArea: {
          ID: "TA",
          LocalizedName: "Tel Aviv",
        },
      });
    }
  }

  function toggleFavorite(payload) {
    const exists = favorites.some((fav) => fav.Key === payload.Key);
    exists
      ? dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload })
      : dispatch({ type: ACTIONS.ADD_FAVORITE, payload });
  }
}
