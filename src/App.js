import { useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { Main, Favorites } from "./pages";
import { reducer } from "./store/reducer";
import UnitContext from "./store/unitContext";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [favorites, dispatch] = useReducer(reducer, []);
  const [isMetric, setIsMetric] = useState(true);

  return (
    <div className="min-h-screen dark:bg-dark-1">
      {/*isMetric do the change between the F and the C  */}
      <UnitContext.Provider value={[isMetric, updateUnit]}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Main favorites={favorites} dispatch={dispatch} />}
          />
          <Route
            path="favorites"
            element={<Favorites favorites={favorites} />}
          />
        </Routes>
      </UnitContext.Provider>
    </div>
  );
  // function that change the degress
  function updateUnit() {
    setIsMetric(!isMetric);
  }
}

export default App;
