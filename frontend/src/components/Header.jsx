import React, {useState} from 'react';
import '../css/App.css'

function Header(props) {

    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const[isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        console.log("toggle " + isMenuOpen);
        setIsMenuOpen(!isMenuOpen);
        setIsMenuVisible(!isMenuVisible)
    }

    document.addEventListener('click', event => {
        console.log(event.target);
        console.log(isMenuOpen);
        if(isMenuOpen && event.target.id !== "menu-btn" && event.target.className !== "header-component") {
            toggleMenu();
        }
    })

    return (
        <div>
        <header className="header-component header-container">                      
            <button id="menu-btn" className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}> 
                <ul>
                    {props.habits.map((habit,index) => (
                        <li key={index}>{habit}</li>
                    ))}
                </ul>
            </div>
            
            {/* <div className="header-title">
                <h1 className="text-light text-center">Habits Display</h1>
            </div> */}
        </header>
        </div>
    )
}

export default Header