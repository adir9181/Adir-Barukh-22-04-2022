import React from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";

export default function CityWeather({ weather, toggleFavorite, isMetric }) {
  if (weather) {
    return (
      <div className="container mx-auto my-10 px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-32 h-32 bg-gray-100 dark:bg-dark-2"></div>
            <div className="ml-3">
              <p className="text-xl dark:text-slate-50">
                {weather.LocalizedName}
              </p>
              <p
                className=""
                // dangerouslySetInnerHTML allows to put html code in react
                dangerouslySetInnerHTML={{
                  __html: isMetric
                    ? weather.Temperature.Metric.Value + "&#8451;"
                    : weather.Temperature.Imperial.Value + "&#8457;",
                }}
              ></p>
            </div>
          </div>
          <button
            onClick={onClickHandler}
            className="bg-purple-100 rounded-lg px-3 py-2 flex items-center"
          >
            {weather.isFavorite ? (
              <>
                <HeartSolid className="w-6 h-6 text-purple-500 inline-block mr-1.5" />
                Unfavorite
              </>
            ) : (
              <>
                <HeartIcon className="w-6 h-6 text-purple-500 inline-block mr-1.5" />
                Favorite
              </>
            )}
          </button>
        </div>
        <h1 className="text-4xl font-medium text-center mt-8 dark:text-slate-50">
          {weather.WeatherText}
        </h1>
      </div>
    );
  } else {
    return <></>;
  }

  function onClickHandler() {
    toggleFavorite(weather);
  }
}
