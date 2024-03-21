import React, { useState, useEffect } from "react";
import logo from "./assets/images/Logotype.png";
import searchIcon from "./assets/images/S.png";
import loading from "./assets/images/loading.gif";
import "./App.scss";

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const Popup = ({ item }) => (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-wrap">
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
        <button onClick={() => setShowPopup(false)}>Close</button>
      </div>
      <div className="close-popup" onClick={() => setShowPopup(false)}></div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cloud.codesupply.co/endpoint/react/data.json"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data
    ? data.filter(
        (item) =>
          item.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.views.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      <header className="App-header">
        <div className="header-wrap">
          <div className="logo-wrap">
            <div className="menuBurgerBtn"></div>
            <img src={logo} alt="logo" />
          </div>

          <nav>
            <ul className="menu-wrap">
              <li className="menu-item">Demos</li>

              <li className="menu-item drop-t-open">
                Post
                <ul className="dropdown-m">
                  <li>Post Header</li>
                  <li>Post Layout</li>
                  <li>Share Buttons</li>
                  <li>Gallery Post</li>
                  <li>Video Post</li>
                </ul>
              </li>
              <li className="menu-item">Features</li>
              <li className="menu-item">Categories</li>
              <li className="menu-item">Shop</li>
              <li className="menu-item">Buy Now</li>
            </ul>
          </nav>
        </div>

        <div className="search-wrap">
          <div className="icon">
            <img src={searchIcon} alt="search" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              required
            />
          </div>
        </div>
      </header>

      {filteredData.length > 0 ? (
        <div className="post-wrap">
          {filteredData.map((item, index) => (
            <div
              className="item"
              key={index}
              onClick={() => handleItemClick(item)}
            >
              <div className="img">
                <img src={item.img} alt="" />
              </div>
              <div className="tags">{item.tags}</div>
              <div className="title">{item.title}</div>

              <div className="info">
                <div className="autor">{item.autor}</div>
                <div className="date">{item.date}</div>
                <div className="views">{item.views}</div>
              </div>
              <div className="text">{item.text}</div>
            </div>
          ))}
        </div>
      ) : data ? (
        <div className="no-results">No results found.</div>
      ) : (
        <img src={loading} className="loading" alt="loading" />
      )}
      {showPopup && selectedItem && <Popup item={selectedItem} />}
    </div>
  );
};

export default FetchDataComponent;
