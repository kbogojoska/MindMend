import React, {useState, useRef} from 'react';
import '../../css/HeaderFooter/Header.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';

function Header(props) {

    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handler = (event) => {
        console.log("ref =" + menuButtonRef.current);
        if (menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };
    document.addEventListener("click", handler);

    const handleItemClick = (route) => {
        navigate(`/${route}`);
        setIsMenuOpen(false);
    };

    return (
        <div>
        <header className="header-component header-container">                      
            <div id="menu-btn" type="button" className="menu-toggle" ref={menuButtonRef} onClick={toggleMenu}>
                <span className="chevron-down unselectable">
                    ☰
                </span>
            </div>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}> 
                <ul>
                    {props.habits.map((habit,index) => {
                        const route = habit.toLowerCase();
                        return (
                            <li key={index} onClick={() => handleItemClick(route)}>
                                <span><FaChevronRight className="chevron-right unselectable" /></span>
                                <span className="menu-content unselectable">{habit}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
        </div>
    )
}

export default Header