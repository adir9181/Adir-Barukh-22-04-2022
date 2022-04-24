/* eslint-disable */
import React, { useEffect, useState } from "react";
import { SearchIcon, BackspaceIcon } from "@heroicons/react/outline";
import Autosuggest from "react-autosuggest";
import { searchCity } from "../services/apiServices";
import { toast } from "react-toastify";

let lastRequestId = null;

export default function SearchInput({ onSelect }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Search City",
    value,
    className:
      "w-9/10 dark:bg-dark-2 dark:text-slate-50 focus:outline-none focus:placeholder-purple-400",
    onChange: onChangeHandler,
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div
        {...containerProps}
        className={`${
          children?.props.items?.length ? "border" : ""
        } absolute top-11 left-0 w-full rounded bg-white dark:bg-slate-700 z-10`}
      >
        {children}
      </div>
    );
  };

  useEffect(() => {
    if (!value.trim()) {
      // remove search results
      return;
    }
  }, [value]);

  const renderSuggestion = (suggestion, { query, isHighlighted }) => (
    <div
      className={`${
        isHighlighted ? "bg-purple-100 dark:bg-dark-2" : ""
      } px-4 py-3 border-b dark:text-slate-50`}
    >
      {suggestion.LocalizedName}
    </div>
  );

  return (
    <div
      className="relative flex items-center border-2 border-gray-300 px-2 py-2 rounded-lg w-80 
            focus-within:border-purple-500 transition-colors dark:bg-dark-2"
    >
      <SearchIcon className="block h-5 w-5 mr-2 text-gray-400" />
      {/* <input value={value} onChange={({ target }) => setValue(target.value)} type="text"
                className="focus:outline-none focus:placeholder-purple-400" placeholder="Search City" /> */}
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={onSuggestionSelected}
      />
      <BackspaceIcon
        onClick={onClear}
        className="block h-5 w-5 mr-2 text-gray-400 cursor-pointer"
      />
    </div>
  );
  function getSuggestionValue(suggestion) {
    return suggestion.LocalizedName;
  }

  function onChangeHandler(event, { newValue }) {
    setValue(newValue);
  }

  function onSuggestionsFetchRequested({ value }) {
    value = value.trim().toLowerCase();
    if (!value) return;
    if (lastRequestId !== null) {
      clearTimeout(lastRequestId);
    }
    lastRequestId = setTimeout(() => {
      fetchCities();
    }, 300);
  }

  function fetchCities() {
    searchCity(value)
      .then((res) => setSuggestions(res))
      .catch((err) => {
        console.log(err);
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
  }

  function onClear() {
    setValue("");
    setSuggestions([]);
    onSelect(null);
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  function onSuggestionSelected(undefined, { suggestion }) {
    onSelect(suggestion);
  }
}
