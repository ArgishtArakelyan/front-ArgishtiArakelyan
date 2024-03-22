import React, { useState, useEffect } from "react";
import logo from "./assets/images/Logotype.png";
import searchIcon from "./assets/images/S.png";
import loading from "./assets/images/loading.gif";
import "./App.scss";

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  useEffect(() => {
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
    setFilteredData(filteredData);
  }, [data, searchQuery]);

  return (
    <div>
      <header className={`App-header ${menuOpen ? "open" : ""}`}>
        <div className={`header-wrap ${isSticky ? "padding-b" : ""}`}>
          <div className="logo-wrap">
            <div className="menuBurgerBtn" onClick={toggleMenu}></div>
            <img src={logo} alt="logo" />
          </div>

          <nav className={isSticky ? "sticky" : ""}>
            <ul className="menu-wrap">
              <li className="menu-item">
                <span>Demos</span>
              </li>

              <li className="menu-item drop-t-open">
                <span>Post</span>
                <ul className="dropdown-m">
                  <li>Post Header</li>
                  <li>Post Layout</li>
                  <li>Share Buttons</li>
                  <li>Gallery Post</li>
                  <li>Video Post</li>
                </ul>
              </li>
              <li className="menu-item">
                <span>Features</span>
              </li>
              <li className="menu-item">
                <span>Categories</span>
              </li>
              <li className="menu-item">
                <span>Shop</span>
              </li>
              <li className="menu-item">
                <span>Buy Now</span>
              </li>
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
        <div className="overlay" onClick={toggleMenu}></div>
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
                <img
                  srcSet={`${item.img} 768px, ${item.img_2x} 992px`}
                  src={item.img}
                  alt="My Image"
                />
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
