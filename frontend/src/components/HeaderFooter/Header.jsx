import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "../../css/HeaderFooter/Header.css";
import $ from "jquery";
import { useNavigate, useLocation } from "react-router-dom";
import { FaChevronRight, FaUserLarge } from "react-icons/fa6";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [leftPositionOfUserIcon, setleftPositionOfUserIcon] = useState(
    $(window).innerWidth() - $("#user-icon-container").width() - 20
  );
  const [leftPositionOfUserMenu, setleftPositionOfUserMenu] = useState(
    $(window).innerWidth() - $("#user-menu").width() - 20
  );
  const menuButtonRef = useRef(null);
  const userMenuButtonRef = useRef(null);
  const navigate = useNavigate();

  const location = useLocation();
  const shouldShowHeader = !["/login", "/signin"].includes(location.pathname);

  //   because initial render happens before the DOM is fully loaded we need this
  useLayoutEffect(() => {
    setleftPositionOfUserIcon(
      $(window).innerWidth() - $("#user-icon-container").width() - 20
    );
    setleftPositionOfUserMenu(
      -($("#user-menu").width() - $("#user-icon-container").width() + 2)
    );
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setleftPositionOfUserIcon(
        $(window).innerWidth() - $("#user-icon-container").width() - 20
      );
      setleftPositionOfUserMenu(
        -($("#user-menu").width() - $("#user-icon-container").width() + 2)
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handler = (event) => {
    console.log("ref =" + menuButtonRef.current);
    if (
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }

    if (
      userMenuButtonRef.current &&
      !userMenuButtonRef.current.contains(event.target)
    ) {
      setIsUserMenuOpen(false);
    }
  };
  document.addEventListener("click", handler);

  const handleItemClick = (route) => {
    navigate(`/${route}`);
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <div>
      {shouldShowHeader && (
        <header>
          <div className="header-component header-container">
            <div
              id="menu-btn"
              className="menu-toggle"
              ref={menuButtonRef}
              onClick={toggleMenu}
            >
              <span className="chevron-down unselectable">☰</span>
            </div>
            <div className={`menu ${isMenuOpen ? "open" : ""}`}>
              <ul>
                <li key={0} onClick={() => handleItemClick("")}>
                  <span>
                    <FaChevronRight className="chevron-right unselectable" />
                  </span>
                  <span className="menu-content unselectable">home</span>
                </li>
                {props.habits.map((habit, index) => {
                  const route = habit.toLowerCase();
                  return (
                    <li key={index + 1} onClick={() => handleItemClick(route)}>
                      <span>
                        <FaChevronRight className="chevron-right unselectable" />
                      </span>
                      <span className="menu-content unselectable">{habit}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div
            id="user-icon-container"
            className="user-icon header-container"
            style={{ left: `${leftPositionOfUserIcon}px` }}
            ref={userMenuButtonRef}
            onClick={toggleUserMenu}
          >
            <div id="user-menu-btn" className="user-menu-toggle">
              <span className="user-span unselectable">
                <FaUserLarge className="chevron-down uselectable" size={18} />
              </span>
            </div>
            <div
              id="user-menu"
              className={`menu ${isUserMenuOpen ? "open" : ""}`}
              style={{ left: `${leftPositionOfUserMenu}px` }}
            >
              <ul>
                <li onClick={() => handleItemClick("logout")}>
                  <span>
                    <FaChevronRight className="chevron-right unselectable" />
                  </span>
                  <span className="menu-content unselectable">Log out</span>
                </li>
              </ul>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default Header;
