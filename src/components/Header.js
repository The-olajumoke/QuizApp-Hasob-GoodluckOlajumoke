import React from 'react'
import "./Header.css"
function Header({title,desc}) {
    return (
        <div className="header">
            <div className="header__color"></div>
            <div className="header__content">
                <h2>{title}</h2>
                <h4>{desc}</h4>
            </div>
            
        </div>
    )
}

export default Header
