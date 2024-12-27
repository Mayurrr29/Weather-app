import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherApp = () => {
  const [city, setCity] = useState("Gujarat");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading(true);
    setError(null);

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ad2671d1d063954b3a695f478ce39ad8`;

    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="d-flex justify-content-center align-items-center container">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className="btn btn-outline-success"  type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <section className="vh-100" style={{ backgroundColor: "#f5f6f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-10 col-lg-8 col-xl-6">
              {loading ? (
                <div className="card bg-dark text-white text-center" style={{ borderRadius: "40px" }}>
                  <div className="card-img-overlay">
                    <h4>Loading...</h4>
                  </div>
                </div>
              ) : error ? (
                <div className="card bg-dark text-white text-center" style={{ borderRadius: "40px" }}>
                  <div className="card-img-overlay">
                    <h4>Error: {error.message}</h4>
                  </div>
                </div>
              ) : weatherData ? (
                <div className="card bg-dark text-white" style={{ borderRadius: "40px" }}>
                  <div className="bg-image" style={{ borderRadius: "35px" }}>
                    <img
                      src="https://t4.ftcdn.net/jpg/08/72/86/37/240_F_872863703_x49hishnaZUrrX2nMmWu6x0QSGYIKsck.jpg"
                      className="card-img"
                      alt="Weather depiction"
                    />
                    <div className="mask" style={{ backgroundColor: "rgba(190, 216, 232, 0.5)" }}></div>
                  </div>
                  <div className="card-img-overlay text-dark p-5">
                    <h4 className="mb-0">{weatherData?.name}</h4>
                    <p className="display-2 my-3">
                      {(weatherData?.main?.temp - 273.15).toFixed(2)}°C
                    </p>
                    <p className="mb-2">
                      Feels Like:{" "}
                      <strong>
                        {(weatherData?.main?.feels_like - 273.15).toFixed(2)}°C
                      </strong>
                    </p>
                    <h5>{weatherData?.weather?.[0]?.description}</h5>
                  </div>
                </div>
              ) : (
                <div className="text-center">Enter a city to see the weather</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherApp;
