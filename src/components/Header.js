//component that renders app header and accepts title prop
import React from "react";
const Header = (props) => {
    return (
        <header className="App-header">
            <h2>{props.text}</h2>
        </header>
    );
};
export default Header;